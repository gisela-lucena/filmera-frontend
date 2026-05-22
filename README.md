🎬 FILMERA — Decide What to Watch, Together

FILMERA is a React-based web application that helps users decide what movie to watch together in a fun and interactive way.

## Live Demo

🔗 https://filmera.us/

## Backend API

🔗 https://filmera-backend.onrender.com

Instead of endlessly scrolling through streaming platforms, users can:

- Create or join a shared room
- Select preferences (genre, year, popularity)
- Swipe through movie suggestions
- Get a match when everyone likes the same movie

Think of it as Tinder for movie night 🍿

🚀 Features

🔐 Authentication & Authorization

Secure authentication system built with JWT-based authorization.

Features

* User registration
* User login
* Persistent login sessions
* JWT authentication
* Protected routes
* Automatic token validation
* Auth state persistence with localStorage
* Redirect unauthorized users to login
* Redirect back to intended room after login
* Conditional navigation based on auth state
* Dynamic navbar login/logout states
* Form validation with disabled submit buttons

Authentication Flow

* Unauthorized users trying to access protected rooms are redirected to the homepage
* Login modal automatically opens
* After successful login, users are redirected back to the requested room

⸻

🎮 Shared Room Experience

Users can create private movie rooms and invite friends through room links or room codes.

Features

* Create private rooms
* Join rooms via URL or room code
* Persistent room sessions
* Automatic participant synchronization
* Shared movie state between participants
* Real-time-like room updates using polling
* Room participant counter

⸻

🎯 Smart Movie Selection

Users can customize movie discovery before starting the swipe session.

Filters

* Genre
* Release year
* Popularity
* Rating
* Release date sorting

Features

* Dynamic movie fetching
* Filter-based movie discovery
* Shared room movie lists
* TMDB API integration through backend

⸻

👉 Swipe Interaction

Interactive movie swipe experience inspired by dating apps.

Features

* Swipe right (Like)
* Swipe left (Skip)
* Animated swipe cards
* Movie overview display
* Movie posters and metadata
* Smooth card transitions
* Match synchronization between participants

⸻

🎉 Match System

When all participants like the same movie, a match is triggered automatically.

Features

* Shared movie matching logic
* Match synchronization between users
* Match screen with movie details
* Continue swiping after a match
* Match persistence handling
* Shared room match updates

⸻

📱 Responsive UI

FILMERA is fully responsive and optimized for desktop and mobile devices.

Features

* Mobile-friendly layout
* Responsive swipe cards
* Adaptive navigation
* Responsive room experience
* Smooth animations and transitions

⸻

🛠️ Technologies Used

Frontend

* React
* Vite
* React Router
* Context API
* React Query

State & Logic

* React Hooks
    * useState
    * useEffect
    * useMemo
    * useRef
* ProtectedRoute HOC
* Polling synchronization
* Persistent auth state

Authentication & Security

* JWT Authentication
* Bearer Token Authorization
* Protected Routes
* localStorage session persistence

API Integration

* TMDB (The Movie Database) API
* Custom Express Backend API

Styling

* CSS
* BEM Methodology
* Custom design system
* CSS animations
* Gradients and visual effects

UI & Icons

* Lucide React

Backend & Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas

⸻

🔌 API

This project integrates with the TMDB API through a secure backend layer.

Features

* Popular movies
* Discover movies
* Genre filtering
* Year filtering
* Movie metadata retrieval
* Secure token handling

⸻

🧠 How It Works

1. User logs into the platform
2. User creates or joins a room
3. Host selects movie filters
4. Backend fetches movies from TMDB
5. Movies appear as swipe cards
6. Users vote like/dislike
7. When all participants like the same movie → 🎉 MATCH

⸻

🔒 Protected Routes

Protected routes prevent unauthorized access to private movie rooms.

Behavior

* Unauthorized access redirects users to login
* Login modal opens automatically
* After login, users return to the intended room
* Auth state persists after page refresh

⸻

🎯 Project Purpose

This project was built to:

* Practice full-stack architecture concepts
* Implement authentication and authorization flows
* Build protected frontend routes
* Work with external APIs (TMDB)
* Create real-time multi-user interactions
* Build a modern responsive React application
* Simulate a production-like collaborative platform

⸻

🔮 Future Improvements

* Real-time synchronization with Socket.IO
* Live room updates
* Watchlist / favorites
* Streaming platform links
* AI-based movie recommendations
* Match history
* Group rooms with more participants
* Push notifications

⸻

👩‍💻 Author

Gisela Lucena

Software Engineering Student | Full-Stack Developer

* GitHub: https://github.com/gisela-lucena
* LinkedIn: https://www.linkedin.com/in/giselaelia/
