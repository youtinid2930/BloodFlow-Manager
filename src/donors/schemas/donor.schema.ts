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

  @Prop({ required: true })
  contact_info!: string;

  @Prop({ required: true })
  last_donation_date!: Date; 
}

export const DonorSchema = SchemaFactory.createForClass(Donor);

