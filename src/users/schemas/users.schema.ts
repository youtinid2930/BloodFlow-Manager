import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../../roles/enum/role.enum';



@Schema()
export class User extends Document {

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;
  
  @Prop({ required: true})
  donor_id!: Types.ObjectId;
 
  @Prop({ type: String, enum: Role, default: Role.manager })
  role!: Role;

  @Prop()
  refreshToken!: string;
}

// Create the schema
export const UserSchema = SchemaFactory.createForClass(User);
