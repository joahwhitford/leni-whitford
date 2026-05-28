import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM    = "Léni Whitford <onboarding@resend.dev>";
const TO_LENI = "leni.whitford@orange.fr";

export async function POST(req: NextRequest) {
  try {
    const { prenom, nom, sujet, message, email } = await req.json();

    if (!prenom || !message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    // Email to Léni — notifies her of the new message
    const { error: sendError } = await resend.emails.send({
      from: FROM,
      to:   TO_LENI,
      replyTo: email || undefined,
      subject: `[Contact] ${sujet || "Nouveau message"} — ${prenom} ${nom}`,
      html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 20px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#0a0805;border-radius:4px;overflow:hidden;max-width:580px;">

        <tr><td style="padding:36px 48px 24px;border-bottom:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0;color:#c8b88a;font-size:10px;letter-spacing:4px;text-transform:uppercase;font-family:Arial,sans-serif;">
            Nouveau message
          </p>
          <h1 style="margin:12px 0 0;color:#f5f0e8;font-size:28px;font-weight:300;font-style:italic;">
            ${prenom} ${nom}
          </h1>
        </td></tr>

        <tr><td style="padding:32px 48px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            ${sujet ? `<tr>
              <td style="color:#888;font-size:11px;font-family:Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;padding:6px 0;width:100px;">Sujet</td>
              <td style="color:#f5f0e8;font-size:14px;padding:6px 0;">${sujet}</td>
            </tr>` : ""}
            ${email ? `<tr>
              <td style="color:#888;font-size:11px;font-family:Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;padding:6px 0;">Email</td>
              <td style="padding:6px 0;"><a href="mailto:${email}" style="color:#c8b88a;font-size:14px;text-decoration:none;">${email}</a></td>
            </tr>` : ""}
          </table>

          <div style="background:rgba(255,255,255,0.04);border-left:2px solid #c8b88a;padding:20px 24px;border-radius:0 4px 4px 0;">
            <p style="margin:0;color:#f5f0e8;font-size:14px;line-height:1.8;white-space:pre-wrap;">${message}</p>
          </div>

          ${email ? `<div style="margin-top:28px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(sujet || 'Votre message')}"
               style="display:inline-block;background:#c8b88a;color:#0a0805;padding:12px 28px;font-size:11px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;font-family:Arial,sans-serif;">
              Répondre →
            </a>
          </div>` : ""}
        </td></tr>

        <tr><td style="padding:20px 48px;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;color:#555;font-size:11px;font-family:Arial,sans-serif;">
            leni-whitford.fr · Message reçu via le formulaire de contact
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return NextResponse.json({ error: sendError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
