import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from '../../schemas/template.schema';
import { CreateTemplateDto, UpdateTemplateDto } from '../../dtos/template';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<TemplateDocument>,
  ) {}

  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const createdTemplate = new this.templateModel(createTemplateDto);
    return createdTemplate.save();
  }

  async findAll(): Promise<Template[]> {
    return this.templateModel.find().exec();
  }

  async findOne(id: string): Promise<Template> {
    const template = await this.templateModel.findById(id).exec();
    if (!template) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
    return template;
  }

  async update(
    id: string,
    updateTemplateDto: UpdateTemplateDto,
  ): Promise<Template> {
    const updatedTemplate = await this.templateModel
      .findByIdAndUpdate(id, updateTemplateDto, { new: true })
      .exec();
    if (!updatedTemplate) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
    return updatedTemplate;
  }

  async remove(id: string): Promise<void> {
    const result = await this.templateModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
  }
}
