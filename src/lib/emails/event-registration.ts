export function eventRegistrationEmail({
  firstName,
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  eventSlug,
  locale = 'en',
}: {
  firstName: string
  eventName: string
  eventDate: string
  eventTime: string
  eventLocation: string
  eventSlug: string
  locale?: string
}) {
  const isFr = locale === 'fr'

  const subject = isFr
    ? `Vous êtes inscrit — ${eventName}`
    : `You're registered — ${eventName}`

  const eventUrl = `https://www.ctoromandy.ch/${locale}/events/${eventSlug}`

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
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

        <!-- Header -->
        <tr>
          <td style="padding:0 0 32px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="font-size:11px;font-weight:800;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.4);">ROMANDY</span><br/>
                  <span style="font-size:28px;font-weight:900;letter-spacing:-0.02em;color:#ffffff;text-transform:uppercase;line-height:1;">CTO</span>
                </td>
                <td align="right" style="vertical-align:bottom;">
                  <span style="font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#C8834A;background:rgba(200,131,74,0.12);border:1px solid rgba(200,131,74,0.3);padding:4px 10px;border-radius:20px;">
                    ${isFr ? 'Événement' : 'Event'}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Confirmation card -->
        <tr>
          <td style="background:#1E1E1E;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">

            <!-- Orange top bar -->
            <div style="height:4px;background:linear-gradient(to right,#C8834A,#E0A070);"></div>

            <div style="padding:48px 40px;">

              <p style="margin:0 0 8px 0;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#C8834A;">
                ${isFr ? 'Inscription confirmée' : 'Registration confirmed'}
              </p>
              <h1 style="margin:0 0 28px 0;font-size:36px;font-weight:900;color:#ffffff;text-transform:uppercase;letter-spacing:-0.02em;line-height:1.1;">
                ${isFr ? `Vous êtes<br/>inscrit, ${firstName}.` : `You're in,<br/>${firstName}.`}
              </h1>

              <!-- Event details box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(200,131,74,0.08);border:1px solid rgba(200,131,74,0.2);border-radius:12px;margin-bottom:32px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 14px 0;font-size:13px;font-weight:800;color:#ffffff;text-transform:uppercase;letter-spacing:0.08em;">
                      ${eventName}
                    </p>
                    <!-- Date -->
                    <table cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
                      <tr>
                        <td style="font-size:18px;width:22px;">📅</td>
                        <td style="padding-left:10px;font-size:13px;color:rgba(255,255,255,0.7);">
                          ${eventDate} · ${eventTime}
                        </td>
                      </tr>
                    </table>
                    <!-- Location -->
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:18px;width:22px;">📍</td>
                        <td style="padding-left:10px;font-size:13px;color:rgba(255,255,255,0.7);">
                          ${eventLocation}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px;background:rgba(255,255,255,0.07);margin:0 0 28px 0;"></div>

              <!-- What to expect -->
              <p style="margin:0 0 16px 0;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.35);">
                ${isFr ? 'À prévoir' : 'What to expect'}
              </p>
              <p style="margin:0 0 24px 0;font-size:14px;color:rgba(255,255,255,0.55);line-height:1.7;">
                ${isFr
                  ? `Une soirée soignée avec des présentations, des tables rondes et du networking. Limité à 50 personnes — vous avez votre place. Nous vous recommandons d'arriver à l'heure pour avoir le meilleur siège et commencer à networker.`
                  : `A curated evening with talks, panels, and networking. Limited to 50 people — you've secured your place. We recommend arriving on time to get the best seat and start connecting.`}
              </p>

              <!-- CTA buttons -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="${eventUrl}"
                      style="display:inline-block;background:#C8834A;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:13px 24px;border-radius:8px;text-transform:uppercase;letter-spacing:0.05em;">
                      ${isFr ? 'Voir l\'événement →' : 'View event →'}
                    </a>
                  </td>
                  <td>
                    <a href="https://www.ctoromandy.ch/${locale}"
                      style="display:inline-block;border:1px solid rgba(255,255,255,0.2);color:rgba(255,255,255,0.6);font-size:13px;font-weight:600;text-decoration:none;padding:13px 24px;border-radius:8px;">
                      ${isFr ? 'Retour au site' : 'Back to site'}
                    </a>
                  </td>
                </tr>
              </table>

            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:28px 0 0 0;text-align:center;">
            <p style="margin:0 0 6px 0;font-size:12px;color:rgba(255,255,255,0.2);">
              Romandy CTO · Geneva, Switzerland
            </p>
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.15);">
              ${isFr
                ? `Questions ? Répondez simplement à cet email.`
                : `Questions? Just reply to this email.`}
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
