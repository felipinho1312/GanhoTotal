# Gestor de Ganhos - Financial Manager

## Overview

Gestor de Ganhos is a Brazilian Portuguese financial management application that helps users track their income and expenses. The application provides a dashboard with financial metrics, data visualization through charts, and filtering capabilities for financial entries. It features a clean, modern interface with support for both light and dark themes, built with a focus on data clarity and accessibility.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- SPA (Single Page Application) architecture with client-side routing handled via page state

**UI Component Library**
- shadcn/ui component system built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Component library follows "new-york" style variant from shadcn
- Custom color scheme with CSS variables for theme switching
- Roboto font family (400, 500 weights) from Google Fonts

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- React hooks for local component state
- Session-based authentication state managed through API endpoints

**Data Visualization**
- Chart.js for rendering financial charts (line and bar charts)
- react-chartjs-2 wrapper for React integration
- Custom chart components for balance tracking and monthly comparisons

**Theme System**
- Custom ThemeProvider context for light/dark mode switching
- Persistent theme preference via localStorage
- CSS custom properties for dynamic theming
- Material Design influences with Bootstrap 5 spacing system

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server
- TypeScript for type safety across server code
- ESM (ES Modules) module system

**Session Management**
- express-session middleware for user sessions
- Cookie-based session storage with configurable security settings
- Session expires after 7 days of inactivity

**Data Storage Strategy**
- In-memory storage implementation (MemStorage class) for development
- Abstracted storage interface (IStorage) for future database implementations
- Drizzle ORM configured for PostgreSQL migrations (ready for production database)
- Schema defined using Drizzle with support for users and financial entries

**API Design**
- RESTful API endpoints under `/api` prefix
- JSON request/response format
- Session-based authentication for protected routes
- Error handling with appropriate HTTP status codes

**Development Features**
- Request/response logging middleware
- Vite middleware integration for development
- Hot reload support through Vite's HMR

### Database Schema

**Users Table**
- `id`: UUID primary key (auto-generated)
- `email`: Unique text field for user identification
- `password`: Text field (currently plain text - not production ready)

**Entries Table**
- `id`: UUID primary key (auto-generated)
- `userId`: Foreign key reference to users
- `date`: Text field storing ISO date string
- `amount`: Real/float number (positive for gains, negative for losses)
- `description`: Optional text field
- `type`: Text field ("Ganho" or "Perda")
- `createdAt`: Timestamp with default to current time

**Data Validation**
- Zod schemas derived from Drizzle table definitions
- Input validation on both client and server
- Type-safe data transformations

### Authentication & Authorization

**Current Implementation**
- Basic email/password authentication (not production-ready)
- Plain text password storage (requires hashing for production)
- Session-based authentication using express-session
- User ID stored in session cookie
- Protected API endpoints check session for userId

**Security Considerations**
- HTTPS required in production (cookie secure flag)
- HttpOnly cookies to prevent XSS attacks
- CORS and session configuration for production deployment needed

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL driver for Neon serverless database
- **drizzle-orm**: TypeScript ORM for database operations
- **drizzle-kit**: Database migration tool
- **express**: Web server framework
- **express-session**: Session middleware for authentication
- **vite**: Build tool and development server
- **react**: UI library
- **react-dom**: React DOM rendering

### UI Component Libraries
- **@radix-ui/***: Headless UI component primitives (20+ components)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Variant-based component styling
- **lucide-react**: Icon library

### Data & Forms
- **@tanstack/react-query**: Data fetching and caching
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Schema validation
- **drizzle-zod**: Zod schema generation from Drizzle tables

### Visualization
- **chart.js**: Chart rendering library
- **react-chartjs-2**: React wrapper for Chart.js

### Utilities
- **date-fns**: Date manipulation library
- **clsx** & **tailwind-merge**: Conditional className utilities
- **cmdk**: Command menu component

### Development Tools
- **typescript**: Type checking
- **tsx**: TypeScript execution for development
- **esbuild**: JavaScript bundler for production builds
- **@vitejs/plugin-react**: Vite React plugin
- **postcss** & **autoprefixer**: CSS processing

### Database
- **PostgreSQL** (via Neon serverless): Primary database (configured but may not be provisioned yet)
- **connect-pg-simple**: PostgreSQL session store (configured but using default memory store)