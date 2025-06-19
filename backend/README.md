# Backend Module

This module contains the Spring Boot backend application for the Home Based Test project. It provides REST APIs for user authentication and management.

## Architecture

The backend follows a layered architecture:

- **Controller Layer**: Handles HTTP requests and responses
- **Service Layer**: Contains business logic
- **Repository Layer**: Manages data access
- **Model Layer**: Defines data entities
- **Security Layer**: Manages authentication and authorization

## Key Components

- **User Management**: Registration, authentication, and profile management
- **JWT Authentication**: Secure token-based authentication
- **Database Migration**: Flyway for database schema management

## Database

The application uses PostgreSQL as its database. The schema is managed by Flyway migrations.

### Database Schema

The main entity is the `users` table with the following structure:

- `id`: Primary key
- `username`: Unique username
- `password`: Encrypted password
- `email`: Unique email address
- `first_name`: User's first name
- `last_name`: User's last name
- `enabled`: Account status
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## API Endpoints

### Authentication

- `POST /api/auth/signin`: Authenticate a user and get a JWT token
- `POST /api/auth/signup`: Register a new user

## Running the Backend

### Prerequisites

- Java 21
- Maven 3.8+
- PostgreSQL (can be run using Docker Compose)

### Using Maven

```bash
mvn spring-boot:run
```

### Running from the main method
Set the working directory to $ModuleFileDir$

### Using Docker Compose for Database

The module includes a Docker Compose file to set up a PostgreSQL database:

```bash
docker-compose up -d
```

### Configuration

The application can be configured through `application.yml`:

- Database connection settings
- JWT secret and expiration time
- Logging levels
