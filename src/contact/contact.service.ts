import { Injectable, Optional } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import {
  ContactSubmission,
  ContactSubmissionDocument,
} from './schemas/contact-submission.schema';

type MemoryContactSubmission = CreateContactDto & {
  createdAt: string;
  id: string;
  location: string;
  preferredDate: string;
  updatedAt: string;
};

@Injectable()
export class ContactService {
  private memorySubmissions: MemoryContactSubmission[] = [];

  constructor(
    @Optional()
    @InjectModel(ContactSubmission.name)
    private readonly contactModel?: Model<ContactSubmissionDocument>,
  ) {}

  private cloneData<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
  }

  async createSubmission(createContactDto: CreateContactDto) {
    if (!this.contactModel) {
      const timestamp = new Date().toISOString();
      const submission: MemoryContactSubmission = {
        ...createContactDto,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        location: createContactDto.location ?? '',
        preferredDate: createContactDto.preferredDate ?? '',
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      this.memorySubmissions = [submission, ...this.memorySubmissions];

      return {
        message: 'Contact request submitted successfully.',
        submission,
      };
    }

    const contactModel = this.contactModel;

    try {
      const submission = await contactModel.create(createContactDto);
      return {
        message: 'Contact request submitted successfully.',
        submission,
      };
    } catch {
      const timestamp = new Date().toISOString();
      const submission: MemoryContactSubmission = {
        ...createContactDto,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        location: createContactDto.location ?? '',
        preferredDate: createContactDto.preferredDate ?? '',
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      this.memorySubmissions = [submission, ...this.memorySubmissions];

      return {
        message: 'Contact request submitted successfully.',
        submission,
      };
    }
  }

  async getAllSubmissions() {
    if (!this.contactModel) {
      return this.cloneData(this.memorySubmissions);
    }

    const contactModel = this.contactModel;

    try {
      return await contactModel.find().sort({ createdAt: -1 }).lean();
    } catch {
      return this.cloneData(this.memorySubmissions);
    }
  }
}
