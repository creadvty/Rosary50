# Virtual Carthusian Rosary

## Overview

A contemplative virtual rosary application with scriptural meditations in the Carthusian tradition. The app presents a visual rosary interface where users can navigate through beads to view prayers, with Renaissance-style religious artwork accompanying each meditation. The application features a split-screen layout with prayer content on the left and a vertical rosary bead strip on the right for navigation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state, React useState for local UI state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for smooth transitions between prayer cards
- **Component Structure**: 
  - Pages in `client/src/pages/`
  - Reusable UI components in `client/src/components/ui/`
  - Feature components in `client/src/components/`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **Development**: tsx for TypeScript execution during development
- **Production Build**: esbuild bundles server code to CommonJS for deployment
- **API Pattern**: RESTful routes prefixed with `/api`

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains database table definitions
- **Migrations**: Managed via drizzle-kit with `db:push` command
- **Current Storage**: MemStorage class provides in-memory storage interface (can be swapped for database storage)

### Build System
- **Client Build**: Vite outputs to `dist/public/`
- **Server Build**: esbuild bundles to `dist/index.cjs`
- **Shared Code**: `shared/` directory contains code used by both client and server

## External Dependencies

### Database
- **PostgreSQL**: Required for production (DATABASE_URL environment variable)
- **Drizzle ORM**: Database toolkit with Zod integration for schema validation

### UI Framework
- **Radix UI**: Headless component primitives for accessibility
- **shadcn/ui**: Pre-built component library built on Radix
- **Lucide React**: Icon library

### Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Fonts
- **Google Fonts**: Cormorant Garamond (serif), Inter (sans), Libre Baskerville (body text)

### Development Tools
- **Replit Plugins**: Cartographer, dev banner, runtime error overlay for enhanced Replit development experience