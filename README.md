# Bible SDK

A comprehensive, modular Bible SDK built with TypeScript and React. This monorepo contains core data clients, UI components, and hooks for building modern Bible applications.

## What's Inside

### Bible SDK Packages
- **`@youversion/core`** - Core API clients and TypeScript types for Bible data
- **`@youversion/ui`** - React UI components for Bible reading experiences
- **`@youversion/native`** - React Native UI components for Bible reading experiences
- **`@youversion/hooks`** - Shared hooks for React and React Native applications

### Example Applications
- **`web`** - Example Bible reading application

### Development Tools
- **`@repo/eslint-config`** - ESLint configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- **`@repo/typescript-config`** - Shared TypeScript configurations

All packages are 100% TypeScript with comprehensive type definitions.

## Quick Start

```bash
# Install dependencies
yarn install

# Start development
yarn build

# Start development
yarn dev
```

## Documentation

📚 **[Complete Features Guide](./packages/ui/README.md)** - Comprehensive documentation of all SDK features including:
- Bible reading interface
- Search functionality
- Verse selection system
- Actions and highlighting
- Integration patterns

📚 **[Core Guide](./packages/core/README.md)** - Comprehensive documentation core features:
- Setup
- API Client Usage

## Development Tools

This monorepo uses Turborepo for efficient development and includes:
- **TypeScript** for static type checking
- **ESLint** for code linting
- **Prettier** for code formatting
- **Turbo** for build orchestration

---

## Turborepo Commands

### Build
Build all apps and packages:

```bash
cd bible-sdk

# With global turbo installed (recommended)
turbo build

# Without global turbo
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

Build a specific package:

```bash
# Build just the UI package
turbo build --filter=@youversion/bible-ui

# Build just the docs
turbo build --filter=docs
```

### Development
Develop all apps and packages:

```bash
# Start all development servers
turbo dev

# Develop specific package
turbo dev --filter=web
turbo dev --filter=docs
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started at [vercel.com](https://vercel.com).

Enable remote caching to share build artifacts across your team:

```bash
# Authenticate with Vercel
turbo login

# Link to remote cache
turbo link
```

## Package Structure

```
bible-sdk/
├── apps/
│   └── web/            # Example Bible app
│   ├── api/           # API application
│   ├── docs/          # Documentation site
│   ├── web/           # Example Bible web app
│   └── youbible/      # YouBible application
├── packages/
│   ├── core/           # Core API clients and types
│   ├── ui/             # React UI components
│   ├── hooks/          # Shared React hooks
│   ├── native/         # React Native UI Components
│   ├── eslint-config/  # ESLint configuration
│   └── typescript-config/ # TypeScript configuration
└── docs/
    └── FEATURES.md     # Complete feature documentation
│   ├── core/          # Core API clients and types
│   ├── eslint-config/ # ESLint configuration
│   ├── hooks/         # Shared React hooks
│   ├── native/        # React Native UI Components
│   ├── typescript-config/ # TypeScript configuration
│   └── ui/            # React UI components with SDK features:
│       ├── sdk/features/
│       │   ├── bible-reader/
│       │   ├── highlights/
│       │   ├── search/
│       │   ├── verse-action-picker/
│       │   ├── verse-selection/
│       │   └── youversion-auth/
```

## Learn More

- 📖 **[Features Documentation](./docs/FEATURES.md)** - Complete guide to all SDK features
- ⚡ **[Turborepo Documentation](https://turborepo.com/docs)** - Learn about the build system
- 🔧 **[Package Development](./packages/README.md)** - Contributing to SDK packages

### Turborepo Resources
- [Tasks](https://turborepo.com/docs/core-concepts/tasks)
- [Caching](https://turborepo.com/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/core-concepts/filtering)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/cli)