# Dispensary App - Getting Started

## 🚀 Quick Start Guide

### Problem: "Failed to load appointments"
This error appears because **you need to login first** before accessing protected pages like Appointments, Visits, or Profile.

### Step-by-Step Instructions:

#### 1️⃣ **Register an Account** (First Time Users)

**For Patients:**
1. Go to http://localhost:5173/register/patient
2. Fill in the form:
   - Full Name
   - Email
   - Password
   - Phone Number
   - Date of Birth
   - Gender
   - Address
3. Click "Register"

**For Doctors:**
1. Go to http://localhost:5173/register/doctor
2. Fill in the form:
   - Full Name
   - Email
   - Password
   - Specialization
   - License Number
   - Phone Number
   - Bio (optional)
3. Click "Register"

#### 2️⃣ **Login**
1. After registration, you'll be redirected to the login page
2. Or go to http://localhost:5173/login
3. Enter your email and password
4. Click "Login"

#### 3️⃣ **Access Features**
Once logged in, you can:
- ✅ **Browse Doctors**: View all available doctors
- ✅ **Book Appointments**: Schedule appointments with doctors (patients only)
- ✅ **View Appointments**: See your scheduled appointments
- ✅ **View Visits**: See your visit history
- ✅ **Edit Profile**: Update your personal information

---

## 🔧 Server Status

### Backend Server
- **URL**: http://localhost:4000
- **Status**: ✅ Running
- **Database**: ✅ Connected to PostgreSQL

### Frontend Server
- **URL**: http://localhost:5173
- **Status**: ✅ Running
- **Framework**: React + Vite

---

## 📋 Available Pages

| Page | URL | Access | Description |
|------|-----|--------|-------------|
| Home | `/` | Public | Landing page with hero section |
| Login | `/login` | Public | User login |
| Register Patient | `/register/patient` | Public | Patient registration |
| Register Doctor | `/register/doctor` | Public | Doctor registration |
| Doctors | `/doctors` | Public | Browse all doctors |
| Appointments | `/appointments` | 🔒 Protected | View your appointments |
| Book Appointment | `/appointments/book` | 🔒 Patient Only | Schedule new appointment |
| Profile | `/profile` | 🔒 Protected | View/edit your profile |
| Visits | `/visits` | 🔒 Protected | View visit history |

---

## 🎨 Features Implemented

### Authentication System
- ✅ JWT-based authentication
- ✅ Role-based access (Patient/Doctor)
- ✅ Secure password handling
- ✅ Auto-redirect for protected routes

### For Patients
- ✅ Browse available doctors
- ✅ Book appointments with doctors
- ✅ View appointment history
- ✅ View medical visit records
- ✅ Update personal profile

### For Doctors
- ✅ View all appointments
- ✅ Access patient visit records
- ✅ Update professional profile
- ✅ View patient feedback

---

## 🐛 Troubleshooting

### "Failed to load appointments"
**Cause**: You're not logged in  
**Solution**: Click "Login" in the navbar and sign in

### "Only patients can book appointments"
**Cause**: You're logged in as a doctor  
**Solution**: Doctors cannot book appointments. Register a patient account instead.

### Backend not responding
**Cause**: Backend server is not running  
**Solution**: 
```bash
cd backend
npm start
```

### Frontend not loading
**Cause**: Frontend server is not running  
**Solution**:
```bash
cd frontend
npm run dev
```

---

## 📞 Support

If you encounter any issues:
1. Make sure both backend and frontend servers are running
2. Check that you're logged in before accessing protected pages
3. Verify your database connection in `backend/.env`

---

**Happy Healthcare Managing! 🏥**
