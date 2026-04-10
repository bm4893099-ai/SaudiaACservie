import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactService } from './contact.service';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('contact')
  async createContact(@Body() createContactDto: CreateContactDto) {
    return this.contactService.createSubmission(createContactDto);
  }

  @Get('admin/contact-submissions')
  async getContactSubmissions() {
    return this.contactService.getAllSubmissions();
  }
}
