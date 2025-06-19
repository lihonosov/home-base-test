# Home Based Test

This is a multi-module Maven project that demonstrates a full-stack application with a Spring Boot backend and a React frontend.

## Project Structure

The project is organized into the following modules:

- **backend**: Spring Boot application that provides REST APIs for user authentication and management
- **frontend**: React application with TypeScript that provides a user interface for authentication

## Prerequisites

- Java 21
- Maven 3.8+
- Node.js 18+ and npm (automatically managed by Maven)
- PostgreSQL database (automatically managed by Docker Compose)

## Building the Project

To build the entire project, run the following command from the project root:

```bash
mvn clean install -P FE
```

This will build both the backend and frontend modules.

## Environment Setup

The application uses environment variables for configuration. These are stored in a `.env` file at the project root.

1. Copy the example environment file to create your own:

```bash
cp .env.example .env
```

2. Edit the `.env` file to set your own values for the database credentials and JWT secret.

### How .env Files Are Loaded

The application automatically loads environment variables from the `.env` file at startup using Spring Boot's native support for .env files. This is configured in the application.yml file with the following property:

```yaml
spring:
  config:
    import: optional:file:.env[.properties]
```

The `optional:` prefix means that the application will still start even if the .env file is not found. The `.env[.properties]` suffix means that the .env file can be in either format.

If no `.env` file is found, the application will use default environment variables or fail if required variables are missing.

Note: In test environments, a separate configuration is used, defined in `src/test/resources/application.yml`.

## Running the Application

### Using Maven

1. Start the backend application:

```bash
cd backend
mvn spring-boot:run
```

### Running from the main method
Set the working directory to $ModuleFileDir$

2. In a separate terminal, start the frontend development server:

```bash
cd frontend/src/main/app
npm start
```

### Using Docker Compose

The backend module includes a Docker Compose file that sets up a PostgreSQL database. To start the database:

```bash
cd backend
docker-compose up -d
```

## Features

- User registration and login
- JWT-based authentication
- Responsive UI using Material-UI

## Technologies Used

- **Backend**:
  - Spring Boot 3.5
  - Spring Security
  - Spring Data JPA
  - PostgreSQL
  - Flyway for database migrations
  - JWT for authentication
  - Swagger UI: http://localhost:8080/swagger-ui.html

- **Frontend**:
  - React 18
  - TypeScript
  - Material-UI
  - React Router
  - Axios for API calls

### TODO: add tests
