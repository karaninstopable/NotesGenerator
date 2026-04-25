# NoteVault — MERN Notes App with RBAC

A full-stack notes application built with MongoDB, Express, React, and Node.js. Includes role-based access control (RBAC) with User and Admin roles.

## Features

- **Auth** — Register, login, JWT-based sessions
- **Notes** — Create, edit, delete, pin, color-code, tag, and search notes
- **Admin Panel** — Manage users, toggle roles/status, view any user's notes
- **Responsive** — Works on desktop and mobile

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running locally (`mongod`) or a MongoDB Atlas URI

### 1. Backend Setup

```bash
cd backend
npm install
# Edit .env if needed (default works for local MongoDB)
npm run seed       # Creates admin@example.com / admin123 + sample notes
npm run dev        # Starts on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
# Edit .env if your backend runs on a different port
npm start          # Starts on http://localhost:3000
```

### Default Credentials (after seeding)
| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | Admin |

Register any new account to get a regular User role.

## Project Structure

```
notes-app/
├── backend/
│   ├── controllers/     # authController, notesController, usersController
│   ├── middleware/       # JWT auth + role authorization
│   ├── models/          # User, Note (Mongoose schemas)
│   ├── routes/          # /api/auth, /api/notes, /api/users
│   ├── server.js        # Express app entry point
│   ├── seed.js          # Create admin + sample data
│   └── .env             # Environment variables
└── frontend/
    ├── public/
    └── src/
        ├── components/  # NoteCard, NoteModal, Layout, LoadingSpinner
        ├── context/     # AuthContext (JWT state)
        ├── pages/       # LoginPage, RegisterPage, NotesPage, AdminPage
        ├── utils/       # api.js (Axios instance + API helpers)
        └── .env         # REACT_APP_API_URL
```

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/register | Public | Register |
| POST | /api/auth/login | Public | Login |
| GET | /api/auth/me | User | Get current user |
| PUT | /api/auth/password | User | Update password |
| GET | /api/notes | User | Get notes (all for admin) |
| POST | /api/notes | User | Create note |
| PUT | /api/notes/:id | User/Admin | Update note |
| DELETE | /api/notes/:id | User/Admin | Delete note |
| PATCH | /api/notes/:id/pin | User/Admin | Toggle pin |
| GET | /api/users | Admin | Get all users |
| PUT | /api/users/:id/role | Admin | Update user role |
| PATCH | /api/users/:id/status | Admin | Toggle active status |
| DELETE | /api/users/:id | Admin | Delete user + notes |
| GET | /api/users/:id/notes | Admin | Get user's notes |

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/notes-app
JWT_SECRET=your_secret_here
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000  # optional, for CORS in production
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```
