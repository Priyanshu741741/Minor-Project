# Dispensary App - Quick Setup Guide

## ✅ Completed Tasks

1. ✅ **Deleted old frontend** - Removed Vite-based React frontend
2. ✅ **Created Next.js 15 project** with TypeScript and Tailwind CSS
3. ✅ **Installed shadcn/ui** - Component library initialized
4. ✅ **Added Navigation Menu component** - Full navigation with "use client" directive
5. ✅ **Created Hero Section** - Recreated the design from the provided image
6. ✅ **Installed dependencies**:
   - lucide-react (icons)
   - axios (HTTP client)
   - shadcn/ui components (navigation-menu, button)
7. ✅ **Created API utilities** (`src/lib/api.ts`) - Ready for backend integration
8. ✅ **Added TypeScript types** (`src/types/index.ts`) - Complete type definitions
9. ✅ **Environment variables** - `.env.local` configured

## 🚀 Development Server

The development server is running at: **http://localhost:3000**

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page (Navbar + Hero)
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── navigation-menu.tsx
│   │   │   └── button.tsx
│   │   ├── Navbar.tsx          # "use client" Navigation
│   │   └── HeroSection.tsx     # Hero section component
│   ├── lib/
│   │   ├── utils.ts            # Utility functions
│   │   └── api.ts              # API client & endpoints
│   └── types/
│       └── index.ts            # TypeScript definitions
├── .env.local                  # Environment variables
└── package.json
```

## 🎨 Components Created

### 1. Navbar Component
- ✅ "use client" directive added
- ✅ Full navigation menu with dropdowns
- ✅ Logo and "Get started" button
- ✅ Responsive design
- ✅ Multiple menu variations (Home, Components, List, Simple, With Icon)

### 2. Hero Section
- ✅ Recreated from provided image
- ✅ Left column: Badge, heading, CTA button, illustration
- ✅ Right column: "Book your offline seat" card with chart
- ✅ "Sign up for a session" card with mentor avatars
- ✅ Gradient backgrounds and modern styling

## 🔌 Backend Integration Setup

### API Client (`src/lib/api.ts`)
All API endpoints are ready to use:

```typescript
import { authAPI, userAPI, appointmentAPI } from '@/lib/api';

// Login example
const response = await authAPI.login({ 
  email: 'user@example.com', 
  password: 'password' 
});

// Create appointment
const appointment = await appointmentAPI.create({
  doctor_id: 'uuid',
  appointment_time: '2025-10-28T14:30:00.000Z',
  reason: 'Check-up'
});
```

### Available API Functions

#### Authentication
- `authAPI.register(data)`
- `authAPI.login(data)`

#### User
- `userAPI.getMe()`
- `userAPI.updateMe(data)`

#### Profile
- `profileAPI.getDoctors()`
- `profileAPI.getDoctorById(doctorId)`
- `profileAPI.getMyPatientProfile()`

#### Appointments
- `appointmentAPI.create(data)`
- `appointmentAPI.getMyAppointments()`

#### Visits
- `visitAPI.create(data)`
- `visitAPI.getMyVisits()`

#### Remarks
- `remarkAPI.create(data)`
- `remarkAPI.getByVisitId(visitId)`

#### Feedback
- `feedbackAPI.create(data)`
- `feedbackAPI.getByVisitId(visitId)`

#### NLP Results
- `nlpResultAPI.getById(resultId)`

## 📋 Next Steps - Pages to Create

### 1. Authentication Pages
```bash
# Create these files:
src/app/login/page.tsx
src/app/register/page.tsx
src/app/register/patient/page.tsx
src/app/register/doctor/page.tsx
```

### 2. Dashboard Pages
```bash
src/app/dashboard/page.tsx
src/app/dashboard/patient/page.tsx
src/app/dashboard/doctor/page.tsx
```

### 3. Profile Pages
```bash
src/app/profile/page.tsx
src/app/profile/edit/page.tsx
src/app/doctors/page.tsx
src/app/doctors/[id]/page.tsx
```

### 4. Appointment Pages
```bash
src/app/appointments/page.tsx
src/app/appointments/new/page.tsx
src/app/appointments/[id]/page.tsx
```

### 5. Visit Pages
```bash
src/app/visits/page.tsx
src/app/visits/[id]/page.tsx
src/app/visits/new/page.tsx
```

### 6. Feedback Pages
```bash
src/app/feedback/[visitId]/page.tsx
```

### 7. Remarks Pages
```bash
src/app/remarks/[visitId]/page.tsx
```

## 🎨 Adding More shadcn/ui Components

When you need more components:

```bash
# Forms
npx shadcn@latest add form input label select textarea

# Dialogs & Modals
npx shadcn@latest add dialog alert-dialog

# Data Display
npx shadcn@latest add table card badge avatar

# Feedback
npx shadcn@latest add toast alert

# Navigation
npx shadcn@latest add tabs dropdown-menu

# Date & Time
npx shadcn@latest add calendar popover
```

## 🔒 Authentication Flow

1. User logs in via `/login`
2. JWT token stored in localStorage
3. `api.ts` automatically adds token to all requests
4. If 401 error, redirect to login

## 🧪 Testing the Current Setup

1. Open http://localhost:3000
2. You should see:
   - Navigation bar with "Fiscal" logo
   - Working navigation menus
   - Hero section with:
     - "Take control of your finances online" heading
     - "Get started" button
     - Calculator/device illustration
     - Orange "Book your offline seat" card with chart
     - Black "Sign up for a session" card with mentors

## 🎯 Backend API Base URL

Current: `http://localhost:3000` (same port as Next.js dev server!)

**Important**: You'll need to either:
1. Run backend on a different port (e.g., 4000)
2. Or update `NEXT_PUBLIC_API_URL` in `.env.local`

Recommended backend port: **4000**

Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 📝 Notes

- All components use TypeScript
- shadcn/ui components are fully customizable
- Tailwind CSS v4 is configured
- The project uses the Next.js App Router (not Pages Router)
- All API calls are centralized in `src/lib/api.ts`
- Types are available in `src/types/index.ts`

## 🐛 Troubleshooting

### Port conflict
If port 3000 is in use:
```bash
npm run dev -- -p 3001
```

### Missing dependencies
```bash
npm install
```

### Clear cache
```bash
rm -rf .next
npm run dev
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Lucide Icons](https://lucide.dev)

---

**Status**: ✅ Frontend setup complete! Ready for page development.
