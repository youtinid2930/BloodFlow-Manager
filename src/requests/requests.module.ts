import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Request, RequestSchema } from './schemas/request.schema';
import { RequestService } from './requests.service';
import { RequestsController } from './requests.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]), Request],
  controllers: [RequestsController],
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestModule {}
