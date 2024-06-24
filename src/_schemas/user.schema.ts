import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  /**
   * Email address of the user.
   */
  @Prop()
  email: string;

  /**
   * Hashed password of the user.
   */
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
