import sgMail from '@sendgrid/mail';
import path from 'path';
import fs from 'fs';

// En .env : SENDGRID_API_KEY, EMAIL_FROM, FRONTEND_URL
if (!process.env.SENDGRID_API_KEY) {
  console.error('❌ SENDGRID_API_KEY manquant');
  process.exit(1);
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function renderTemplate(name, vars) {
  // Ici un simple switch, remplace par un moteur si besoin
  switch (name) {
    case 'verification':
      return {
        subject: 'Confirmez votre adresse e-mail',
        html: `
          <p>Bonjour ${vars.firstName},</p>
          <p>Merci de vous être inscrit·e. Pour activer votre compte, cliquez sur :</p>
          <p><a href="${process.env.FRONTEND_URL}/confirm/${vars.token}">
            Activer mon compte
          </a></p>
          <p>Ce lien expire dans 24 h.</p>
        `,
      };
    // Ajoutez d'autres templates ici
    default:
      throw new Error(`Template inconnu : ${name}`);
  }
}

/**
 * sendMail(templateName, to, variables)
 */
export async function sendMail(templateName, to, variables) {
  const { subject, html } = renderTemplate(templateName, variables);
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject,
    html,
  };
  await sgMail.send(msg);
}
