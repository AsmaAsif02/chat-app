import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ versionKey: false, timestamps: true })
export class Message {
  /**
   * ID of the chat to which the message belongs.
   * References the Chat schema.
   */
  @Prop({ ref: 'Chat', type: SchemaTypes.ObjectId })
  chat_id: ObjectId;

  /**
   *Object ID of the user who sent the message.
   * References the User schema.
   */
  @Prop({ ref: 'User', type: SchemaTypes.ObjectId })
  sender_id: ObjectId;

   /**
   * Content of the message.
   */
  @Prop()
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
