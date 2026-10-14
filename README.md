# AIIMS GHA

AIIMS GHA is a web application with a React frontend and an Express backend. The backend connects to MySQL and exposes API routes for user, admin, and authentication features.

## Project structure

```text
AIIMS GHA/
├── backend/   # Express API and MySQL connection
└── frontend/  # React application built with Vite
```

## Requirements

- Node.js and npm
- MySQL server and a database for the application

## Configuration

Create `backend/.env` with your local database settings. Do not commit this file or put real credentials in GitHub.

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
DB_PORT=3306
DB_CONNECTION_LIMIT=10
```

The backend currently allows browser requests from `http://10.1.24.75:5173`. If your frontend runs at a different address, update the allowed origin in `backend/src/index.js`.

## Run locally

Open two terminals from the project root.

Start the backend:

```bash
cd backend
npm install
npm run dev
```

Start the frontend in the second terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite prints the frontend address in the terminal (typically `http://localhost:5173`). The frontend API client currently uses `http://localhost:3000/API/` as its base URL.

## Frontend scripts

From `frontend/`:

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run preview  # Preview the production build
npm run lint     # Run lint checks
```

## Collaboration

Create a feature branch for each change, commit related work with a clear message, and open a pull request to review it before merging into `main`. Keep `.env` files, passwords, tokens, and other credentials out of commits.
