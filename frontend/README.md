# Frontend Module

This module contains the React frontend application for the Home Based Test project. It provides a user interface for authentication and user management.

## Architecture

The frontend follows a component-based architecture using React with TypeScript. The main components are:

- **App**: The main application component
- **Navigation**: The navigation bar component
- **Home**: The landing page component
- **Login**: The login form component
- **Register**: The registration form component
- **Profile**: The user profile component

## Key Features

- **User Authentication**: Login and registration forms
- **Profile Management**: View and manage user profile
- **Responsive Design**: Mobile-friendly UI using Material-UI
- **Type Safety**: TypeScript for better code quality and developer experience

## Project Structure

```
src/
├── components/       # React components
├── services/         # API services
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component
└── index.tsx         # Application entry point
```

## Services

- **auth.service.ts**: Handles authentication API calls and token management
- **axios-interceptor.ts**: Configures Axios for API requests with authentication

## Running the Frontend

### Prerequisites

- Node.js 18+ and npm (automatically managed by Maven)

### Development Mode

To run the frontend in development mode:

```bash
cd src/main/app
npm start
```

This will start the development server on http://localhost:3000.

### Using Maven

The frontend can also be built using Maven:

```bash
mvn clean install
```

This will:
1. Install Node.js and npm (if not already installed)
2. Install dependencies
3. Build the React application
4. Package the built files into a JAR

## Building for Production

To build the frontend for production:

```bash
cd src/main/app
npm run build
```

This creates an optimized production build in the `build` directory.

## Integration with Backend

The frontend is configured to proxy API requests to the backend during development. This is configured in `package.json`:

```json
{
  "proxy": "http://localhost:8080"
}
```

In production, both frontend and backend are served from the same origin, so no proxy configuration is needed.

## Technologies Used

- React 18
- TypeScript
- Material-UI for UI components
- React Router for navigation
- Axios for API requests
- React Hook Form for form handling
