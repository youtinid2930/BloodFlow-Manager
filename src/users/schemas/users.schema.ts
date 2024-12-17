import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;
  @Prop({ required: true})
  donor_id!: Types.ObjectId;
}

// Create the schema
export const UserSchema = SchemaFactory.createForClass(User);
