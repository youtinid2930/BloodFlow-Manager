import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Donation extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Donor', required: true })
  donor_id: string;

  @Prop({ type: Date, required: true })
  donation_date: Date;

  @Prop({ type: String, required: true })
  blood_type: string;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: String, enum: ['pending', 'tested', 'approved', 'rejected'], default: 'pending' })
  status: string;

  @Prop({ type: String, required: true })
  location: string;
}

export const DonationSchema = SchemaFactory.createForClass(Donation);
