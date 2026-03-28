/**
 * Event announcement email — send to full community to promote a new event.
 * Customize all fields per event before sending.
 */
export function eventAnnouncementEmail({
  firstName,
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  eventSlug,
  eventDescription,
  spotsAvailable,
  locale = 'en',
}: {
  firstName: string
  eventName: string
  eventDate: string
  eventTime: string
  eventLocation: string
  eventSlug: string
  eventDescription: string
  spotsAvailable: number
  locale?: string
}) {
  const isFr = locale === 'fr'

  const subject = isFr
    ? `Prochain événement : ${eventName}`
    : `Next event: ${eventName}`

  const registerUrl = `https://www.ctoromandy.ch/${locale}/register`
  const eventUrl    = `https://www.ctoromandy.ch/${locale}/events/${eventSlug}`

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
                    ${isFr ? 'Prochain événement' : 'Upcoming Event'}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Main card -->
        <tr>
          <td style="background:#1E1E1E;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">

            <!-- Top gradient bar -->
            <div style="height:4px;background:linear-gradient(to right,#C8834A,#E0A070);"></div>

            <div style="padding:48px 40px;">

              <p style="margin:0 0 8px 0;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#C8834A;">
                ${isFr ? `Bonjour ${firstName}` : `Hey ${firstName}`}
              </p>

              <h1 style="margin:0 0 24px 0;font-size:30px;font-weight:900;color:#ffffff;text-transform:uppercase;letter-spacing:-0.02em;line-height:1.15;">
                ${eventName}
              </h1>

              <p style="margin:0 0 32px 0;font-size:15px;color:rgba(255,255,255,0.6);line-height:1.7;">
                ${eventDescription}
              </p>

              <!-- Event details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;margin-bottom:32px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                      <tr>
                        <td style="font-size:18px;width:24px;">📅</td>
                        <td style="padding-left:10px;font-size:14px;font-weight:600;color:rgba(255,255,255,0.8);">
                          ${eventDate} · ${eventTime}
                        </td>
                      </tr>
                    </table>
                    <table cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                      <tr>
                        <td style="font-size:18px;width:24px;">📍</td>
                        <td style="padding-left:10px;font-size:14px;color:rgba(255,255,255,0.6);">
                          ${eventLocation}
                        </td>
                      </tr>
                    </table>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:18px;width:24px;">🎟️</td>
                        <td style="padding-left:10px;font-size:14px;color:#C8834A;font-weight:700;">
                          ${spotsAvailable} ${isFr ? 'places disponibles' : 'spots available'} · ${isFr ? 'Toujours gratuit' : 'Always free'}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Primary CTA -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td>
                    <a href="${registerUrl}"
                      style="display:inline-block;background:#C8834A;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:16px 32px;border-radius:8px;text-transform:uppercase;letter-spacing:0.05em;">
                      ${isFr ? 'Réserver ma place →' : 'Reserve my spot →'}
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 32px 0;font-size:12px;color:rgba(255,255,255,0.2);">
                ${isFr ? 'Places limitées — sécurisez la vôtre dès maintenant.' : 'Limited spots — secure yours now.'}
              </p>

              <!-- Divider -->
              <div style="height:1px;background:rgba(255,255,255,0.07);margin:0 0 24px 0;"></div>

              <!-- Secondary link -->
              <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.35);">
                ${isFr ? 'Plus d\'informations sur' : 'Full event details at'}
                <a href="${eventUrl}" style="color:#C8834A;text-decoration:underline;">${isFr ? 'la page événement' : 'the event page'}</a>.
              </p>

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
                ? `Vous recevez cet email car vous êtes membre de la communauté Romandy CTO.`
                : `You're receiving this as a member of the Romandy CTO community.`}
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
