import nodemailer from 'nodemailer'
import { MailAdapter, SendEmailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "11dd6dbbaacd11",
      pass: "d3e597241d43fa"
    }
});

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendEmailData){
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Matheus Chaves <math.cchaves@gmail.com>',
            subject,
            html: body,
        })
    }
}