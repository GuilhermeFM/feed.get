import nodemailer from "nodemailer";

import { MailAdapter, MailAdapterParam } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "770e116675c1fc",
    pass: "330e7d2878430e",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: MailAdapterParam) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Guilherme F Meira <guifrizzera2005@gmail.com>",
      subject: subject,
      html: body,
    });
  }
}
