# Secure Auth System

A full-stack authentication system built using:

- **Frontend**: React + Tailwind CSS + Axios + React Router
- **Backend**: Node.js + Express + Sequelize + PostgreSQL
- **Auth**: JWT (Access & Refresh Tokens)


## Features

- User Signup and Login
- JWT-based access and refresh token system
- Protected API routes
- Auto token refresh with Axios interceptors
- Show/hide password toggle
- Logout functionality

## Folder Structure

project-root/

    backend/
        models/
        mogrations/
        controllers/
        middleware/
        routes/

    frontend/
        src/
            apis/
            components/
            pages/
            app.jsx
        tailwind.config.js  

### Getting Started

- ## Backend
cd backend
npm install
# Set up your .env file (DB credentials, JWT_SECRET, etc.)
npm start

- ## Frontend
cd frontend
npm install
npm run dev

### Tech Stack
React
Tailwind CSS
Axios
Node.js
Express
Sequelize ORM
PostgreSQL
JSON Web Tokens (JWT)

