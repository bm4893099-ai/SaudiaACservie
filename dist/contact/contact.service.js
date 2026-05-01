"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const contact_submission_schema_1 = require("./schemas/contact-submission.schema");
let ContactService = class ContactService {
    constructor(contactModel) {
        this.contactModel = contactModel;
        this.memorySubmissions = [];
    }
    cloneData(value) {
        return JSON.parse(JSON.stringify(value));
    }
    async createSubmission(createContactDto) {
        if (!this.contactModel) {
            const timestamp = new Date().toISOString();
            const submission = {
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
        }
        catch {
            const timestamp = new Date().toISOString();
            const submission = {
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
        }
        catch {
            return this.cloneData(this.memorySubmissions);
        }
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, mongoose_1.InjectModel)(contact_submission_schema_1.ContactSubmission.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ContactService);
//# sourceMappingURL=contact.service.js.map