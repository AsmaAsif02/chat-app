import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema({ versionKey: false, timestamps: true })
export class Chat {
   /**
   * Array of member IDs participating in the chat.
   * Each member ID references the User schema.
   */
  @Prop({ ref: 'User', type: [SchemaTypes.ObjectId] })
  members: [ObjectId];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
