import { Resend } from 'resend'

export interface EmailMessage {
  from: string
  to: string
  replyTo?: string
  subject: string
  html: string
  text: string
}

export async function sendEmail(msg: EmailMessage): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured')

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: msg.from,
    to: msg.to,
    replyTo: msg.replyTo,
    subject: msg.subject,
    html: msg.html,
    text: msg.text,
  })

  if (error) throw new Error(`Resend: ${(error as { message?: string }).message ?? 'unknown error'}`)
}

export function fromAddress(displayName: string): string {
  const email = process.env.RESEND_FROM_EMAIL
  if (!email) throw new Error('RESEND_FROM_EMAIL is not configured')
  return `${displayName} <${email}>`
}
