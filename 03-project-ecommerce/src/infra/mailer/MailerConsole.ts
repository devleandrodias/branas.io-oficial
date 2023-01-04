import { Mailer } from "./Mailer";

export class MailerConsole implements Mailer {
  send(to: string, subject: string, message: string) {
    console.log(subject, message);
  }
}
