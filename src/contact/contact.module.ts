import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseEnabled } from '../database/database-config';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import {
  ContactSubmission,
  ContactSubmissionSchema,
} from './schemas/contact-submission.schema';

const databaseImports = databaseEnabled
  ? [
      MongooseModule.forFeature([
        { name: ContactSubmission.name, schema: ContactSubmissionSchema },
      ]),
    ]
  : [];

@Module({
  imports: [...databaseImports],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
