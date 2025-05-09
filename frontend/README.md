# Link Saver Frontend

The frontend application for Link Saver, built with React and Tailwind CSS.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Environment Variables



## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The server will be available at http://localhost:5173

## Available Scripts

- `npm run dev` - Start the development server

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
├── public/             # Static assets
├── index.html          # HTML template
└── package.json        # Project dependencies and scripts
```

## Features

- User authentication (login/register)
- Bookmark management
- Drag-and-drop reordering
- Dark/light mode
- Responsive design
- Automatic metadata extraction
- AI-powered summaries
- Smart tag generation

## Dependencies

- React
- React Router
- Tailwind CSS
- Axios
- @hello-pangea/dnd
- Heroicons

