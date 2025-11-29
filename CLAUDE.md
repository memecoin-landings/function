# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev              # Start Next.js development server with Turbopack
npm run build           # Build production bundle
npm run start           # Start production server
npm run lint            # Run ESLint checks
npm run copy-strapi-types # Copy Strapi types from backend

# Type checking (no dedicated command - use Next.js build)
npm run build           # Includes TypeScript type checking
```

## Architecture Overview

This is a Next.js 15 frontend application for Function Design Studio with a clean architecture approach:

### Core Structure
- **Domain Layer** (`src/domain/`): Business entities and core logic
  - `project/`: Project entities with repository pattern
  - `service/`: Service entities 
  - `form-view-model.ts`: Form handling logic
  - `image.ts`: Image entity management
  - `contacts.ts`: Contact management

- **Infrastructure Layer** (`src/infrastructure/`): External integrations
  - Strapi CMS integration with auto-generated types
  - Google Spreadsheet integration for lead tracking
  - Email service (Nodemailer)
  - Repository implementations (Strapi and POJO)

- **Application Layer** (`src/`):
  - `config.ts`: Environment-based configuration
  - `hooks/`: React hooks for state management
  - `lib/`: Shared utilities

### Frontend Structure
- **App Router** (`src/app/`): Next.js 15 app directory structure
  - Route groups: `(main)` and `(contacts)`
  - API routes in `api/` directory
  - Global layout with theme and toast providers

- **Components** (`src/components/`): Organized by purpose
  - `common/`: Shared UI components and providers
  - `layout/`: Layout-specific components
  - `blocks/`: Page section components
  - `cards/`: Reusable card components
  - `animation/`: Animation utilities

## Key Technologies

- **Next.js 15** with App Router and Turbopack
- **TypeScript** with strict configuration and decorators support
- **Tailwind CSS 4.x** for styling
- **Framer Motion** for animations
- **Strapi** headless CMS backend
- **Dependency Injection** using `tsyringe`
- **Google APIs** for spreadsheet integration

## Important Notes

- ESLint excludes `src/infrastructure/strapi/**` (auto-generated Strapi types)
- Strapi types are copied from backend via `copy-strapi-types` script
- Configuration supports multiple environments via `.env` files
- Image optimization configured for external domains via `IMAGE_HOSTS`
- Repository pattern implemented for data access abstraction
- Form handling uses view model pattern with validation