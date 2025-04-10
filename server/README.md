# Intern BlueBook Backend

## Overview
The Intern BlueBook Backend is a Node.js application built with Express that allows users to submit and manage their internship and placement experiences. The application connects to a MongoDB database to store experience data.

## Features
- Create, read, update, and delete (CRUD) experiences.
- Store experience details such as student name, branch, CPI, company, role, interview mode, and more.
- Error handling middleware for standardized error responses.

## Technologies Used
- Node.js
- Express
- MongoDB (with Mongoose)
- dotenv for environment variable management
- Nodemon for development

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- MongoDB database (local or cloud) to connect to.

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd intern-bluebook-backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   ```

### Running the Application
To start the server in development mode, use Nodemon:
```
npm run dev
```

The server will run on `http://localhost:5000` (or the port specified in your app).

### API Endpoints
- `POST /api/experiences` - Create a new experience
- `GET /api/experiences` - Retrieve all experiences
- `GET /api/experiences/:id` - Retrieve a specific experience by ID
- `PUT /api/experiences/:id` - Update an experience by ID
- `DELETE /api/experiences/:id` - Delete an experience by ID

### Error Handling
The application includes middleware for handling errors, ensuring that clients receive standardized error responses.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.