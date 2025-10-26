# MindSpace - React + Vite

A modern SaaS landing page built with React, Vite, and shadcn/ui components.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📦 Build for Production

```bash
npm run build
# or
pnpm build
```

Preview the production build:
```bash
npm run preview
# or
pnpm preview
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable components built with Radix UI
- **Lucide React** - Icon library
- **React Router** - Client-side routing

## 📁 Project Structure

```
frontend-new/
├── src/
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   └── pages/
│       └── Home.jsx         # Landing page
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── pro-blocks/          # Landing page sections
├── lib/
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── package.json             # Dependencies and scripts
```

## 🔧 Configuration

### Path Aliases
The project uses `@/` as an alias for the root directory:
```javascript
import { Button } from '@/components/ui/button'
```

### Tailwind CSS
Customize colors, fonts, and other design tokens in `tailwind.config.js` and `src/index.css`.

## 🎨 Components

This project includes a full set of shadcn/ui components and pre-built landing page sections:
- Navigation bars
- Hero sections
- Feature sections
- Testimonials
- Pricing tables
- FAQ sections
- Footers

## 📝 License

This project is private and proprietary.

## 🙋‍♂️ Support

For questions or issues, please contact the development team.
