
# Notes Application – Full Stack (MERN + JWT)

A full-stack Notes Application built using the MERN stack with secure authentication, note management, search, and public read-only sharing.

---

## Features

### Authentication
- User signup and login
- Email verification
- Password hashing using bcrypt
- JWT-based authentication (Access & Refresh tokens)
- Secure logout
- Protected private routes

### Notes Management
- Create, edit, and delete notes
- Fetch notes for authenticated users
- Server-side search by title or content
- Notes are private by default

### Public Read-Only Notes
- Generate shareable public links
- Public notes can be viewed without login
- Works for both logged-in and logged-out users
- Editing remains restricted to the owner

---

## Tech Stack

- Frontend: React, Redux Toolkit, Redux Persist
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT, Refresh Tokens
- Email Service: Nodemailer

---

## Project Structure

```

project/
├── backend/
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── note.routes.js
│   ├── models/
│   │   ├── user.model.js
│   │   └── notes.model.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── .env
│
└── frontend/
├── src/
│   ├── Auth/
│   ├── Components/
│   ├── Note/
│   ├── Routes/
│   ├── Store/
│   └── App.jsx
├── .env
└── README.md

````

---

## Backend Setup

### Install dependencies
```bash
cd backend
npm install
````

### Environment Variables

Create a `.env` file in `backend`:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/notes_application
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
GMAIL_APP_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:5173
```

### Run backend

```bash
npm run dev
```

---

## Frontend Setup

### Install dependencies

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in `frontend`:

```env
VITE_API_URL=http://localhost:3000
```

### Run frontend

```bash
npm run dev
```

---

## Database Schema

### User

* name
* email
* password
* isVerified
* verificationToken
* resetPasswordToken
* resetPasswordExpire

### Note

* user (ObjectId)
* title
* content
* isPublic (Boolean)
* createdAt
* updatedAt

---

## API Overview

### Auth Routes (`/account`)

* POST `/signup` – Signup user and send verification email
* GET `/verify-email` – Verify email
* POST `/login` – Login and receive tokens
* POST `/logout` – Logout user

### Notes Routes (`/notes`)

* POST `/add` – Create note (JWT required)
* GET `/show-all` – Get all user notes (JWT required)
* GET `/show/:id` – Get single note (JWT required)
* PUT `/edit/:id` – Edit note (JWT required)
* DELETE `/delete/:id` – Delete note (JWT required)
* GET `/search?q=` – Search notes (JWT required)
* GET `/public/:id` – Get public read-only note (no auth)

---

## Public Note Access

Public notes are accessible via:

```
/note/:id
```

* No authentication required
* Read-only access
* Editing is restricted to authenticated owner

---

## Testing Checklist

* Signup
* Email verification
* Login
* Create note
* Edit note
* Delete note
* Search notes
* Generate shareable link
* Open public note while logged out
* Open public note while logged in
* Logout
* Token expiration handling

---

## License

MIT

````

---

## ✅ Recommended Commit Message

```bash
docs: add clean and preview-friendly README
````

---


