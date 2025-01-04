import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Donation extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Donor', required: true })
  donor_id!: Types.ObjectId;

  @Prop({ type: Date, required: true })
  donation_date!: Date;

  @Prop({ type: String, required: true })
  blood_type!: string;

  @Prop({ type: Number, required: true })
  quantity!: number;

  @Prop({ type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  status!: string;

  @Prop({ type: String, required: true })
  location!: string;
}

export const DonationSchema = SchemaFactory.createForClass(Donation);
