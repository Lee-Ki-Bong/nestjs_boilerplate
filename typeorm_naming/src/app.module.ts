import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableNamingStrategy } from './table.naming.strategy';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'boilerplate-mysql-1',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'test',
      entities: [User],
      synchronize: true,
      namingStrategy: new TableNamingStrategy(), // 네이밍 전략 설정
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
