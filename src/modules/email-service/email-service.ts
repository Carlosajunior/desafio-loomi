import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async enviarEmail(email: string, message: string, subject: string) {
    try {
      return await this.mailerService.sendMail({
        to: email,
        from: process.env.MAIL_FROM,
        subject: subject,
        html: `<h3 style="color: black">${message}</h3>`,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
