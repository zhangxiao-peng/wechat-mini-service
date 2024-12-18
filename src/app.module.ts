import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test', //数据库名称
      synchronize: true, //自动同步数据库结构
      logging: true,
      entities: [], //指定数据库实体
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
          authPlugin: 'sha256_password',
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
