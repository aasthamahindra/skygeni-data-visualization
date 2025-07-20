# Skylark Genie - Data Visualization Dashboard

![Skylark Genie Logo](https://github.com/aasthamahindra/skygeni-data-visualization/assets/your-username/skylark-genie-logo.png)

A comprehensive data visualization platform built with React, D3.js, and Express.js that provides powerful insights into business metrics and analytics.

## Features

### Frontend
- Interactive and responsive charts using D3.js
- Modern UI built with Material-UI
- Real-time data visualization
- Responsive design for all screen sizes
- State management with Redux Toolkit

### Backend
- RESTful API built with Express.js
- Data processing and aggregation
- CORS enabled for cross-origin requests
- Environment variable configuration
- Error handling and logging

## Technologies Used

### Frontend
- **Framework**: React
- **Visualization**: D3.js
- **UI Components**: Material-UI
- **State Management**: Redux Toolkit
- **Build Tool**: Vite
- **Styling**: CSS-in-JS with Emotion

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Dependencies**:
  - cors: For handling cross-origin requests
  - dotenv: Environment variable management
  - express: Web framework
  - Various other utilities for routing and middleware

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aasthamahindra/skygeni-data-visualization.git
   cd skygeni-data-visualization
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Update the .env file with your configuration
   ```

3. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

4. Start the development servers:
   - In one terminal (backend):
     ```bash
     cd backend
     npm run dev
     ```
   - In another terminal (frontend):
     ```bash
     cd frontend
     npm run dev
     ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
skygeni-data-visualization/
├── frontend/               # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Redux slices and async thunks
│   │   ├── pages/          # Page components
│   │   └── App.jsx         # Main application component
│   └── ...
├── backend/                # Backend Express server
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utility functions
│   │   └── server.js      # Server entry point
│   ├── .env.example       # Example environment variables
│   └── package.json       # Backend dependencies
└── README.md              # Project documentation
```

## API Endpoints

### Data Endpoints
- `GET /api/customer-types` - Get customer type distribution
- `GET /api/account-industries` - Get account industry data
- `GET /api/team-performance` - Get team performance metrics
- `GET /api/acv-ranges` - Get ACV range distribution

### Development

#### Backend Development
```bash
cd backend
npm run dev  # Start development server with nodemon
```

#### Frontend Development
```bash
cd frontend
npm run dev  # Start Vite development server
```

### Environment Variables

#### Backend (.env)
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Production Build

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Serve the frontend with a production server or deploy the `dist` folder to your hosting service.

3. For the backend, use a process manager like PM2 in production:
   ```bash
   npm install -g pm2
   cd backend
   pm2 start src/server.js --name "skygeni-backend"
   ```