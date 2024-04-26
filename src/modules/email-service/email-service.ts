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
        html: `<body>
              <p>Este e-mail é para confirmar o seu cadastro na plataforma. Para ativar sua conta clique no link a seguir:</p>
              <p><a href="${message}">Ativar minha conta</a></p>
              </body>
              </html>`,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
