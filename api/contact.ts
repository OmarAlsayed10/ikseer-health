import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'
import { checkRateLimit } from './_lib/rateLimit'
import { escapeHtml } from './_lib/validation'

const TO_EMAIL = 'ikseerhealth@gmail.com'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

interface ContactInput {
  name?: unknown
  email?: unknown
  subject?: unknown
  message?: unknown
}

interface ContactValid {
  name: string
  email: string
  subject: string
  message: string
}

const str = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.slice(0, max).trim() : ''

function validate(input: ContactInput): { ok: true; value: ContactValid } | { ok: false; message: string } {
  const name = str(input.name, 100)
  const email = str(input.email, 200).toLowerCase()
  const subject = str(input.subject, 200)
  const message = str(input.message, 2000)

  if (!name || name.length < 2) return { ok: false, message: 'Invalid name.' }
  if (!EMAIL_RE.test(email)) return { ok: false, message: 'Invalid email.' }
  if (!subject || subject.length < 3) return { ok: false, message: 'Invalid subject.' }
  if (!message || message.length < 10) return { ok: false, message: 'Message is too short.' }

  return { ok: true, value: { name, email, subject, message } }
}

function getClientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string') return fwd.split(',')[0].trim()
  if (Array.isArray(fwd) && fwd.length > 0) return fwd[0]
  return req.socket?.remoteAddress ?? 'unknown'
}

function buildEmail(data: ContactValid): { subject: string; html: string; text: string } {
  const e = escapeHtml
  const subject = `[Ikseer Contact] ${data.subject}`
  const messageHtml = e(data.message).replace(/\n/g, '<br>')
  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,Segoe UI,Roboto,sans-serif">
  <div style="max-width:640px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="padding:24px;background:linear-gradient(135deg,#1ECFE0,#0A7A8C);color:white">
      <h1 style="margin:0;font-size:20px">New Contact Message</h1>
      <p style="margin:6px 0 0;opacity:0.9;font-size:14px">From the Ikseer Health website</p>
    </div>
    <div style="padding:20px;font-size:14px;line-height:1.6;color:#111827">
      <table style="border-collapse:collapse;width:100%;margin-bottom:16px">
        <tr><td style="padding:8px 12px;background:#f9fafb;font-weight:600;color:#374151;border:1px solid #e5e7eb;width:120px">Name</td><td style="padding:8px 12px;color:#111827;border:1px solid #e5e7eb">${e(data.name)}</td></tr>
        <tr><td style="padding:8px 12px;background:#f9fafb;font-weight:600;color:#374151;border:1px solid #e5e7eb">Email</td><td style="padding:8px 12px;color:#111827;border:1px solid #e5e7eb"><a href="mailto:${e(data.email)}">${e(data.email)}</a></td></tr>
        <tr><td style="padding:8px 12px;background:#f9fafb;font-weight:600;color:#374151;border:1px solid #e5e7eb">Subject</td><td style="padding:8px 12px;color:#111827;border:1px solid #e5e7eb">${e(data.subject)}</td></tr>
      </table>
      <div style="padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;white-space:pre-wrap">${messageHtml}</div>
    </div>
  </div>
</body></html>`

  const text = [
    `New contact message from the Ikseer Health website.`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    ``,
    `Message:`,
    data.message,
  ].join('\n')

  return { subject, html, text }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const ip = getClientIp(req)
  const limit = checkRateLimit(`contact:${ip}`, { maxRequests: 5, windowMs: 60_000 })
  if (!limit.allowed) {
    const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000)
    res.setHeader('Retry-After', String(retryAfter))
    return res.status(429).json({ message: 'Too many requests. Please try again later.' })
  }

  const validation = validate(req.body ?? {})
  if (!validation.ok) {
    return res.status(400).json({ message: validation.message })
  }

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    const missing = [
      !host && 'SMTP_HOST',
      !user && 'SMTP_USER',
      !pass && 'SMTP_PASS',
    ].filter(Boolean).join(', ')
    console.error('[contact] SMTP env vars missing:', missing)
    return res.status(500).json({ message: `Email service not configured (missing: ${missing}).` })
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  const email = buildEmail(validation.value)
  const fromHeader = `"Ikseer Health" <${user}>`

  try {
    await transporter.sendMail({
      from: fromHeader,
      to: TO_EMAIL,
      replyTo: validation.value.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    const e = err as { code?: string; response?: string; message?: string }
    console.error('[contact] SMTP error:', {
      code: e?.code,
      response: e?.response,
      message: e?.message,
    })
    return res.status(502).json({
      message: `Email send failed: ${e?.code ?? ''} ${e?.message ?? 'unknown error'}`.trim(),
    })
  }
}
