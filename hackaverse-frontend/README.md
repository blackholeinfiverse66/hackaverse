# HackaVerse - AI-Powered Hackathon Platform

A modern, role-based hackathon platform with authentication and responsive design.

## 🚀 Features

- **Role-Based Authentication** - Admin and Participant roles with protected routes
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Modern UI** - Glass morphism design with smooth animations
- **Real-time Features** - Live leaderboards, notifications, and updates

## 🏗️ Project Structure

```
src/
├── components/
│   ├── admin/           # Admin-specific components
│   ├── auth/            # Authentication components
│   ├── layout/          # Layout wrappers
│   ├── navigation/      # Navigation components
│   ├── pages/           # Main application pages
│   ├── participant/     # Participant-specific components
│   └── ui/              # Reusable UI components
├── contexts/            # React contexts
└── App.jsx             # Main application component
```

## 🔐 Demo Credentials

- **Admin**: `admin@hackaverse.com` / `password123`
- **Participant**: `participant@hackaverse.com` / `password123`

## 🛠️ Development

```bash
npm install
npm run dev
```

## 📱 Routes

- `/` - Public main page with auth modal
- `/admin` - Admin dashboard (protected)
- `/app` - Participant home (protected)

Built with React, Vite, and Tailwind CSS.