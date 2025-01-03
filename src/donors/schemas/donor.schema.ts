import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Donor extends Document { 

  @Prop({ required: true })
  name!: string; 

  @Prop({ required: true })

  date_naiss!: Date; 

  @Prop({ required: true })
  blood_type!: string; 

  @Prop({ required: false })
  email!: string;

  @Prop({ required: true })
  phone_number!: string;

  @Prop({ required: true })
  last_donation_date!: Date; 
}

export const DonorSchema = SchemaFactory.createForClass(Donor);

