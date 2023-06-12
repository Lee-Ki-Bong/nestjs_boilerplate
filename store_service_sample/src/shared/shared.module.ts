import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const providers = [];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env'],
      load: [],
    }),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class SharedModule {}
