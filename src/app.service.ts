import { Injectable } from '@nestjs/common';
import { MailService } from './email-service/email-service';

@Injectable()
export class AppService {
  constructor(private mailService: MailService) {}
  getHello() {
    this.mailService.enviarEmail(
      'carlosajunior@hotmail.com',
      'Testando envio de e-mail',
      'Teste',
    );
    //return 'Hello World!';
  }
}
