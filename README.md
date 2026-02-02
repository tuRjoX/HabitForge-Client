# HabitForge - Daily Habit Tracker 🎯

Build lasting habits, track your progress, and achieve your goals with HabitForge - your ultimate companion for personal development.

## 🌐 Live Site URL

**[HabitForge](https://habitforge-tracker.web.app)**

---

## ✨ Key Features

- **🔥 Streak Tracking**: Build and maintain daily streaks to stay motivated. Watch your consistency grow as you complete habits day after day. Earn badges for reaching streak milestones (7, 14, 30, 50, 100 days).

- **📊 Progress Analytics**: Visualize your habit completion with detailed progress bars showing your 30-day completion rate. Track total completions and see your improvement over time.

- **🎨 Beautiful, Responsive UI**: Modern, clean interface with dark/light mode support. Fully responsive design that works seamlessly on desktop, tablet, and mobile devices.

- **🔐 Secure Authentication**: Firebase-powered authentication with email/password and Google sign-in options. Password validation ensures account security.

- **🌍 Public Habit Discovery**: Browse public habits from the community, get inspired by others, and share your own habits to motivate fellow users.

- **⚡ Real-time Updates**: Instant UI updates when marking habits complete. See your streaks and progress update immediately without page refresh.

- **🎬 Smooth Animations**: Engaging Framer Motion animations throughout the app, including celebration confetti when completing habits.

- **🔍 Smart Search & Filter**: Easily find habits with category-based filtering (Morning, Work, Fitness, Evening, Study) and keyword search functionality.

- **📱 PWA Ready**: Installable as a Progressive Web App for a native-like experience on any device.

---

## 🛠️ Technologies Used

### Frontend

- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- React Router DOM for routing
- Firebase Authentication
- Axios for API calls
- Swiper for carousels
- React Hot Toast & SweetAlert2 for notifications
- Lottie React for animated icons
- React Tooltip for hover info
- React Simple Typewriter for text effects
- Recharts for data visualization
- React Helmet Async for SEO

### Backend

- Node.js with Express
- MongoDB with MongoDB Atlas
- CORS for cross-origin requests
- dotenv for environment variables

---

## 📦 Installation

### Client Setup

```bash
cd client
npm install
# Create .env file with Firebase config
npm run dev
```

### Server Setup

```bash
cd server
npm install
# Create .env file with MongoDB URI
npm run dev
```

---

## 🔑 Environment Variables

### Client (.env)

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=https://habit-forge-server.vercel.app
VITE_IMGBB_API_KEY=your_imgbb_key
```

### Server (.env)

```
MONGODB_URI=your_mongodb_uri
PORT=5000
```

---

## 📄 License

This project is licensed under the MIT License.

---
