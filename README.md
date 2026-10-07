# Mohammed Quiz

A quiz web application built with Node.js, Express, and PostgreSQL. Currently, the project ships a polished static landing page; the interactive quiz flow is planned but not yet implemented.

## Tech Stack

- **Runtime:** Node.js (>= 24)
- **Server:** Express 5
- **Database:** PostgreSQL (via the `pg` client)

## Project Structure

```
.
├── server.js          # Express server: serves static files + /api/health
├── src/
│   └── database.js    # PostgreSQL connection pool (uses DATABASE_URL)
├── public/
│   ├── index.html     # Landing page markup
│   ├── styles.css     # Styles / theme
│   ├── app.js         # Frontend JS (placeholder for future quiz logic)
│   └── favicon.svg
└── package.json
```

## Getting Started

### Prerequisites

- Node.js >= 24
- A PostgreSQL database (optional; only needed for the health check)

### Install & Run

```bash
npm install
npm start
```

The app listens on port `5000` by default (override with the `PORT` environment variable):

```bash
http://localhost:5000
```

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Port the server listens on | `5000` |
| `DATABASE_URL` | PostgreSQL connection string | none |

## API

| Endpoint | Description |
|---|---|
| `GET /api/health` | Returns `{ status: "ok", database: "connected" }` if the database responds, otherwise a 503 |

## Roadmap

- [ ] Interactive quiz flow (questions, answers, scoring)
- [ ] Question data / database schema
- [ ] Result summaries and stats

## License

All rights reserved.
