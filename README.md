# Care Pro

A full-stack healthcare management platform built with TypeScript, React, and REST APIs. Designed with a strong focus on clean UX and end-to-end type safety.

---

## Features

- **Patient Records** — create, update, and manage patient profiles and medical history
- **Appointment Scheduling** — calendar-based booking system with conflict detection
- **Provider Dashboards** — role-based views for doctors, nurses, and admin staff
- **Type-Safe Architecture** — TypeScript throughout frontend and backend
- **Responsive Design** — fully functional on desktop and mobile

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, CSS Modules |
| State Management | React Context / Hooks |
| Backend | Node.js, REST APIs |
| Database | PostgreSQL / MySQL |
| Auth | JWT-based authentication |
| Tooling | ESLint, Prettier, Vite |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL / MySQL instance

### Installation

```bash
git clone https://github.com/punithAJ-hub/Care_Pro.git
cd Care_Pro
npm install
```

### Environment Setup

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Run

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
```

---

## Project Structure

```
Care_Pro/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Route-level page components
│   ├── services/         # API service layer
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Helper functions
├── server/
│   ├── routes/           # Express route handlers
│   ├── models/           # Database models
│   └── middleware/       # Auth & error middleware
└── package.json
```

---

## Author

**Punith Jayaramu**  
[LinkedIn](https://www.linkedin.com/in/punith-agraharavalagehalli-jayaramu-b3289339a/) · [Portfolio](https://punith-portfolio-ten.vercel.app)
