import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//@Schema()
@Schema() 
export class Historique extends Document {

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  related_ids!: string[]; // Array of related entity IDs

  @Prop({ required: true })
  details!: string;
}

export const HistoriqueSchema = SchemaFactory.createForClass(Historique);
