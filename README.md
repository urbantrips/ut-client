# Urban Trips Client

A Next.js 14+ application built with TypeScript, Tailwind CSS, Framer Motion, TanStack Query, Zod, and Zustand.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable components
│   ├── ui/          # Base UI components
│   └── features/    # Feature-specific components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── store/           # Zustand stores
├── types/           # TypeScript types
└── schemas/         # Zod schemas
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Primary Color

The primary color is `rgba(255, 220, 46, 1)` (yellow), configured in Tailwind CSS as `primary`.

## Tech Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **TanStack Query** - Data fetching and caching
- **Zod** - Schema validation
- **Zustand** - State management

# ut-client
