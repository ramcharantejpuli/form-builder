"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
async function initializeDatabase() {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log('Database has been initialized!');
        // Create database schema
        await data_source_1.AppDataSource.synchronize();
        console.log('Database schema has been created!');
        process.exit(0);
    }
    catch (error) {
        console.error('Error during database initialization:', error);
        process.exit(1);
    }
}
initializeDatabase();
