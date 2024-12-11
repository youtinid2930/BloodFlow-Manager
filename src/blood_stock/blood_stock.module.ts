import { Module } from '@nestjs/common';
import { BloodStockService } from './blood_stock.service';
import { BloodStockController } from './blood_stock.controller';
<<<<<<< HEAD

@Module({
=======
import { MongooseModule } from '@nestjs/mongoose';
import { BloodStockSchema, BloodStock } from './schemas/blood_stock.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:BloodStock.name, schema: BloodStockSchema}]), BloodStockModule],
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
  controllers: [BloodStockController],
  providers: [BloodStockService],
})
export class BloodStockModule {}
