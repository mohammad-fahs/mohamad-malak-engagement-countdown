# Engagement Invitation Countdown

## Overview

This is a countdown timer application for an engagement celebration scheduled for December 12, 2025, at 6:00 PM. The application features an elegant digital invitation card with a real-time countdown timer, designed with Middle Eastern wedding aesthetic traditions in mind. Built as a single-page application using React with TypeScript on the frontend and Express.js on the backend, it provides a beautiful, responsive interface for sharing the special event with guests.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Client-side routing using Wouter for lightweight navigation
- Framer Motion for smooth animations, particularly for the countdown timer transitions

**UI Component Library**
- shadcn/ui component library (New York variant) providing pre-built, accessible React components
- Radix UI primitives as the foundation for complex interactive components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom color palette derived from the invitation card: burgundy (#7D1F3C), maroon (#8B2E48), cream (#F5F1E8), and gold (#D4AF37)

**Design System**
- Typography hierarchy using serif fonts (Cormorant Garamond/Playfair Display) for headings and sans-serif (Lato/Montserrat) for body text
- Arabic text support with Cairo/Tajawal font families
- Responsive layout with single-column centered design (max-width 4xl)
- Consistent spacing using Tailwind's 4-based scale (4, 8, 12, 16, 24 units)

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- React hooks for local component state
- Custom hooks for responsive behavior (useIsMobile, useToast)

**Key Features**
- Real-time countdown calculation updating every second
- Animated number transitions with pulse effect on seconds unit
- Responsive card display maintaining aspect ratio across devices
- Toast notifications system for user feedback

### Backend Architecture

**Server Framework**
- Express.js application serving both API endpoints and static assets
- HTTP server using Node.js built-in `http` module
- Middleware stack including JSON body parsing and URL encoding support

**Development vs Production**
- Development: Vite dev server integration with HMR (Hot Module Replacement) over websockets
- Production: Serves pre-built static assets from dist/public directory
- Environment-based configuration through NODE_ENV variable

**Route Structure**
- `/api/*` prefix for all API endpoints
- Fallback to index.html for client-side routing (SPA behavior)
- Static asset serving from public directory

**Build Process**
- Custom build script using esbuild for server bundling
- Dependency allowlist strategy to bundle specific packages and reduce syscalls
- Separate client build using Vite with optimized production output

**Storage Layer**
- In-memory storage implementation (MemStorage class) for user data
- Interface-based design (IStorage) allowing easy swapping to database implementations
- User schema with ID, username, and password fields

### External Dependencies

**Database Configuration**
- Drizzle ORM configured for PostgreSQL with schema in shared/schema.ts
- Migration files output to ./migrations directory
- Database credentials expected via DATABASE_URL environment variable
- Note: Currently using in-memory storage; Drizzle/PostgreSQL integration is configured but not actively used

**Third-Party Services & APIs**
- No external API integrations currently active
- No authentication providers configured
- No payment processing or email services

**Asset Management**
- Invitation card image stored in attached_assets directory
- Referenced via Vite alias (@assets) for type-safe imports
- Fonts loaded from Google Fonts CDN (Architects Daughter, DM Sans, Fira Code, Geist Mono families)

**Development Tools**
- Replit-specific plugins for error overlay, cartographer, and dev banner
- Runtime error modal for improved debugging experience
- TypeScript compilation with strict mode enabled
- Path aliases for clean imports (@/, @shared/, @assets/)

**Session Management**
- express-session package with connect-pg-simple for PostgreSQL session store (configured but not implemented)
- Alternative memorystore available for in-memory sessions