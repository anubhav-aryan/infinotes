# Infilects Client Tracking System

A modern monorepo for tracking client status and project management for Infilects.

## Architecture

This monorepo is organized using npm workspaces and Turbo for efficient builds and development.

### Structure

```
infilects-monorepo/
├── apps/
│   └── web/           # Next.js web application
├── packages/
│   ├── ui/            # Shared UI components
│   ├── types/         # Shared TypeScript types
│   ├── utils/         # Shared utility functions
│   └── database/      # Database models and connections
├── package.json       # Root workspace configuration
├── turbo.json         # Turbo build configuration
└── README.md
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development:
   ```bash
   npm run dev
   ```

3. Build all packages:
   ```bash
   npm run build
   ```

## Scripts

- `npm run dev` - Start all applications in development mode
- `npm run build` - Build all packages and applications
- `npm run lint` - Lint all packages
- `npm run type-check` - Type check all TypeScript files
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean all build outputs

## Tech Stack

- **Framework**: Next.js 15
- **Database**: MongoDB
- **Authentication**: OAuth2
- **Build System**: Turbo
- **Package Manager**: npm workspaces
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Development

Each package in the monorepo can be developed independently while sharing common dependencies and utilities.
