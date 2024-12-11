import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

<<<<<<< HEAD
@Schema()
export class Historique extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  related_ids: string[]; // Array of related entity IDs

  @Prop({ required: true })
  details: string;
=======
//@Schema()
@Schema() 
export class Historique extends Document {

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  related_ids!: string[]; // Array of related entity IDs

  @Prop({ required: true })
  details!: string;
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
}

export const HistoriqueSchema = SchemaFactory.createForClass(Historique);
