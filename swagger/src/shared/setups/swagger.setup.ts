import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ISwaggerConfigInterface } from '../interfaces/swagger-config.interface';

export function setupSwagger(
  app: INestApplication,
  config: ISwaggerConfigInterface,
) {
  const options = new DocumentBuilder()
    .setTitle(config.title) // 설정할 Swagger 문서의 제목을 지정합니다.
    .setDescription(config.description) // Swagger 문서의 설명을 지정합니다.
    .setVersion(config.version) // Swagger 문서의 버전을 지정합니다.
    .addTag('cats') // Swagger 문서에 태그를 추가합니다. 여기서는 'cats' 태그를 추가하였습니다.
    // .addBearerAuth() // Swagger 문서에 Bearer 인증을 추가합니다.
    .addServer(`${config.scheme}://`)
    .build();

  const document = SwaggerModule.createDocument(app, options); // NestJS 애플리케이션과 Swagger 설정을 기반으로 Swagger 문서를 생성합니다.
  SwaggerModule.setup(config.path, app, document); // Swagger 문서를 지정된 경로에 연결하여 API 문서화를 설정합니다.
}
