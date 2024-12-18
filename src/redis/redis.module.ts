import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

@Global()  //声明全局模块
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory(ConfigService: ConfigService) {
        const host=ConfigService.get('redis_server_host');
        const port=ConfigService.get('redis_server_port');
        const client = createClient({
            socket: {
                host,
                port
            },
            database: 1
        });
        await client.connect();
        return client;
      },
      inject: [ConfigService]
    }
  ],
  exports: [RedisService]
})
export class RedisModule {}
