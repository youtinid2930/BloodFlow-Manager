import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BloodRequest, BloodRequestSchema } from './schemas/blood-requests.schema';
import { BloodRequestService } from './blood-requests.service';
import { BloodRequestController } from './blood-requests.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: BloodRequest.name, schema: BloodRequestSchema }])],
  controllers: [BloodRequestController],
  providers: [BloodRequestService],
  exports: [BloodRequestService],
})
export class BloodRequestModule {}
