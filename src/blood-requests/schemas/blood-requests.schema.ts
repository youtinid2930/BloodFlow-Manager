import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BloodRequest extends Document {
  @Prop({ required: true })
  requester_name!: string;

  @Prop({ required: true })
  blood_type!: string;

  @Prop({ required: true })
  quantity!: number;

  @Prop({ required: true, default: 'pending' })
  status!: string;

  @Prop({ required: true })
  request_date!: Date;

  @Prop({ required: true })
  contact_info!: string;
}

export const BloodRequestSchema = SchemaFactory.createForClass(BloodRequest);
