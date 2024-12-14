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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSubmission = void 0;
const typeorm_1 = require("typeorm");
const Form_1 = require("./Form");
let FormSubmission = class FormSubmission {
};
exports.FormSubmission = FormSubmission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FormSubmission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Form_1.Form, form => form.submissions),
    (0, typeorm_1.JoinColumn)({ name: 'formId' }),
    __metadata("design:type", Form_1.Form)
], FormSubmission.prototype, "form", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FormSubmission.prototype, "formId", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], FormSubmission.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FormSubmission.prototype, "submittedAt", void 0);
exports.FormSubmission = FormSubmission = __decorate([
    (0, typeorm_1.Entity)('form_submissions')
], FormSubmission);
