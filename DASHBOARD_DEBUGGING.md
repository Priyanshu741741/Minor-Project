# Dashboard Debugging Guide

## Issue: Empty/Blank Dashboard Page

### Step 1: Check Browser Console
Open your browser console (F12) and look for these messages:

```
Dashboard component loaded
Before useEffect  
Dashboard mounted
Is authenticated: true/false
User: {user object}
```

### Step 2: Check Authentication Status

Open browser console and type:
```javascript
localStorage.getItem('token')
localStorage.getItem('user')
```

**If both are null:**
- You're not logged in
- Dashboard will redirect you to `/login`
- Solution: Login first at `http://localhost:5173/login`

**If they have values:**
- You're logged in
- Continue to Step 3

### Step 3: Test Simple Dashboard

Navigate to: `http://localhost:5173/dashboard-test`

This will show a basic test page that confirms:
- Component is rendering
- Authentication is working
- User data is available

### Step 4: Check Network Tab

1. Open DevTools → Network tab
2. Go to `/dashboard`
3. Look for API call to `/api/appointments`
4. Check if it's:
   - ✅ Status 200: Success
   - ❌ Status 401: Auth error
   - ❌ Status 500: Server error
   - ❌ Failed: Backend not running

### Common Issues & Solutions

#### Issue 1: Redirecting to Login Immediately
**Cause:** Not authenticated or token expired
**Solution:**
1. Go to `/login`
2. Login with valid credentials
3. Should automatically redirect to dashboard

#### Issue 2: White/Blank Screen
**Cause:** JavaScript error or component crash
**Solution:**
1. Check browser console for red errors
2. Look for missing imports or typos
3. Check if all dependencies are installed

#### Issue 3: Stuck on Loading Spinner
**Cause:** API call failing or hanging
**Solution:**
1. Check if backend is running on port 4000
2. Check Network tab for failed requests
3. Verify API endpoint is correct

#### Issue 4: "Loading dashboard..." Forever
**Cause:** `loading` state never sets to false
**Solution:**
1. Backend might not be responding
2. Check `fetchAppointments()` function
3. Verify API endpoint exists

### Manual Debug Steps

#### Step A: Check if logged in
```javascript
// In browser console
console.log('Token:', localStorage.getItem('token'));
console.log('User:', JSON.parse(localStorage.getItem('user')));
```

#### Step B: Manually set auth (if needed for testing)
```javascript
// In browser console - use a real token from login
localStorage.setItem('token', 'your-token-here');
localStorage.setItem('user', JSON.stringify({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: 'PATIENT'
}));
// Then refresh page
```

#### Step C: Clear and retry
```javascript
// In browser console
localStorage.clear();
// Then go to /login and login again
```

### Expected Console Output (Normal Flow)

```
Dashboard component loaded
Before useEffect
After useEffect, loading: true
Dashboard mounted
Is authenticated: true
User: {id: 1, name: "John Doe", email: "john@example.com", role: "PATIENT"}
Fetching appointments...
Rendering loading state
Appointments response: [...]
Loading complete
Rendering main dashboard
```

### Quick Fix: Use Simple Version

If the full dashboard isn't working, use the test version:

1. Go to `/dashboard-test`
2. If that works, the issue is in the main Dashboard component
3. If that also fails, it's an authentication issue

### Verify Backend is Running

```powershell
# Check if backend is running
curl http://localhost:4000/api/health

# If not running, start it
cd "d:\Side Hustle\Minot\backend"
npm start
```

### Check Frontend is Running

```powershell
# Frontend should be on port 5173
# If not running
cd "d:\Side Hustle\Minot\frontend"
npm run dev
```

### Nuclear Option: Fresh Start

If nothing works:

```powershell
# 1. Stop all servers (Ctrl+C)

# 2. Clear browser storage
# Go to: DevTools → Application → Storage → Clear site data

# 3. Restart backend
cd "d:\Side Hustle\Minot\backend"
npm start

# 4. Restart frontend (new terminal)
cd "d:\Side Hustle\Minot\frontend"
npm run dev

# 5. Clear browser cache and hard reload (Ctrl+Shift+R)

# 6. Go to http://localhost:5173/login
# 7. Login
# 8. Should auto-redirect to dashboard
```

### Still Not Working?

Check these files exist and have no errors:
- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/lib/auth.js`
- `frontend/src/lib/api.js`
- `frontend/src/App.jsx` (has `/dashboard` route)

Run: 
```powershell
cd "d:\Side Hustle\Minot\frontend"
npm run build
```

If build fails, there's a syntax error somewhere.

### Get Specific Error Details

Add this to Dashboard.jsx at the very top of the return statement:

```jsx
return (
  <div>
    <div style={{position: 'fixed', top: 0, left: 0, background: 'red', color: 'white', padding: '10px', zIndex: 9999}}>
      DEBUG: Dashboard Rendering!
      <br/>
      Loading: {loading ? 'YES' : 'NO'}
      <br/>
      User: {user?.email || 'None'}
      <br/>
      Appointments: {appointments.length}
    </div>
    
    {/* rest of your JSX */}
  </div>
);
```

This will show a red box with debug info if the component is rendering at all.

---

## Quick Test Checklist

- [ ] Backend running on port 4000
- [ ] Frontend running on port 5173  
- [ ] Logged in (check localStorage)
- [ ] No console errors (red text)
- [ ] No network errors (check Network tab)
- [ ] `/dashboard-test` works
- [ ] Browser cache cleared

If all checked and still not working, share the console output!
