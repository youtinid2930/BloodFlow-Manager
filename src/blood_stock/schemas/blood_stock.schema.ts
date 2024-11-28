import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class BloodStock extends Document {
  @Prop({ required: true })
  blood_type!: string;

  @Prop({ required: true })
  quantity!: number;

  @Prop({ required: true })
  storage_location!: string;

  @Prop({ required: true, type: Date })
  expiry_date!: Date;

  @Prop({ required: true, type: Date })
  last_update!: Date;

}

export const BloodStockSchema = SchemaFactory.createForClass(BloodStock);
