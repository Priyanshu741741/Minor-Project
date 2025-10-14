# Quick Start Guide - Dashboard

## 🚀 Getting Started

### 1. Start the Backend Server
```powershell
cd "d:\Side Hustle\Minot\backend"
npm start
```
Backend will run on `http://localhost:4000`

### 2. Start the Frontend Server
```powershell
cd "d:\Side Hustle\Minot\frontend"
npm run dev
```
Frontend will run on `http://localhost:5173`

### 3. Login
- Navigate to `http://localhost:5173/login`
- Use your existing credentials (patient or doctor)
- You'll be automatically redirected to the dashboard

---

## 📱 Dashboard Features Tour

### For Patients:
1. **Next Appointment Card** - See your upcoming appointment at a glance
2. **Calendar View** - All your appointments in a visual calendar
3. **Book Button** - Quickly schedule new appointments
4. **Quick Links** - Navigate to appointments, profile, etc.

### For Doctors:
1. **Today's Schedule** - See how many appointments you have today
2. **Total Patients** - Track your patient count
3. **Calendar View** - See all scheduled appointments
4. **Patient Details** - Click any appointment to see patient info

---

## 🎨 UI Elements

### Calendar Navigation
- **Today Button**: Jump to current week
- **← →**: Navigate between weeks
- **Day/Week/Month**: Switch views (Week view is fully functional)

### Sidebar
- **Mini Calendar**: Quick date navigation
- **My Calendars**: Legend showing color codes
- **Quick Links**: Fast navigation to all pages
- **Logout**: Sign out securely

### Appointment Blocks
- **Blue**: Scheduled appointments
- **Green**: Completed appointments
- **Red**: Cancelled appointments
- **Click**: View full details

---

## 💡 Tips

1. **Mobile Users**: Use the hamburger menu (☰) to access the sidebar
2. **Week View**: See your entire week at a glance (8 AM - 5 PM)
3. **Click Appointments**: Click any appointment block for full details
4. **Book Fast**: Use the big blue "Book Appointment" button
5. **Navigate Easy**: Use quick links in sidebar for fast page switching

---

## 🎯 Common Actions

### Book a New Appointment
1. Click "Book Appointment" button (sidebar or top)
2. Fill in appointment details
3. Submit
4. Return to dashboard to see it on calendar

### View Appointment Details
1. Click any colored appointment block
2. Modal opens with full details
3. Click "View Details" to go to appointments page
4. Or click "Close" to return to calendar

### Navigate Weeks
1. Click ← to go to previous week
2. Click → to go to next week
3. Click "Today" to return to current week

---

## 🐛 Troubleshooting

### Dashboard Not Loading?
- Check if backend is running on port 4000
- Check if you're logged in (token exists)
- Open browser console for error messages

### No Appointments Showing?
- Make sure you have appointments in the database
- Check if appointments are within the current week view
- Try navigating to different weeks

### Sidebar Not Visible on Mobile?
- Click the hamburger menu (☰) in top-left
- Click outside sidebar to close it

---

## 📊 Data Requirements

The dashboard expects appointments with:
- `id`: Unique identifier
- `appointmentDate`: ISO date string
- `status`: SCHEDULED, COMPLETED, or CANCELLED
- `reason`: Text description
- `patient`: { name: string } (for doctors)
- `doctor`: { name: string } (for patients)
- `notes`: Optional additional info

---

## 🔐 Authentication

- Dashboard requires user to be logged in
- Redirects to `/login` if not authenticated
- Stores user info and token in localStorage
- Shows different views for DOCTOR vs PATIENT roles

---

## 🎉 That's It!

Your dashboard is now ready to use. Enjoy the beautiful calendar view and easy appointment management!

**Questions?** Check the main implementation docs:
- `DASHBOARD_IMPLEMENTATION_COMPLETE.md`
- `DASHBOARD_UI_GUIDE.md`
