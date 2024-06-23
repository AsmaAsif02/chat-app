import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  controllers: [AppController],
  providers: [AppService, AppGateway],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.CHAT_DB),
  ],
})
export class AppModule {}
