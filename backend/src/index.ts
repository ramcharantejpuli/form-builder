import { app } from './app';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection initialized');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    process.exit(1);
  }
};

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
