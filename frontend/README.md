# Dispensary App - Frontend

A modern healthcare management system built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui components.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Features

- 🎨 Modern, responsive UI with Tailwind CSS
- 🧩 Reusable shadcn/ui components
- 📱 Mobile-friendly design
- 🔒 Authentication ready (JWT-based)
- 🏥 Healthcare-focused interface

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend Integration

The frontend is designed to work with the backend API running on `http://localhost:3000`.

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

#### User & Profile
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `GET /api/profiles/doctors` - List all doctors
- `GET /api/profiles/doctors/:doctorId` - Get doctor by ID

#### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments` - Get user appointments

#### Visits
- `POST /api/visits` - Create visit record (Doctor only)
- `GET /api/visits` - Get visit history

### Authentication Header

All protected endpoints require JWT token:
```
Authorization: Bearer <YOUR_JWT_TOKEN>
```

## Future Pages to Implement

1. **Authentication Pages**: `/login`, `/register`
2. **Dashboard Pages**: `/dashboard/patient`, `/dashboard/doctor`
3. **Profile Pages**: `/profile`, `/doctors`, `/doctors/[id]`
4. **Appointment Pages**: `/appointments`, `/appointments/new`
5. **Visit Pages**: `/visits`, `/visits/[id]`
6. **Feedback Pages**: `/feedback/[visitId]`


You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
