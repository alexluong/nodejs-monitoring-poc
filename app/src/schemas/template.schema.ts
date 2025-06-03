import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TemplateDocument = HydratedDocument<Template>;

@Schema({ timestamps: true })
export class Template {
  @Prop({ required: true })
  template: string;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
