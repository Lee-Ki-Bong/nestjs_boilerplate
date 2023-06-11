import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './shared/setups/swagger.setup';
import { ISwaggerConfigInterface } from './shared/interfaces/swagger-config.interface';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.select(SharedModule).get(ConfigService);
  if (['development', 'staging'].includes(process.env.NODE_ENV)) {
    setupSwagger(
      app,
      configService.get('swaggerConfig') as ISwaggerConfigInterface,
    );
  }
  await app.listen(3000);
}
bootstrap();
