# Angular Fire & Ice app

This repo is a small full‑stack setup with:

- `client/` - Angular 20+
- `server/` - Node.js + Express API (TypeScript)
- `shared/` - Shared TypeScript models used by both client and server

## Folder structure

- `client/`
  - Angular app generated with Angular CLI
  - Uses SCSS
- `server/`
  - Minimal Express app in TypeScript
  - CORS enabled for the Angular dev server
- `shared/`
  - Published as a local package `@angular-fire-ice/shared`
  - Built with `tsc` to `shared/dist`
  - Currently contains shared interfaces like `User`

## Shared types approach

- `shared/src/index.ts` exports interfaces example:

  export interface User {
    id: string;
    email: string;
    name: string;
  }

## How to Run

### Step 1: Install dependencies

Install dependencies for all three folders:

# Install shared package dependencies and build the shared package

cd shared
npm install
npm run build

# Install server dependencies

cd ../server
npm install

# Install client dependencies

cd ../client
npm install

### Step 2: Run the backend server (Terminal 1):

cd server

# Optional: create or edit .env
# PORT=8080
# CLIENT_URL=http://localhost:4200

npm start

The API server will be available at: http://localhost:8080

### Step 3: Run the Angular client (Terminal 2):

cd client
npm start

The Angular app will be available at: http://localhost:4200

### Step 4: Run backend tests (Terminal 3):

cd server
npm test
