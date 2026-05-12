🎬 FILMERA — Decide What to Watch, Together

FILMERA is a React-based web application that helps users decide what movie to watch together in a fun and interactive way.

## Live Demo

🔗 https://filmera.us/

Instead of endlessly scrolling through streaming platforms, users can:

- Create or join a shared room
- Select preferences (genre, year, popularity)
- Swipe through movie suggestions
- Get a match when everyone likes the same movie

Think of it as Tinder for movie night 🍿

⸻

🚀 Features

🎮 Real-Time Room Experience

- Create a private room with a unique code
- Join a room via URL or code
- Multi-user interaction using BroadcastChannel

🎯 Smart Movie Selection

- Filter movies by:
  - Genre
  - Year
  - Popularity / Rating / Release date
- Fetch data dynamically from TMDB API

👉 Swipe Interaction

- Swipe right (Like) or left (Skip)
- Animated swipe cards
- Real-time match detection

🎉 Match System

- When all participants like the same movie:
  - Match screen is triggered
  - Movie details displayed (poster, title, overview)

📱 Responsive UI

- Fully responsive layout
- Mobile-friendly swipe experience

⸻

🛠️ Technologies Used
Frontend:

- React
- Vite
- React Router
- Context API
- CSS Modules / BEM

State & Logic

- React Hooks (useState, useEffect, useMemo, useRef)
- BroadcastChannel API (for real-time communication)

API Integration

- TMDB (The Movie Database) API
- Bearer Token Authentication

Styling

- CSS (BEM methodology)
- Custom design system (tokens, gradients, animations)

UI & Icons

- Lucide React (icons)

Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas

⸻

🔌 API

This project uses the TMDB API:

- Popular movies
- Discover movies (with filters)
- Genres
- Movie details

🧠 How It Works

1. User creates or joins a room
2. Host selects filters (genre, year, sort)
3. App fetches movies from TMDB API
4. Movies are displayed as swipe cards
5. Each user votes (like/dislike)
6. When all users like the same movie → 🎉 MATCH

⸻

🎯 Project Purpose

This project was built to:

- Practice full-stack architecture concepts (API-driven UI)
- Implement real-time multi-user interaction
- Work with external APIs (TMDB)
- Build a modern, responsive React application
- Simulate a real-world product experience

⸻

🔮 Future Improvements

- User authentication
- Persistent rooms across devices
- Watchlist / favorites
- Streaming platform links
- AI-based recommendations

⸻

👩‍💻 Author

Gisela Elia
Software Engineering Student | Full-Stack Developer

- GitHub: https://github.com/gisela-lucena
- LinkedIn: https://www.linkedin.com/in/giselaelia/
