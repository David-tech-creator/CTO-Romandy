export function welcomeEmail({
  firstName,
  locale = 'en',
}: {
  firstName: string
  locale?: string
}) {
  const isFr = locale === 'fr'

  const subject = isFr
    ? `Bienvenue dans la communauté Romandy CTO, ${firstName}`
    : `Welcome to Romandy CTO, ${firstName}`

  // Inline SVG icons — minimal, stroke-based, email-safe
  const iconCalendar = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8834A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`

  const iconUsers = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8834A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`

  const iconBook = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8834A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`

  const html = `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#111111;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111111;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <!-- Logo -->
        <tr>
          <td style="padding:0 0 28px 0;">
            <span style="font-size:10px;font-weight:800;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.35);">ROMANDY</span><br/>
            <span style="font-size:26px;font-weight:900;letter-spacing:-0.02em;color:#ffffff;text-transform:uppercase;line-height:1;">CTO</span>
          </td>
        </tr>

        <!-- Hero image -->
        <tr>
          <td style="padding:0;line-height:0;">
            <img src="https://www.ctoromandy.ch/og-image1.jpg"
              width="600" alt="Romandy CTO"
              style="width:100%;max-width:600px;height:auto;display:block;border-radius:16px 16px 0 0;" />
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:#1A1A1A;border-radius:0 0 16px 16px;border:1px solid rgba(255,255,255,0.07);border-top:none;">
            <div style="height:3px;background:linear-gradient(to right,#C8834A,#E0A070);"></div>

            <div style="padding:40px 40px 48px;">

              <!-- Greeting -->
              <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#C8834A;">
                ${isFr ? 'Bienvenue' : 'Welcome'}
              </p>
              <h1 style="margin:0 0 20px;font-size:36px;font-weight:900;color:#ffffff;text-transform:uppercase;letter-spacing:-0.02em;line-height:1.1;">
                ${firstName}.
              </h1>
              <p style="margin:0 0 36px;font-size:15px;color:rgba(255,255,255,0.5);line-height:1.75;">
                ${isFr
                  ? `Vous faites maintenant partie de la communauté Romandy CTO — un réseau de plus de 500 CTOs et leaders technologiques en Romandie.`
                  : `You're now part of Romandy CTO — a network of 500+ CTOs and technology leaders across Romandy, Switzerland.`}
              </p>

              <!-- Divider -->
              <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 0 32px;"></div>

              <!-- What's next -->
              <p style="margin:0 0 20px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.25);">
                ${isFr ? 'Ce qui vous attend' : "What's next"}
              </p>

              <!-- Benefit 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                <tr>
                  <td style="padding:16px 20px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:12px;vertical-align:middle;">${iconCalendar}</td>
                        <td>
                          <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#ffffff;letter-spacing:0.01em;">
                            ${isFr ? 'Événements mensuels' : 'Monthly events'}
                          </p>
                          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);line-height:1.55;">
                            ${isFr ? 'Soirées en présentiel, soignées — toujours gratuites.' : 'Curated in-person evenings — always free.'}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Benefit 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                <tr>
                  <td style="padding:16px 20px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:12px;vertical-align:middle;">${iconUsers}</td>
                        <td>
                          <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#ffffff;letter-spacing:0.01em;">
                            ${isFr ? 'Réseau privé' : 'Private network'}
                          </p>
                          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);line-height:1.55;">
                            ${isFr ? '500+ pairs. Des réponses de praticiens expérimentés.' : '500+ peers. Real answers from experienced practitioners.'}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Benefit 3 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
                <tr>
                  <td style="padding:16px 20px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:12px;vertical-align:middle;">${iconBook}</td>
                        <td>
                          <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#ffffff;letter-spacing:0.01em;">
                            ${isFr ? 'Connaissances partagées' : 'Shared knowledge'}
                          </p>
                          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);line-height:1.55;">
                            ${isFr ? 'Résumés et ressources de chaque événement.' : 'Recaps and resources from every event.'}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <a href="https://www.ctoromandy.ch/${locale}/register"
                style="display:block;text-align:center;background:#C8834A;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:15px 32px;border-radius:9px;text-transform:uppercase;letter-spacing:0.07em;">
                ${isFr ? 'Réserver ma place →' : 'Reserve my spot →'}
              </a>
              <p style="margin:10px 0 0;font-size:11px;text-align:center;color:rgba(255,255,255,0.2);">
                ${isFr ? 'Prochain événement · Toujours gratuit' : 'Next event · Always free'}
              </p>

            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 0 0;text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.18);">Romandy CTO · Geneva, Switzerland</p>
            <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.12);">
              ${isFr
                ? 'Vous recevez cet email car vous avez rejoint la communauté Romandy CTO.'
                : "You're receiving this because you joined the Romandy CTO community."}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`

  return { subject, html }
}
