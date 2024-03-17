import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalOptions = new DocumentBuilder()

  const authOptions = globalOptions
    .setTitle('Додаток Помічник')
    .setDescription('Додаток для ведення обліку майна')
    .addTag('auth', 'запити повязані з авторізциї. ')
    .setVersion('1.0')     
    .build();
     
  const auth = SwaggerModule.createDocument(app, authOptions,{
    include: [AuthModule],
  });
  SwaggerModule.setup('api/auth', app, auth);

  
   const accountOptions = globalOptions
    .setTitle('Акаунт користувача на у додатку.')
    .setDescription('Опис API акаунта користувача.')
    .setVersion('1.0')
    .addTag('account', 'запити щодо акаунта користувача.')
    .build();
  const account = SwaggerModule.createDocument(app, accountOptions, {
    include: [AccountModule],
  });
  SwaggerModule.setup('api/account', app, account);


  const config = globalOptions
     .setTitle('Додаток Помічник')
    .setDescription('Додаток для ведення обліку майна')
    .setVersion('1.0')         
    .build();
  const appDocument = SwaggerModule.createDocument(app, config, {
    include: [AppModule, AuthModule, AccountModule],
  });

  SwaggerModule.setup('api', app, appDocument, {
    swaggerOptions: {     
      extraModels: [AuthModule, AccountModule],
      deepScanRoutes: false,
      include: [AuthModule, AccountModule],
    },
    
    // explorer: true,
    // swaggerUrl: 'localhost:3000/api#/',
    customSiteTitle: 'Зефірна магія API',
  });

  //Добовляем как глобальний мідлфєєр, она овтамотически добовляет в ответи разпарсение куки
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
 
  await app.listen(`${process.env.SERVER_PORT}`);
}
bootstrap();
