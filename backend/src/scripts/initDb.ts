import { AppDataSource } from '../data-source';

async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('Database has been initialized!');

    // Create database schema
    await AppDataSource.synchronize();
    console.log('Database schema has been created!');

    process.exit(0);
  } catch (error) {
    console.error('Error during database initialization:', error);
    process.exit(1);
  }
}

initializeDatabase();
