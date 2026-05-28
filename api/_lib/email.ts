import { escapeHtml, type AccessRequestValid } from './validation'

export function buildAccessRequestEmail(data: AccessRequestValid): {
  subject: string
  html: string
  text: string
} {
  const e = escapeHtml
  const mapsUrl = `https://www.google.com/maps?q=${data.location.lat},${data.location.lng}`

  const subject = `New access request — ${data.fullName} (${data.clinicName})`

  const rows: Array<[string, string]> = [
    ['Full Name', e(data.fullName)],
    ['Email', `<a href="mailto:${e(data.email)}">${e(data.email)}</a>`],
    ['Phone', `${e(data.countryCode)} ${e(data.phoneNational)}`],
    ['Country', e(data.countryIso2)],
    ['Clinic Name', e(data.clinicName)],
    ['Clinic Country', `${e(data.clinicCountryName)} (${e(data.clinicCountryIso2)})`],
    ['Clinic City', e(data.clinicCity)],
    ['Clinic Street', e(data.clinicStreet)],
    [
      'Map Location',
      `<a href="${mapsUrl}" target="_blank" rel="noopener">${data.location.lat.toFixed(6)}, ${data.location.lng.toFixed(6)} (open in Google Maps)</a>`,
    ],
  ]

  if (data.details) rows.push(['Additional Details', e(data.details).replace(/\n/g, '<br>')])

  const tableRows = rows
    .map(
      ([label, val]) =>
        `<tr><td style="padding:8px 12px;background:#f9fafb;font-weight:600;color:#374151;border:1px solid #e5e7eb;width:160px;vertical-align:top">${label}</td><td style="padding:8px 12px;color:#111827;border:1px solid #e5e7eb">${val}</td></tr>`,
    )
    .join('')

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,Segoe UI,Roboto,sans-serif">
  <div style="max-width:640px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="padding:24px;background:linear-gradient(135deg,#1ECFE0,#0A7A8C);color:white">
      <h1 style="margin:0;font-size:20px">New Access Request</h1>
      <p style="margin:6px 0 0;opacity:0.9;font-size:14px">Nabd Clinic — request submitted via the website</p>
    </div>
    <div style="padding:20px">
      <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.5">${tableRows}</table>
    </div>
  </div>
</body></html>`

  const text = rows.map(([k, v]) => `${k}: ${v.replace(/<[^>]+>/g, '')}`).join('\n')

  return { subject, html, text }
}
