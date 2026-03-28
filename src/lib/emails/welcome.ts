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

  const html = `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#111111;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <!-- Wrapper -->
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
                    ${isFr ? 'Communauté' : 'Community'}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Hero card -->
        <tr>
          <td style="background:#1E1E1E;border-radius:16px;padding:48px 40px;border:1px solid rgba(255,255,255,0.07);">

            <p style="margin:0 0 8px 0;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#C8834A;">
              ${isFr ? 'Bienvenue' : 'Welcome'}
            </p>
            <h1 style="margin:0 0 24px 0;font-size:36px;font-weight:900;color:#ffffff;text-transform:uppercase;letter-spacing:-0.02em;line-height:1.1;">
              ${isFr ? `Bienvenue,<br/>${firstName}.` : `Welcome,<br/>${firstName}.`}
            </h1>
            <p style="margin:0 0 32px 0;font-size:16px;color:rgba(255,255,255,0.6);line-height:1.7;">
              ${isFr
                ? `Vous faites maintenant partie de la communauté Romandy CTO — un réseau de plus de 500 CTOs et leaders technologiques en Romandie. Nous sommes ravis de vous avoir parmi nous.`
                : `You're now part of the Romandy CTO community — a network of 500+ CTOs and technology leaders across Romandy. We're glad you're here.`}
            </p>

            <!-- Divider -->
            <div style="height:1px;background:rgba(255,255,255,0.07);margin:0 0 32px 0;"></div>

            <!-- What you get -->
            <p style="margin:0 0 20px 0;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.35);">
              ${isFr ? 'Ce qui vous attend' : 'What you get'}
            </p>

            <!-- Benefit 1 -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              <tr>
                <td width="40" valign="top">
                  <div style="width:32px;height:32px;background:rgba(200,131,74,0.15);border-radius:8px;text-align:center;line-height:32px;font-size:16px;">📅</div>
                </td>
                <td style="padding-left:14px;">
                  <p style="margin:0;font-size:14px;font-weight:700;color:#ffffff;">
                    ${isFr ? 'Événements mensuels' : 'Monthly events'}
                  </p>
                  <p style="margin:4px 0 0 0;font-size:13px;color:rgba(255,255,255,0.45);line-height:1.5;">
                    ${isFr
                      ? 'Soirées en présentiel, soignées — conférences, panels et discussions ouvertes.'
                      : 'Curated in-person evenings — keynotes, panels, and open discussion.'}
                  </p>
                </td>
              </tr>
            </table>

            <!-- Benefit 2 -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              <tr>
                <td width="40" valign="top">
                  <div style="width:32px;height:32px;background:rgba(200,131,74,0.15);border-radius:8px;text-align:center;line-height:32px;font-size:16px;">💬</div>
                </td>
                <td style="padding-left:14px;">
                  <p style="margin:0;font-size:14px;font-weight:700;color:#ffffff;">
                    ${isFr ? 'Slack privé' : 'Private Slack'}
                  </p>
                  <p style="margin:4px 0 0 0;font-size:13px;color:rgba(255,255,255,0.45);line-height:1.5;">
                    ${isFr
                      ? '500+ pairs. Posez une question le mardi, recevez cinq réponses de praticiens expérimentés d\'ici jeudi.'
                      : '500+ peers. Ask a question on Tuesday, get five answers from experienced practitioners by Thursday.'}
                  </p>
                </td>
              </tr>
            </table>

            <!-- Benefit 3 -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
              <tr>
                <td width="40" valign="top">
                  <div style="width:32px;height:32px;background:rgba(200,131,74,0.15);border-radius:8px;text-align:center;line-height:32px;font-size:16px;">📚</div>
                </td>
                <td style="padding-left:14px;">
                  <p style="margin:0;font-size:14px;font-weight:700;color:#ffffff;">
                    ${isFr ? 'Connaissances partagées' : 'Shared knowledge'}
                  </p>
                  <p style="margin:4px 0 0 0;font-size:13px;color:rgba(255,255,255,0.45);line-height:1.5;">
                    ${isFr
                      ? 'Résumés, points clés et ressources de chaque événement, partagés avec toute la communauté.'
                      : 'Recaps, key takeaways, and resources from every event, shared with the full community.'}
                  </p>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <a href="https://www.ctoromandy.ch/${locale}/register"
                    style="display:inline-block;background:#C8834A;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:8px;text-transform:uppercase;letter-spacing:0.05em;">
                    ${isFr ? 'Réserver votre place →' : 'Reserve your spot →'}
                  </a>
                  <p style="margin:12px 0 0 0;font-size:12px;color:rgba(255,255,255,0.25);">
                    ${isFr ? 'Prochain événement · Toujours gratuit' : 'Next event · Always free'}
                  </p>
                </td>
              </tr>
            </table>

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
                ? `Vous recevez cet email car vous avez rejoint la communauté Romandy CTO.`
                : `You're receiving this because you joined the Romandy CTO community.`}
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
