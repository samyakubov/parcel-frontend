# GEMINI.md

This file provides guidance to Gemini when working with code in this project.

## What are we building?

A platform where homeowners create a comprehensive profile for their home, documenting every renovation, upgrade, and improvement with photos, costs, and contractors. When it's time to sell, buyers get a complete 'resume' of the property instead of guessing what's been updated. Think of it as a CarFax report, but for your home's entire renovation history.

---

### Architecture

This project follows a **feature-driven modular architecture** using the Next.js App Router (`app/`) for routing and layouts.

- **App Router (`app/`)**:
    - Each route is a folder inside `app/` with `page.tsx` for the page component.
    - Use `layout.tsx` in route folders to define nested layouts and shared UI.
    - Server Components by default; use `"use client"` at the top of a file for client components.

- **Folder Structure**:
- `src/`
  - `app/`
  - `components/` - All components used in the pages
    - `ui/` - all shadcn components
  - `__tests__/` - Unit & integration tests
  - `utils/` - Utility functions
  - `hooks/` - Custom hooks
  - `constants/` - Global constant variables
  - `types/` - All types separated by where they are used (all new files have to use `*.d.ts`)

- **Data Fetching**:
- Prefer **Server Components** `async/await` in `page.tsx` or server components.

- **Styling**:
- Use TailwindCSS for all styling. Avoid inline styles unless dynamic.
- Place global styles in `app/globals.css`.

- **Error Handling**:
- Use `error.tsx` in route folders for route-specific error boundaries.
- Use `not-found.tsx` for 404 pages.

---

### Linting, Formatting & Type Checking

- Follow project ESLint rules. **No commits with lint errors.**
- **File Naming**: Use `snake-case` for files, `PascalCase` for components, and `.tsx` for React components.
- **Commands**:
    - `eslint` — Find all lint errors.
    - `eslint --fix` — Fix all fixable lint errors.
    - `npm run type-check` — Run TypeScript type check.

---

### General Development Rules

- **TypeScript First**: All code must be written in TypeScript. Avoid `any`; prefer strict typing and utility types.
- **Components**: Prefer functional components with React hooks. Keep components small, reusable, and use **shadcn components** where appropriate instead of building UI from scratch.
- **Imports**: Use relative paths (`@/components/...`).
- **Styling**: Use TailwindCSS. Avoid inline styles unless dynamic.
- **Error Handling**: Always handle API and async errors gracefully with fallback UI or messages.
- **Test for Every New File**: Every new component, utility, or module must have a corresponding test file following the `*.test.tsx` or `*.test.ts` naming convention. Place it in the appropriate folder (`/src/tests/unit` for unit tests, `/src/tests/integration` for integration tests).

---

### Testing

We use **Jest** for testing.

- **Naming Convention**: All test files should follow the `*.test.tsx` or `*.test.ts` pattern.
- **Unit Tests**: Place in `/src/__tests__/unit` for utilities and components.
- **Integration Tests**: Place in `/src/__tests__/integration` for critical flows.

**Available Commands**:

- `npm test` — Run all Jest tests once.
- `npm test:watch` — Run tests in **watch mode**, re-running affected tests on file changes.
- `npm test:coverage` — Run all tests and generate a **coverage report** (shows which lines/functions are tested).
- `npm test:verbose` — Show **detailed output**, listing each test result instead of only a summary.
- `npm test:silent` — Run tests with **minimal output**, suppressing console logs.

---

### Commits & Pull Requests

- Use clear commit messages and small PRs.
- Require review before merging.
- **Ensure all tests pass before creating a PR.**

---

### Security & Authentication

- **Environment Variables**:
    - Never expose secrets on the frontend.
    - Only use variables prefixed with `NEXT_PUBLIC_` for safe public data.
    - Store sensitive keys in `.env` and do not commit them.