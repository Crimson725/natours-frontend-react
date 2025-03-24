# Natours Frontend
The frontend for the Natours application.
## Tech Stack

- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **API Client**: Axios
- **Maps Integration**: Leaflet
- **Testing**: Vitest, React Testing Library
- **Icon Library**: React Icons
- **Development Tools**: ESLint, Prettier, TypeScript
- **Performance Optimization**: Code Splitting with React.lazy and Suspense

## Performance Optimizations

### Code Splitting

This application uses code splitting to improve loading performance by:

- Lazy loading route components with React.lazy() and Suspense
- Organizing code chunks for optimal caching and loading
- Implementing a reusable LazyLoad utility component
- Custom Vite build configuration for better chunk management

The code splitting strategy breaks the application into several main chunks:
- Vendor libraries (React, React Router)
- UI Components
- Tour-related components
- Authentication components

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd natours-frontend

# Install dependencies
npm install
# or with pnpm
pnpm install
```

### Development

```bash
# Start the development server
npm run dev
# or
pnpm dev
```

### Building for Production

```bash
# Build the application
npm run build
# or
pnpm build

# Preview the production build
npm run preview
# or
pnpm preview
```
The backend of the application is available at [natours-backend](https://github.com/Crimson725/Natours).