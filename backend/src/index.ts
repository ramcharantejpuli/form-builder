import { app } from './app';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv';

dotenv.config();

const PORT = parseInt(process.env.PORT || '3000', 10);

const startServer = async () => {
  try {
    await AppDataSource.initialize()
      .then(async () => {
        console.log('Database connection established successfully');
        
        app.listen(PORT, '0.0.0.0', () => {
          console.log(`Server is running on port ${PORT}`);
          console.log(`Environment: ${process.env.NODE_ENV}`);
          console.log(`Database host: ${process.env.DB_HOST}`);
        });
      })
      .catch((error) => {
        console.error('Error during server startup:', error);
        
        // If this is a connection error, log more details
        if (error.code === 'ECONNREFUSED') {
          console.error('Database connection failed. Please check:');
          console.error('1. Database host and port are correct');
          console.error('2. Database credentials are correct');
          console.error('3. Database service is running');
          console.error(`Host: ${process.env.DB_HOST}`);
          console.error(`Port: ${process.env.DB_PORT}`);
          console.error(`Database: ${process.env.DB_DATABASE}`);
        }
        
        process.exit(1);
      });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
