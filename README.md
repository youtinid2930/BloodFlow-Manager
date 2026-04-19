# BloodFlow Manager

A backend REST API for hospital blood stock management, built with NestJS and MongoDB Atlas. Handles user authentication, donor management, blood unit inventory, and automated low-stock notifications.


---

## Tech Stack

- **Framework:** NestJS (TypeScript)
- **Database:** MongoDB Atlas
- **Auth:** JWT + Refresh Tokens + Google OAuth2
- **Testing:** Jest (unit + e2e)
- **Other:** Nodemailer (email notifications), Docker-ready

---

## Modules

| Module | Responsibility | Author |
|---|---|---|
| `auth` | Login, JWT, refresh tokens, Google OAuth2, logout | youtinid2930 |
| `users` | User creation, schema, role assignment | youtinid2930 |
| `roles` | Role enum (admin, manager), RBAC guards & decorators | youtinid2930 |
| `donors` | Donor registration and profiles | MohamedAgdid |
| `donations` | Donation records and history | MohamedAgdid |
| `blood_stock` | Blood unit inventory, expiry, low-stock alerts | MohamedAgdid |
| `blood-requests` | Blood request workflow | MohamedAgdid |
| `historique` | Action history tracking | MohamedAgdid |
| `mail` | Email notification service | MohamedAgdid |

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/auth/login` | Login with email/password (LocalAuthGuard) |
| GET | `/auth/profile` | Get current user profile (JWT + Admin role required) |
| GET | `/auth/verify/:token` | Verify JWT token validity |
| GET | `/auth/google/login` | Initiate Google OAuth2 login |
| GET | `/auth/google/redirect` | Google OAuth2 callback |
| POST | `/auth/refresh` | Refresh access token using refresh token |
| POST | `/auth/logout` | Logout and invalidate refresh token |
| POST | `/blood-stock` | Add blood unit |
| GET | `/blood-stock/all` | Get all blood units |
| GET | `/blood-stock/find/low-stock` | Find low stock items |
| GET | `/blood-stock/stock/expired` | Find expired units |
| GET | `/blood-stock/stocks/near-expiry` | Units expiring soon |
| GET | `/blood-stock/notify/low-stock` | Send low-stock email alert |
| GET | `/blood-stock/stock/notifyDonors/:blood_type` | Notify donors to donate a specific blood type |
| GET | `/blood-stock/stock/sommeby-blood` | Stock summary grouped by blood type |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- npm

### Install

```bash
git clone https://github.com/youtinid2930/BloodFlow-Manager.git
cd BloodFlow-Manager
npm install
```

### Environment Variables

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_app_password
```

### Run

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

### Tests

```bash
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:cov      # Coverage report
```

---

## Project Structure

```
src/
├── auth/
│   ├── config/         # JWT and OAuth config
│   ├── dto/            # Login DTO
│   ├── entities/       # RefreshToken entity
│   ├── guards/         # JwtAuthGuard, GoogleAuthGuard, RefreshAuthGuard, LocalAuthGuard
│   ├── strategies/     # Passport strategies (JWT, Google, Local)
│   ├── types/          # Auth types
│   ├── utils/          # Auth utilities
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/              # User schema, service, controller
├── roles/              # Role enum, RBAC decorator & guard
├── blood_stock/        # Blood inventory management
├── blood-requests/     # Request workflow
├── donors/             # Donor profiles
├── donations/          # Donation records
├── historique/         # Action history
├── mail/               # Email service
└── interfaces/         # Shared interfaces (AuthenticatedRequest, etc.)
```

---

## Contributors

- **[youtinid2930](https://github.com/youtinid2930)** — Auth, Users, Roles modules
- **[MohamedAgdid](https://github.com/MohamedAgdid)** — Blood stock, Donors, Donations, Mail modules
- **[ABDELHALIMV2](https://github.com/ABDELHALIMV2)** —  Historique module
