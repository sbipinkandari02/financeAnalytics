# SecureAuth - Full-Stack Authentication App

A modern full-stack authentication application built with React, Express.js, and MongoDB. Features secure user registration, login, and dashboard functionality with JWT-based authentication.

## 🚀 Features

- **User Authentication**: Secure registration and login system
- **JWT Tokens**: Stateless authentication with 7-day token expiry
- **Password Security**: bcrypt hashing with 12 salt rounds
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Protected Routes**: Client-side route protection
- **MongoDB Integration**: Mongoose ODM with TypeScript support
- **Real-time Validation**: Form validation with Zod schemas

## 🛠 Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for fast development and building
- **wouter** for client-side routing
- **TanStack Query** for server state management
- **shadcn/ui** component library
- **Tailwind CSS** for styling
- **Radix UI** for accessible components

### Backend
- **Express.js** with TypeScript
- **Mongoose** ODM for MongoDB
- **bcrypt** for password hashing
- **jsonwebtoken** for JWT authentication
- **Zod** for data validation

### Database
- **MongoDB** with Mongoose ODM
- User schema with automatic timestamps
- Email indexing for performance

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB database (local or MongoDB Atlas)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd secureauth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## 🏗 Project Structure

```
├── client/src/           # Frontend React application
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and configurations
│   ├── pages/           # Application pages/routes
│   └── App.tsx          # Main React component
├── server/              # Backend Express.js application
│   ├── db/              # Database connection
│   ├── models/          # Mongoose data models
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   └── storage.ts       # Data access layer
├── shared/              # Shared types and schemas
│   └── schema.ts        # Zod validation schemas
└── package.json         # Project dependencies
```

## 🔐 Authentication Flow

1. **Registration**: Users create accounts with email, password, first name, and last name
2. **Login**: Users authenticate with email and password
3. **JWT Token**: Server generates JWT token with 7-day expiry
4. **Protected Routes**: Client stores token and validates access to protected pages
5. **Dashboard**: Authenticated users access personalized dashboard

## 🌐 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - User logout

## 🚀 Deployment

The application is configured for deployment on platforms like:
- **Replit** (recommended for development)
- **Vercel** or **Netlify** (frontend)
- **Railway** or **Heroku** (backend)
- **MongoDB Atlas** (database)

### Environment Variables for Production
```env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
```

## 🔒 Security Features

- Password hashing with bcrypt (12 salt rounds)
- JWT token-based authentication
- Protected API endpoints with middleware
- Input validation with Zod schemas
- Secure MongoDB connection with connection caching

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [TanStack Query](https://tanstack.com/query) for server state management