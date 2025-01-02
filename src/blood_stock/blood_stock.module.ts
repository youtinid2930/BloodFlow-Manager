import { Module } from '@nestjs/common';
import { BloodStockService } from './blood_stock.service';
import { BloodStockController } from './blood_stock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BloodStockSchema, BloodStock } from './schemas/blood_stock.schema';
import { EmailModule } from '../mail/mail.module'; 
import { DonorsModule } from '../donors/donors.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BloodStock.name, schema: BloodStockSchema }]),
    EmailModule,
    DonorsModule
  ],
  controllers: [BloodStockController],
  providers: [BloodStockService],
  exports: [BloodStockService, MongooseModule],  // Export MongooseModule so it can be used in other modules
})
export class BloodStockModule {}
