# Overview

SecureAuth is a full-stack authentication application built with React and Express.js. The application provides user registration, login, and dashboard functionality with JWT-based authentication. It features a modern UI built with shadcn/ui components and implements secure authentication patterns with password hashing and protected routes.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built with React using TypeScript and follows a component-based architecture:

- **Framework**: React with TypeScript, bundled using Vite
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Routing**: wouter for client-side routing with protected route components
- **State Management**: TanStack Query (React Query) for server state management
- **Authentication Context**: React Context API for managing authentication state across the application

The frontend implements a clean separation between pages (landing, login, register, dashboard), reusable UI components, and authentication logic. Protected routes automatically redirect unauthenticated users to the login page.

## Backend Architecture
The server-side uses Express.js with TypeScript in a REST API pattern:

- **Framework**: Express.js with TypeScript using ES modules
- **Authentication**: JWT tokens with bcrypt for password hashing (12 salt rounds)
- **Middleware**: Custom authentication middleware for protected endpoints
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Development**: Custom logging middleware for API request tracking

The API follows RESTful conventions with `/api/auth` endpoints for authentication operations (register, login, user profile).

## Data Storage Solutions
Database layer uses Mongoose ODM with MongoDB:

- **ODM**: Mongoose for MongoDB object modeling with TypeScript
- **Database**: MongoDB (external database via MONGODB_URI)
- **Schema**: MongoDB models in server/models directory with TypeScript interfaces
- **Connection**: Connection caching and automatic reconnection handling

The user schema includes standard fields (_id, email, password, firstName, lastName) with automatic timestamp tracking for account creation and last login. Email addresses are automatically converted to lowercase and indexed for performance.

## Authentication and Authorization
Implements secure JWT-based authentication:

- **Password Security**: bcrypt hashing with 12 salt rounds
- **Token Management**: JWT tokens stored in localStorage with configurable secret
- **Route Protection**: Middleware-based authentication for API endpoints
- **Client-side Protection**: Protected route components that verify authentication state
- **Session Management**: Automatic token validation and user context management

## External Dependencies

- **Database**: External MongoDB database (configured via MONGODB_URI)
- **ODM**: Mongoose for MongoDB object modeling and validation
- **UI Framework**: Radix UI primitives for accessible component foundation
- **Development Tools**: Replit-specific plugins for development environment integration
- **Build Tools**: Vite for frontend bundling, esbuild for server-side compilation
- **Validation**: Zod for runtime type validation and form schema validation

The application is designed to be deployment-ready with separate build processes for client and server, environment-based configuration, and proper error boundaries. MongoDB connection includes automatic caching and reconnection handling for production reliability.