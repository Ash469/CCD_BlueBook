# CCD Intern Book

## Overview
CCD Intern Book is a comprehensive platform designed to manage and streamline the internship process. It provides tools for tracking intern applications, managing placements, facilitating communication between interns and supervisors, and generating reports on internship outcomes.

## Features
- **Intern Profile Management**: Create and maintain detailed profiles for each intern
- **Application Tracking**: Monitor internship applications from submission to placement
- **Supervisor Dashboard**: Tools for supervisors to manage and evaluate interns
- **Reporting Tools**: Generate comprehensive reports on internship program metrics
- **Communication Center**: Integrated messaging system for interns and supervisors
- **Document Management**: Centralized storage for internship-related documents

## Installation

### Prerequisites
- Node.js (v14 or later)
- MongoDB (v4.4 or later)
- npm or yarn package manager

### Setup
1. Clone the repository:
```bash
git clone https://github.com/Ash469/CCD_BlueBook.git
cd ccd_internBook
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration settings
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Detailed Setup Guide

### Frontend Setup
1. Navigate to the client directory:
```bash
cd client
```

2. Install frontend dependencies:
```bash
npm install
# or
yarn install
```

3. Configure frontend environment:
```bash
cp .env.example .env.local
# Edit environment variables for API endpoint, authentication, etc.
```

4. Start the frontend development server:
```bash
npm run start
# or
yarn start
```

5. Build for production:
```bash
npm run build
# or
yarn build
```

### Backend Setup
1. Navigate to the server directory:
```bash
cd server
```

2. Install backend dependencies:
```bash
npm install
# or
yarn install
```

3. Set up the database:
```bash
# Start MongoDB service
mongod --dbpath /path/to/data/directory

# Initialize database (if needed)
npm run db:init
# or
yarn db:init
```

4. Configure backend environment:
```bash
cp .env.example .env
# Configure database connection, JWT secrets, etc.
```

5. Start the backend server:
```bash
npm run server
# or
yarn server
```

6. For production deployment:
```bash
npm run build:server
npm run start:prod
# or
yarn build:server
yarn start:prod
```

## Usage
After installation, access the application at `http://localhost:5173` (or the configured port).

### For Administrators
- Use the admin dashboard to manage system settings
- Create and assign supervisor accounts
- Generate system-wide reports

### For Supervisors
- Review and approve intern applications
- Assign interns to projects
- Evaluate intern performance
- Communicate with interns

### For Interns
- Create and maintain profiles
- Submit applications
- Upload required documents
- Track application status
- Communicate with supervisors

## Project Structure
```
ccd_internBook/
├── client/             # Frontend code
├── server/             # Backend API
├── config/             # Configuration files
├── docs/               # Documentation
├── scripts/            # Utility scripts
└── tests/              # Test suite
```

## Search Engine Optimization (SEO)

To make the CCD Intern Book more discoverable to search engines and potential users, follow these SEO best practices:

### Meta Tags Implementation

Add the following meta tags to the `<head>` section of your HTML pages:

```html
<!-- Basic Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="CCD Intern Book - A comprehensive platform for managing internship processes, applications, and communication at IIT Guwahati.">
<meta name="keywords" content="internship management, IIT Guwahati, placement tracker, intern profiles, IITG placement, engineering internships, student placements">
<meta name="author" content="Ayush Shandilya, Career & Counselling Division IITG">

<!-- Open Graph / Social Media Meta Tags -->
<meta property="og:title" content="Bluebook - IITG Internship & Placement Experience Platform">
<meta property="og:description" content="Access internship and placement experiences shared by IIT Guwahati students to prepare for your interviews.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://ccd-blue-book.vercel.app/">


<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Bluebook - IITG Internship & Placement Experience Platform">
<meta name="twitter:description" content="Access internship and placement experiences shared by IIT Guwahati students to prepare for your interviews.">

```

### Sitemap Integration

1. Create a `sitemap.xml` file in the public directory to help search engines discover and index your pages:

```xml

```

2. Reference your sitemap in the `robots.txt` file:

```plaintext
User-agent: *
Disallow:

Sitemap: https://ccd-blue-book.vercel.app/sitemap.xml
```

## Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Designed and Developed By
This application was designed and developed by **Ayush Shandilya**.

---
© 2025 CCD Intern Book | All Rights Reserved


