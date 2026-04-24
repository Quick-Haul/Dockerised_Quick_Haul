# Issues Log (Setup & Runtime)

This file documents all issues faced during setup, their root causes, and the resolved fix.

## 1) `ModuleNotFoundError: No module named 'app'` while running `python main.py`
- **Where it happened:** inside `backend/app`
- **Cause:** `app/main.py` imports with absolute package paths (`from app...`). Running the script from inside `app` makes Python treat that folder as the top-level, so package `app` is no longer resolvable.
- **Fix:** run backend from `backend` root using either:
  - `uvicorn main:app --reload`
  - `python main.py` (new runner added in `backend/main.py`)

## 2) `ModuleNotFoundError: No module named 'src'` while running `uvicorn src.main:app`
- **Where it happened:** inside `backend/app` during an intermediate refactor.
- **Cause:** command targeted an entrypoint that was later removed in final structure.
- **Fix (final structure):**
  - `cd backend`
  - `uvicorn main:app --reload`

## 3) `ModuleNotFoundError: No module named 'app'` while running `uvicorn app.main:app --reload` from `backend/app`
- **Cause:** same import-root issue. When working directory is `backend/app`, `app` package cannot be resolved as a top-level package.
- **Fix:** run from `backend`, not `backend/app`.

## 4) `.env` file missing (`File not found`)
- **Cause:** only `.env.example` existed; runtime config loader expects `.env` for local secrets.
- **Fix:** created `backend/.env` and kept `backend/.env.example` as template only.

## 5) SMTP credentials were placed in `.env.example` (security risk)
- **Cause:** real app-password and email were put in sample template.
- **Fix:** sanitized `.env.example` placeholders and added root `.gitignore` to ignore `backend/.env`.
- **Action recommended:** revoke and regenerate Gmail app password if previously exposed.

## 6) Inconsistent backend start commands during refactor (`app` vs `src`)
- **Cause:** backend was refactored to include `src` entrypoint, but commands were run from varying directories.
- **Fix:** standardized start options:
  - Preferred: `cd backend && uvicorn main:app --reload`
  - Simplest: `cd backend && python main.py`

## 7) `redis.exceptions.ConnectionError ... connecting to localhost:6379`
- **Where it happened:** on backend startup (FastAPI lifespan)
- **Cause:** Redis server is not running or not reachable at `REDIS_URL` (default `redis://localhost:6379/0`).
- **Fix:**
  - Start Redis locally so it listens on port `6379`, then restart backend.
  - Or update `REDIS_URL` in `backend/.env` to the correct host/port if Redis is running elsewhere.
