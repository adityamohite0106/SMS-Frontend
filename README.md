# Student Management System

A comprehensive web-based application for managing student records, courses, grades, and academic information. This system provides an intuitive interface for administrators, teachers, and students to interact with academic data efficiently.

## Features

### For Administrators
- **Student Management**: Add, edit, delete, and view student profiles
- **Course Management**: Create and manage courses, subjects, and curricula
- **Teacher Management**: Manage teacher accounts and assignments
- **Reports & Analytics**: Generate detailed reports on student performance
- **User Role Management**: Control access levels for different user types
<img width="1920" height="1008" alt="Screenshot 2025-07-22 110639" src="https://github.com/user-attachments/assets/e4a73a25-8dd9-410d-90fb-833c88bfadfe" />

### For Teachers
- **Grade Management**: Input and update student grades and assessments
- **Attendance Tracking**: Mark and monitor student attendance
- **Course Content**: Upload and manage course materials
- **Student Progress**: Track individual student performance
- **Class Scheduling**: View and manage class timetables

### For Students
- **Profile Management**: View and update personal information
- **Grade Viewing**: Check current grades and academic progress
- **Course Enrollment**: Register for available courses
- **Attendance History**: View attendance records
- **Academic Calendar**: Access important dates and schedules

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Bootstrap 5
- **File Upload**: Multer for handling file uploads
- **PDF Generation**: jsPDF for report generation

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (v14.0.0 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/student-management-system.git
   cd student-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/student_management
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   UPLOAD_PATH=./uploads
   ```

4. **Start MongoDB service**
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
student-management-system/
├── config/
│   ├── database.js
│   └── auth.js
├── controllers/
│   ├── authController.js
│   ├── studentController.js
│   ├── teacherController.js
│   └── courseController.js
├── middleware/
│   ├── auth.js
│   ├── validation.js
│   └── upload.js
├── models/
│   ├── User.js
│   ├── Student.js
│   ├── Teacher.js
│   ├── Course.js
│   └── Grade.js
├── routes/
│   ├── auth.js
│   ├── students.js
│   ├── teachers.js
│   └── courses.js
├── views/
│   ├── layouts/
│   ├── partials/
│   └── pages/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── uploads/
├── tests/
├── .env
├── .gitignore
├── package.json
└── server.js
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Grades
- `GET /api/grades/student/:id` - Get grades for a student
- `POST /api/grades` - Add new grade
- `PUT /api/grades/:id` - Update grade
- `DELETE /api/grades/:id` - Delete grade

## Usage

### Default Admin Account
After initial setup, you can log in with:
- **Username**: admin@school.edu
- **Password**: admin123

### Adding Students
1. Log in as an administrator
2. Navigate to "Students" section
3. Click "Add New Student"
4. Fill in the required information
5. Submit the form

### Managing Courses
1. Access the "Courses" section
2. Create new courses with course codes, names, and credits
3. Assign teachers to courses
4. Set enrollment limits and prerequisites

### Recording Grades
1. Teachers can access their assigned courses
2. Select a course and view enrolled students
3. Input grades for assignments, exams, and projects
4. Grades are automatically calculated and saved

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Deployment

### Using Docker

1. **Build the Docker image**
   ```bash
   docker build -t student-management-system .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

### Manual Deployment

1. **Set environment to production**
   ```bash
   export NODE_ENV=production
   ```

2. **Build the application**
   ```bash
   npm run build
   ```

3. **Start the server**
   ```bash
   npm start
   ```

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Input validation and sanitization
- CORS protection
- Rate limiting
- File upload restrictions
- SQL injection prevention

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## Support

For support and questions:

- **Email**: adityamohite4973@gmail.com

## Changelog

### Version 2.1.0
- Added bulk import functionality for students
- Improved grade calculation algorithms
- Enhanced reporting features

### Version 2.0.0
- Complete UI/UX redesign
- Added mobile responsive design
- Implemented real-time notifications
- Added backup and restore functionality

### Version 1.0.0
- Initial release
- Basic student, teacher, and course management
- Grade tracking and reporting

## Acknowledgments

- Bootstrap team for the UI framework
- MongoDB team for the database solution
- Express.js community for the web framework
- All contributors who have helped improve this project
