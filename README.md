# LinkedIn Clone – Full Stack Application

<div align="center">

**A Modern Professional Networking Platform**

Built with **React**, **Node.js**, **Express**, and **MongoDB**

</div>

---

## 👨‍💻 Developer

**Prateek Dwivedi**  
Final Year Computer Science Engineering Student  
📍 Katni, India

## 📋 Project Overview

LinkedIn Clone is a feature-rich professional networking platform that allows users to create profiles, share posts, connect with other professionals, and engage through likes and comments. Built with modern technologies and best practices.

---

## 🎯 Features

- ✅ Secure registration and login with JWT authentication
- ✅ Password encryption with bcryptjs
- ✅ Create, read, update, delete posts
- ✅ Like/unlike and comment on posts
- ✅ Real-time feed with chronological sorting
- ✅ User profile management
- ✅ Connection/follow system
- ✅ Modern responsive UI with Tailwind CSS
- ✅ Protected API routes
- ✅ Error handling and validation

---

## 🛠 Tech Stack

**Frontend**: React 18, Vite, React Router v6, Axios, Tailwind CSS, Lucide React  
**Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs  
**Database**: MongoDB (Atlas available)

---

## 📁 Project Structure

```
linkedin-clone/
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Navbar, PostCard
│   │   ├── pages/          # Login, Register, Feed
│   │   ├── services/       # API layer
│   │   ├── context/        # Auth context
│   │   ├── hooks/          # useAuth custom hook
│   │   └── App.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                  # Backend (Express + Mongoose)
│   ├── config/             # Database config
│   ├── models/             # User, Post schemas
│   ├── controllers/        # Auth, Post, User logic
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth, Error handling
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

---

## 🔐 Environment Variables

**Backend (.env)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/linkedin-clone
JWT_SECRET=your_secure_key_here_min_32_chars
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📚 API Routes

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login user |
| GET | /api/posts | No | Get all posts |
| POST | /api/posts | Yes | Create post |
| PUT | /api/posts/:id | Yes | Update post |
| DELETE | /api/posts/:id | Yes | Delete post |
| POST | /api/posts/:id/like | Yes | Like/unlike post |
| POST | /api/posts/:id/comment | Yes | Add comment |
| GET | /api/users/me | Yes | Get current user |
| GET | /api/users/:id | No | Get user profile |
| PUT | /api/users/me | Yes | Update profile |
| POST | /api/users/:userId/connect | Yes | Connect with user |

---

## 🎨 UI Highlights

- **Navbar**: Profile dropdown with logout
- **Feed**: Post creation and feed with real-time updates
- **Auth Pages**: Clean login/register with form validation
- **Post Cards**: Like, comment, and timestamp display
- **Responsive**: Mobile-friendly design

---

## 🚢 Deployment

**Backend** - Deploy on Render.com, Railway, or Heroku  
**Frontend** - Deploy on Vercel, Netlify, or Render

Update environment variables on deployment platform.

---

## 🔄 Future Improvements

- Real-time notifications (WebSockets)
- Messaging system
- Job postings
- Dark mode
- Advanced search
- User recommendations
- Mobile app

---

## 📝 Contributing

Contributions welcome! Feel free to fork and submit pull requests.

---

## 📄 License

MIT License - Open source and free to use.

---

## 📞 Contact

**Email**: pdwivedi0120@gmail.com  
**GitHub**: [@prateekdz](https://github.com/prateekdz)  
**Location**: Raipur, India

---

**Made with ❤️ by Prateek Dwivedi**
