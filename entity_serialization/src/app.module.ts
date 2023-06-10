import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DefaultNamingStrategy } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'boilerplate-mysql-1',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'test',
      entities: [UserEntity],
      synchronize: false,
      namingStrategy: new DefaultNamingStrategy(), // 네이밍 전략 설정
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
