import { PartialType } from '@nestjs/mapped-types';
import { CreateBloodStockDto } from './create-blood_stock.dto';

export class UpdateBloodStockDto extends PartialType(CreateBloodStockDto) {}
