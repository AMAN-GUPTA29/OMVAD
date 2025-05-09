# Link Saver + Auto-Summary

A modern web application that helps users save and organize their bookmarks with automatic metadata extraction, summaries, and smart tagging.

## Features

-  User Authentication
-  Bookmark Management
-  AI-Powered Summaries
-  Smart Tag Generation
-  Dark/Light Mode
-  Responsive Design
-  Drag-and-Drop Reordering

## Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router
- Axios
- @hello-pangea/dnd (Drag and Drop)

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Jina AI

## Project Structure

```
OMVAD/
├── frontend/          # React frontend application
├── backend/           # Node.js backend server
└── README.md         # This file
```

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd OMVAD
```

2. Set up the backend:
```bash
cd backend
npm install
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

4. Configure environment variables:
   - Create `.env` file in the backend directory
    - MONGODB_URI=
    - PORT=5000
    - JWT_SECRET=

   - See respective README files for required environment variables

5. Start the development servers:

In the backend directory:
```bash
npm start
```

In the frontend directory:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000




