import { Module } from '@nestjs/common';
import { BloodStockService } from './blood_stock.service';
import { BloodStockController } from './blood_stock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BloodStockSchema, BloodStock } from './schemas/blood_stock.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:BloodStock.name, schema: BloodStockSchema}]), BloodStockModule],
  controllers: [BloodStockController],
  providers: [BloodStockService],
})
export class BloodStockModule {}
