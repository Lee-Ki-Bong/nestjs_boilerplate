import { Module, Global } from '@nestjs/common';
import swaggerConfig from './configures/swagger.config';
import { ConfigModule } from '@nestjs/config';

const providers = [];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env'],
      load: [swaggerConfig],
    }),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class SharedModule {}
