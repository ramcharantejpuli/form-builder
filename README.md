# Custom Form Builder

A modern form builder application with drag-and-drop functionality, built with React and Node.js.

## Features

- Drag-and-drop form builder interface
- Multiple form field types (Text, Number, Date, Checkbox, Dropdown, Radio)
- Form sharing via unique URLs
- Form submission handling and storage
- Submission analytics and CSV export
- Responsive design

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- React DnD for drag and drop
- TailwindCSS for styling
- React Query for data fetching
- Zod for form validation

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL database
- TypeORM for database operations
- JWT for authentication

## Project Structure

```
form-builder/
├── frontend/           # React frontend application
├── backend/            # Node.js backend application
└── docs/              # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. Set up environment variables (see .env.example in both frontend and backend directories)

4. Start the development servers:
   ```bash
   # Frontend
   cd frontend
   npm run dev

   # Backend
   cd ../backend
   npm run dev
   ```

## API Documentation

API documentation is available at `/api-docs` when running the backend server.

## License

MIT
