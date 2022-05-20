export interface MailAdapterParam {
  subject: string;
  body: string;
}

export interface MailAdapter {
  sendMail: (param: MailAdapterParam) => Promise<void>;
}
