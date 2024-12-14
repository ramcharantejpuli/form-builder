# Dynamic Form Builder 🚀

A powerful, intuitive form builder that empowers users to create, share, and manage forms with ease. Built with modern web technologies and best practices in mind.

## ✨ Key Features

- **Drag-and-Drop Interface**: Intuitive form building experience
- **Real-time Preview**: See your form take shape as you build
- **Multiple Field Types**: 
  - Text Input
  - Number Input
  - Date Picker
  - Checkboxes
  - Radio Buttons
  - Dropdown Select
  - File Upload
- **Form Validation**: Built-in validation rules for each field type
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Form Sharing**: Generate shareable links for your forms
- **Submission Management**: Track and manage form responses
- **Data Export**: Export submissions to CSV format
- **User Authentication**: Secure access to forms and submissions

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React DnD for drag-and-drop functionality
- Axios for API communication
- React Router v6 for navigation

### Backend
- Node.js with Express
- TypeScript for type safety
- TypeORM for database operations
- PostgreSQL for data storage
- JWT for authentication

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ramcharantejpuli/form-builder.git
   cd form-builder
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Frontend (.env)
   REACT_APP_API_URL=http://localhost:3000

   # Backend (.env)
   PORT=3000
   DATABASE_URL=postgresql://username:password@localhost:5432/formbuilder
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the application**
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend development server
   cd frontend
   npm run dev
   ```

## 📱 Usage

1. **Create a Form**
   - Log in to your account
   - Click "Create New Form"
   - Drag and drop fields from the sidebar
   - Configure field properties and validation
   - Save your form

2. **Share Forms**
   - Click the "Share" button on any form
   - Copy the generated link
   - Share with your audience

3. **Manage Submissions**
   - View submissions in real-time
   - Export data to CSV
   - Filter and search through responses

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Project Author & Credits

This project is designed, developed, and maintained by:

**Puli Ram Charan Tej**
- Role: Full Stack Developer
- GitHub: [ramcharantejpuli](https://github.com/ramcharantejpuli)
- LinkedIn: [Ram Charan Tej Puli](https://www.linkedin.com/in/ram-charan-tej-puli/)
- Email: ramcharan.puli@gmail.com

All rights reserved 2024 Puli Ram Charan Tej

---

Made with ❤️ and ☕ by Puli Ram Charan Tej
