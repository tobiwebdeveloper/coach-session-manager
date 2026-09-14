# Coach Session Manager

A full-stack football academy session management application.

## Users

### Coach
- Create sessions
- Edit sessions
- Delete sessions
- View bookings
- Mark attendance

### Player
- View available sessions
- Book sessions
- Cancel bookings
- View their bookings

## Core Rules

- A session cannot exceed its capacity.
- A player cannot book the same session twice.
- A player cannot book a full session.
- A player can only cancel their own booking.
- A coach can only modify sessions they own.
- Invalid data must be rejected by the backend.

## Stack

### Frontend
- Vue 3
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Node.js
- Fastify
- TypeScript

### Database
- PostgreSQL
- Neon

### API
- REST-style HTTP API