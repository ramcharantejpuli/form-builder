"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Form_1 = require("./entities/Form");
const FormSubmission_1 = require("./entities/FormSubmission");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'formbuilder',
    synchronize: true, // Set to false in production
    logging: process.env.NODE_ENV === 'development',
    entities: [Form_1.Form, FormSubmission_1.FormSubmission],
    subscribers: [],
    migrations: [],
});
