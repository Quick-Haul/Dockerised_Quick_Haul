<<<<<<< HEAD
# Transport Booking & Logistics - Phase 1

## Architecture (modular, microservice-ready)
- **Frontend (`frontend/`)**: React + Axios client for auth, booking creation, and history views.
- **Backend (`backend/`)**: FastAPI async monolith organized by layers (`routes`, `services`, `models`, `schemas`, `db`, `utils`) so each bounded context can later become an independent microservice.
- **MongoDB**: Source of truth for users, bookings, drivers, and pricing rules.
- **Redis**: Caches pricing calculations (`price:*` keys with TTL) and can be extended for queue-based background workers.
- **JWT Auth**: Stateless bearer token auth for all protected business APIs.
- **SMTP Notifications**: Async email notifications for booking creation and status changes (configurable via env).

## Project Structure
```text
transport/
├── backend/
│   ├── main.py
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── db/
│   │   │   ├── mongodb.py
│   │   │   └── redis_client.py
│   │   ├── models/
│   │   │   └── enums.py
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── booking.py
│   │   │   ├── drivers.py
│   │   │   └── pricing.py
│   │   ├── schemas/
│   │   │   ├── auth.py
│   │   │   ├── booking.py
│   │   │   ├── driver.py
│   │   │   └── pricing.py
│   │   ├── services/
│   │   │   ├── auth_service.py
│   │   │   ├── booking_service.py
│   │   │   ├── driver_service.py
│   │   │   ├── notification_service.py
│   │   │   └── pricing_service.py
│   │   ├── utils/
│   │   │   ├── deps.py
│   │   │   ├── mappers.py
│   │   │   └── seed_data.py
│   │   └── main.py
│   ├── docs/
│   │   └── sample_documents.md
│   ├── .env.example
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/client.js
│   │   ├── components/NavBar.jsx
│   │   ├── context/AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── BookingPage.jsx
│   │   │   ├── HistoryPage.jsx
│   │   │   └── LoginRegisterPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Backend APIs
### Auth
- `POST /auth/register`
- `POST /auth/login`

### Booking
- `POST /booking`
- `GET /booking/{id}`
- `GET /booking/user/{user_id}`
- `PATCH /booking/{id}/status?status=IN_TRANSIT|COMPLETED` (status progression support)

### Drivers
- `GET /drivers`
- `POST /drivers`

### Pricing
- `GET /pricing/calculate?distance_km=10&weight_kg=20&transport_type=van`

> All non-auth routes require `Authorization: Bearer <JWT_TOKEN>`.
> Booking emails are sent when SMTP is enabled.

## Example API Requests (curl)
```bash
# Register
curl -X POST http://127.0.0.1:8000/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"secret123\"}"

# Login
curl -X POST http://127.0.0.1:8000/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"secret123\"}"

# Create driver
curl -X POST http://127.0.0.1:8000/drivers \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Ravi\",\"phone\":\"9999988888\",\"vehicle_type\":\"van\"}"

# Calculate pricing
curl "http://127.0.0.1:8000/pricing/calculate?distance_km=25&weight_kg=120&transport_type=van" \
  -H "Authorization: Bearer <TOKEN>"

# Create booking
curl -X POST http://127.0.0.1:8000/booking \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d "{\"from_location\":\"Delhi\",\"to_location\":\"Noida\",\"transport_type\":\"van\",\"goods_type\":\"furniture\",\"distance_km\":25,\"weight_kg\":120}"

# Get user booking history
curl http://127.0.0.1:8000/booking/user/<USER_ID> \
  -H "Authorization: Bearer <TOKEN>"
```

## Run Locally (No Docker)
### 1) Start MongoDB and Redis
- Ensure MongoDB is running at `mongodb://localhost:27017`
- Ensure Redis is running at `redis://localhost:6379`

### 2) Run backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn main:app --reload
```

Alternative (same result):
```bash
cd backend
python main.py
```

Backend available at `http://127.0.0.1:8000`, docs at `http://127.0.0.1:8000/docs`.
To enable emails, update SMTP variables in `backend/.env` and set `SMTP_ENABLED=true`.

### 3) Run frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend available at `http://127.0.0.1:5173`.

## Troubleshooting
- If you see `No module named 'app'`, you are likely running from `backend/app` by mistake.
- Always start backend from `backend/`.
- If you see Redis connection errors, ensure Redis is running on `localhost:6379` (or update `REDIS_URL` in `backend/.env`).
- Full issue history and fixes: `docs/issues-log.md`.
=======
# Dokerised_Quick_Haul
Quick Haul project under dockers
>>>>>>> f3ed34fba7f49e0e878fc29b13acb247de3e1cf5
