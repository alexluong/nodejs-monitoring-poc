import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  templateId: string;

  @Prop({ type: Object, required: true })
  data: Record<string, any>;

  @Prop()
  sentAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
