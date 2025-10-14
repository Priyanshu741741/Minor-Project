# Dashboard UI Guide

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  [Menu] Calendar (Doctor/Patient Dashboard)     [Search] ⚙️ [U] │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────┐  ┌──────────────────────────────────────────────┐  │
│  │         │  │                                               │  │
│  │  [+]    │  │  [Today]  [<] [>]  March 5 - March 11, 2025 │  │
│  │  Book   │  │                           [Day][Week][Month] │  │
│  │         │  ├──────────────────────────────────────────────┤  │
│  │ Mini    │  │                                               │  │
│  │ Cal     │  │  ┌─────────┬─────────┬─────────┬─────────┐  │  │
│  │ March   │  │  │ Today's │ Total   │ Upcoming│         │  │  │
│  │ 2025    │  │  │   8     │   45    │   12    │         │  │  │
│  │ S M T W │  │  └─────────┴─────────┴─────────┴─────────┘  │  │
│  │ [1][2]  │  │                                               │  │
│  │         │  │  ┌────────────────────────────────────────┐  │  │
│  │ My      │  │  │      SUN MON TUE WED THU FRI SAT      │  │  │
│  │ Cals    │  │  │       3   4   5   6   7   8   9       │  │  │
│  │ ■ Sched │  │  ├────────────────────────────────────────┤  │  │
│  │ ■ Done  │  │  │ 8 AM │   │   │   │   │   │   │       │  │  │
│  │ ■ Cancel│  │  │ 9 AM │ ┌─┴─┐ │   │   │   │   │       │  │  │
│  │         │  │  │10 AM │ │Apt│ │   │   │   │   │       │  │  │
│  │ Links   │  │  │11 AM │ └───┘ │   │   │   │   │       │  │  │
│  │ 🏠 Home │  │  │12 PM │   │   │   │   │   │   │       │  │  │
│  │ 📅 Apts │  │  │ 1 PM │   │   │   │   │   │   │       │  │  │
│  │ 🩺 Visit│  │  │ 2 PM │   │   │   │ ┌───┐ │   │       │  │  │
│  │ 👤 Prof │  │  │ 3 PM │   │   │   │ │Apt│ │   │       │  │  │
│  │         │  │  │ 4 PM │   │   │   │ └───┘ │   │       │  │  │
│  │         │  │  │ 5 PM │   │   │   │   │   │   │       │  │  │
│  │ [Logout]│  │  └────────────────────────────────────────┘  │  │
│  └─────────┘  └──────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Color Scheme

### Appointment Status Colors
- 🔵 **Blue** (#3B82F6) - Scheduled appointments
- 🟢 **Green** (#10B981) - Completed appointments  
- 🔴 **Red** (#EF4444) - Cancelled appointments

### UI Colors
- **Background**: Gradient from Blue-50 via White to Purple-50
- **Cards**: White with transparency (white/80)
- **Primary Buttons**: Blue-600 → Blue-700 on hover
- **Text**: Gray-900 (primary), Gray-600 (secondary)

## Component Breakdown

### 1. Header
```jsx
┌───────────────────────────────────────────────┐
│ [☰] 📅 Doctor Dashboard    [🔍] [⚙️] [U]     │
└───────────────────────────────────────────────┘
```

### 2. Sidebar (Desktop)
```jsx
┌─────────────────┐
│ [+ Book Appt]   │  ← Primary action button
│                 │
│ Mini Calendar   │  ← Current month calendar
│ ┌─────────────┐ │
│ │ March 2025  │ │
│ │ S M T W T F │ │
│ │   1 2 3 4 5 │ │
│ └─────────────┘ │
│                 │
│ My Calendars    │  ← Legend
│ ■ Scheduled     │
│ ■ Completed     │
│ ■ Cancelled     │
│                 │
│ Quick Links     │  ← Navigation
│ 🏠 Home         │
│ 📅 Appointments │
│ 🩺 Visits       │
│ 👤 Profile      │
│                 │
│ [🚪 Logout]     │  ← Logout button
└─────────────────┘
```

### 3. Statistics Cards (Doctor View)
```jsx
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Today's      │ │ Total        │ │ Upcoming     │
│ Appointments │ │ Patients     │ │              │
│     8        │ │     45       │ │     12       │
│ 📅           │ │ 👥           │ │ 🕐           │
└──────────────┘ └──────────────┘ └──────────────┘
```

### 4. Calendar View Controls
```jsx
┌───────────────────────────────────────────────┐
│ [Today] [◄] [►]  March 5 - March 11, 2025    │
│                      [Day] [Week] [Month]     │
└───────────────────────────────────────────────┘
```

### 5. Week Grid
```jsx
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│Time │ SUN │ MON │ TUE │ WED │ THU │ FRI │ SAT │
├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│8 AM │     │     │     │     │     │     │     │
├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│9 AM │┌───┐│     │     │     │     │     │     │
│     ││Apt││     │     │     │     │     │     │
│10AM │└───┘│     │     │     │     │     │     │
├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │     │     │┌───┐│     │     │     │
│2 PM │     │     │     ││Apt││     │     │     │
│     │     │     │     │└───┘│     │     │     │
└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘
```

### 6. Appointment Block
```jsx
┌─────────────────────┐
│ 🟦 John Doe        │  ← Patient/Doctor name
│ ⏰ 9:00 AM         │  ← Time
│ 📝 Checkup         │  ← Reason
└─────────────────────┘
```

### 7. Event Detail Modal
```jsx
        ┌──────────────────────────────┐
        │ Appointment Details      [X] │
        ├──────────────────────────────┤
        │                              │
        │ 👤 Patient                   │
        │    John Doe                  │
        │                              │
        │ 🕐 Date & Time               │
        │    March 5, 2025 - 9:00 AM   │
        │                              │
        │ 📝 Reason                    │
        │    Regular Checkup           │
        │                              │
        │ 📅 Status                    │
        │    Scheduled                 │
        │                              │
        │ [Close] [View Details]       │
        └──────────────────────────────┘
```

## Responsive Behavior

### Desktop (> 1024px)
- Full sidebar visible
- 3-column statistics
- Full calendar grid

### Tablet (768px - 1024px)
- Narrower sidebar
- 3-column statistics
- Condensed calendar grid

### Mobile (< 768px)
- Hamburger menu
- Sidebar slides in from left
- Stacked statistics (1 column)
- Scrollable calendar
- Overlay backdrop when menu open

## Interactions

### Click Events
1. **Appointment Block** → Opens detail modal
2. **Week Navigation** → Changes week view
3. **Today Button** → Jumps to current week
4. **View Buttons** → Switches between Day/Week/Month
5. **Quick Links** → Navigate to pages
6. **Book Appointment** → Navigate to booking page

### Hover Effects
- Appointment blocks scale up (1.05x)
- Buttons show background change
- Time slots show light blue highlight

### Animations
- Fade-in on page load (0.5s)
- Slide-in sidebar on mobile
- Modal fade-in
- Scale animations on hover

## Data Flow

```
Login → Set Token/User → Navigate to /dashboard
                                    ↓
                          Fetch Appointments
                                    ↓
                            Group by Date
                                    ↓
                    Render in Calendar Grid
                                    ↓
                        Click → Show Modal
```

## Key Features

✅ Real-time appointment display
✅ Color-coded by status
✅ Week navigation
✅ Mini calendar
✅ Quick actions
✅ Responsive design
✅ Beautiful animations
✅ Role-based views (Doctor/Patient)
✅ Interactive event details
✅ Statistics dashboard

---

**Ready to use!** Just run `npm run dev` in the frontend folder.
