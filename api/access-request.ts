import type { VercelRequest, VercelResponse } from '@vercel/node'
import { validateAccessRequestServer } from './_lib/validation'
import { checkRateLimit } from './_lib/rateLimit'
import { buildAdminEmail, buildDoctorAckEmail } from './_lib/email'
import { signApprovalToken } from './_lib/approval-token'
import { sendEmail, fromAddress } from './_lib/resend'

const TO_EMAIL = process.env.ACCESS_REQUEST_TO_EMAIL

function getClientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string') return fwd.split(',')[0].trim()
  if (Array.isArray(fwd) && fwd.length > 0) return fwd[0]
  return req.socket?.remoteAddress ?? 'unknown'
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const ip = getClientIp(req)
  const limit = checkRateLimit(`access-request:${ip}`, { maxRequests: 3, windowMs: 60_000 })
  if (!limit.allowed) {
    const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000)
    res.setHeader('Retry-After', String(retryAfter))
    return res.status(429).json({ message: 'Too many requests. Please try again later.' })
  }

  const validation = validateAccessRequestServer(req.body ?? {})
  if (!validation.ok) {
    return res.status(400).json({ message: validation.message })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[access-request] RESEND_API_KEY not set')
    return res.status(500).json({ message: 'Email service not configured (missing RESEND_API_KEY).' })
  }

  let from: string
  try {
    from = fromAddress('Ikseer')
  } catch (err) {
    console.error('[access-request] RESEND_FROM_EMAIL not set:', err)
    return res.status(500).json({ message: 'Email service not configured (missing RESEND_FROM_EMAIL).' })
  }

  let approveUrl: string
  let rejectUrl: string
  try {
    const basePayload = {
      email: validation.value.email,
      fullName: validation.value.fullName,
      clinicName: validation.value.clinicName,
    }
    const approveToken = signApprovalToken({ ...basePayload, action: 'approve' })
    const rejectToken = signApprovalToken({ ...basePayload, action: 'reject' })
    const siteUrl = (process.env.PUBLIC_SITE_URL ?? '').replace(/\/$/, '')
      || `https://${req.headers.host ?? ''}`
    approveUrl = `${siteUrl}/api/approve?token=${encodeURIComponent(approveToken)}`
    rejectUrl = `${siteUrl}/api/reject?token=${encodeURIComponent(rejectToken)}`
  } catch (err) {
    console.error('[access-request] token signing failed:', err)
    return res.status(500).json({ message: 'Approval system not configured (missing APPROVAL_SECRET).' })
  }

  const adminEmail = buildAdminEmail(validation.value, approveUrl, rejectUrl, siteUrl)
  const doctorEmail = buildDoctorAckEmail(validation.value, siteUrl)

  try {
    await Promise.all([
      sendEmail({
        from,
        to: TO_EMAIL,
        replyTo: validation.value.email,
        subject: adminEmail.subject,
        html: adminEmail.html,
        text: adminEmail.text,
      }),
      sendEmail({
        from,
        to: validation.value.email,
        replyTo: TO_EMAIL,
        subject: doctorEmail.subject,
        html: doctorEmail.html,
        text: doctorEmail.text,
      }),
    ])
    return res.status(200).json({ ok: true })
  } catch (err) {
    const e = err as { message?: string }
    console.error('[access-request] Resend error:', e)
    return res.status(502).json({
      message: `Email send failed: ${e?.message ?? 'unknown error'}`,
    })
  }
}
