📘 Notes Application – Full Stack (MERN + JWT)
A fully-featured full stack Notes App with:
🔐 Authentication (JWT + Refresh Tokens)
📧 Email verification
📝 Notes CRUD
🔍 Search (title + content)
🔗 Public shareable read-only note links
🔒 Private notes protected by JWT
🎨 Clean, responsive UI
⚛ React + Redux + Persist
🌐 Node.js + Express + MongoDB

🚀 Features
🔐 Authentication
Signup / Login
Email verification using Nodemailer
Encrypted passwords (bcrypt)
Access + Refresh token system
Logout and secure cookie handling
Auto-protection of private routes
📝 Notes
Create / Edit / Delete notes
Fetch notes for logged-in user
Server-side search by title or content
Public (read-only) notes using shareable links
Private notes fully protected via JWT
🧭 Routing
Protected routes using PrivateRoute
Auth-only routes using PublicRoute
Public read-only routes for shared notes

📂 Project Structure
project/
│
├── backend/
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── note.routes.js
│   ├── models/
│   │   ├── user.model.js
│   │   └── notes.model.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js (index.js)
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


⚙️ Backend Setup
1. Install dependencies
cd backend
npm install

2. Create .env file
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/notes_application

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

GMAIL_APP_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:5173

3. Start backend
npm run dev


⚛ Frontend Setup
1. Install dependencies
cd frontend
npm install

2. Create .env
VITE_API_URL=http://localhost:3000

3. Run frontend
npm run dev


🗄️ MongoDB Schema
User Schema
{
  name: String,
  email: String,
  password: String,
  verificationToken: String,
  isVerified: Boolean,
  resetPasswordToken: String,
  resetPasswordExpire: Date
}

Note Schema
{
  user: ObjectId,
  title: String,
  content: String,
  isPublic: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: Date
}


🔌 API Documentation

🔐 Auth Routes → /account/...
POST /account/signup
Signup + send verification email
GET /account/verify-email?token=...
Verify user email
POST /account/login
Login → returns access token + sets refresh token cookie
POST /account/logout
Clears refresh token cookie

📝 Notes Routes → /notes/...
POST /notes/add
Create a new note
🔒 Requires JWT
Body
{
  "title": "My Note",
  "content": "Something..."
}


GET /notes/show-all
Get all user notes
🔒 Requires JWT

GET /notes/show/:id
Get specific note of authenticated user
🔒 Requires JWT

PUT /notes/edit/:id
Edit user note
🔒 Requires JWT

DELETE /notes/delete/:id
Delete note
🔒 Requires JWT

GET /notes/search?q=keyword
Search user notes
🔒 Requires JWT

GET /notes/public/:id
Get a public read-only note
No login required
✔ Used for shareable links

🔗 Public Shareable Notes Architecture
How it works:
1️⃣ User creates a note
2️⃣ User marks it as isPublic: true (currently manual or by toggling)
3️⃣ App generates a link:
http://localhost:5173/note/<NOTE_ID>

4️⃣ Route /note/:id is fully public (no auth)
5️⃣ Backend checks:
Note.findOne({ _id, isPublic: true })

6️⃣ If yes → return note
7️⃣ If no → 404 Not Found

🔐 Authentication Flow
LOGIN
User submits email + password
Server verifies
Creates:
accessToken → returned in JSON
refreshToken → stored in HttpOnly cookie
PROTECTED ROUTES
Frontend sends:
Authorization: Bearer <accessToken>

REFRESH TOKEN FLOW
If access token expires:
Frontend calls /refresh-token
Backend verifies refresh token
Returns a new access token
(You have the backend ready for it; frontend can be added later)

🎨 Frontend Architecture
State Management
Redux Toolkit
Redux Persist
Auth slice: isAuthenticated, token, userDetails
Components
NoteCard
NoteModal
SearchBar
PublicNote
Navbar
Routes
/ → notes app (private)
/login, /signup → public auth pages
/note/:id → public read-only note

🧪 Testing Checklist
✔ Signup
✔ Email verification
✔ Login
✔ Create note
✔ Edit note
✔ Delete note
✔ Search notes
✔ Share link
✔ Open shared link while logged out
✔ Open shared link while logged in
✔ Edit only when authenticated
✔ Logout
✔ Token expiration behavior

📄 License
MIT — free to use.
