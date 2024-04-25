import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    // this.mailService.enviarEmail(
    //   'carlosajunior@hotmail.com',
    //   'Testando envio de e-mail',
    //   'Teste',
    // );
    return 'Hello World!';
  }
}
