# Link Saver Backend

The backend server for Link Saver, built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher)
- OpenAI API key

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PORT=5000
MONGODB_URI
JWT_SECRET=your_jwt_secret_key
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The server will be available at http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/users` - Register a new user
  - Body: `{ email: string, password: string }`
  - Returns: `{ message: string }`

- `POST /api/users/login` - Login user
  - Body: `{ email: string, password: string }`
  - Returns: `{ token: string }`

### Bookmarks

- `GET /api/bookmarks` - Get user's bookmarks
  - Query params: `page` (number), `limit` (number)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ bookmarks: Array, totalPages: number, totalBookmarks: number }`

- `POST /api/bookmarks` - Create a new bookmark
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ url: string }`
  - Returns: `{ bookmark: Object }`

- `DELETE /api/bookmarks/:id` - Delete a bookmark
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ message: string }`

- `PUT /api/bookmarks/reorder` - Reorder bookmarks
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ bookmarks: Array }`
  - Returns: `{ message: string }`

## Project Structure

```
backend/
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── utils/          # Utility functions
├── index.js        # Application entry point
└── package.json    # Project dependencies
```

## Features

- User authentication with JWT
- MongoDB database integration
- Bookmark management
- Automatic metadata extraction
- AI-powered summaries using OpenAI
- Smart tag generation
- Pagination support
- Error handling middleware

## Dependencies

- Express
- Mongoose
- JWT
- Bcrypt
- OpenAI
- JSDOM
- Node-fetch
- CORS
- Dotenv


## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- CORS is enabled for the frontend domain
- Input validation is implemented
- Rate limiting is applied to prevent abuse 