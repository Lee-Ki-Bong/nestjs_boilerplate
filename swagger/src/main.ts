import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * @swagger config
   */
  const config = new DocumentBuilder()
    .setTitle('Cats example') // 설정할 Swagger 문서의 제목을 지정합니다.
    .setDescription('The dhkehd2 API description') // Swagger 문서의 설명을 지정합니다.
    .setVersion('1.0.0') // Swagger 문서의 버전을 지정합니다.
    .addTag('cats') // Swagger 문서에 태그를 추가합니다. 여기서는 'cats' 태그를 추가하였습니다.
    // .addBearerAuth() // Swagger 문서에 Bearer 인증을 추가합니다.
    .build();
  const document = SwaggerModule.createDocument(app, config); // NestJS 애플리케이션과 Swagger 설정을 기반으로 Swagger 문서를 생성합니다.
  SwaggerModule.setup('api/document', app, document); // Swagger 문서를 지정된 경로에 연결하여 API 문서화를 설정합니다.

  await app.listen(3000);
}
bootstrap();
