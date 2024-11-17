import { Module } from '@nestjs/common';
import { BloodStockService } from './blood_stock.service';
import { BloodStockController } from './blood_stock.controller';

@Module({
  controllers: [BloodStockController],
  providers: [BloodStockService],
})
export class BloodStockModule {}
