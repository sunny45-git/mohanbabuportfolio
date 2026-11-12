# Babu Mohan — Personal Portfolio Website Concept

> **INDEPENDENT WEBSITE CONCEPT – FOR PRESENTATION PURPOSES ONLY.**  
> This project is an independent demo concept intended for review by Babu Mohan and his representatives. It is not an official website.

---

## Project Structure

```text
mohanbabuport/
├── frontend/               # React + Vite + Tailwind CSS + Framer Motion + Lucide React
│   ├── public/             # robots.txt, sitemap.xml
│   ├── src/
│   │   ├── components/     # Navbar, Hero, Political Journey, Cinema Journey, Gallery, Lightbox, Media, Contact, Admin Dashboard
│   │   ├── data/           # Verified local demo dataset & placeholder markers
│   │   └── services/       # API integration with automatic local fallback
│   └── vercel.json         # Vercel SPA routing config
└── backend/                # Node.js + Express + Mongoose + Cloudinary API structure
    ├── config/             # MongoDB & Cloudinary configuration
    ├── models/             # Mongoose schemas (Movie, PoliticalMilestone, Award, GalleryItem, MediaItem, Enquiry)
    ├── routes/             # REST endpoints + Cloudinary upload route
    ├── render.yaml         # Render deployment blueprint
    └── server.js
```

---

## Running Locally

### Frontend (Runs standalone without MongoDB)
```bash
cd frontend
npm install
npm run dev
```

### Backend (Optional — Express + MongoDB + Cloudinary)
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

---

## Key Features Implemented

- **Soft Neumorphic Light-Grey Aesthetic**: Built with `#EDF0F3` canvas, `#F5F7FA` elevated surfaces, `#292B32` / `#646A73` typography, `#E91E63` accent highlights, and `Plus Jakarta Sans` / `Inter` / `Playfair Display`.
- **Two Major Career Pillars**:
  - **Political Journey (`A JOURNEY IN PUBLIC SERVICE`)**: Political biography, interactive timeline (`1998`, `1999`, `2004`, `2009`, `2014`, `2018`, `2023`), Andole Assembly Constituency profile, Ministerial Career card (`Minister for Labour`, United AP, `11 Sep 2002 – 14 May 2004`), Public Service grid, and Political Gallery.
  - **Cinema Journey (`A LEGACY OF LAUGHTER`)**: Editorial intro, searchable & decade-filtered Filmography (`All Movies`, `1990–1999`, `2000–2009`, `2010–2019`, `2020 onwards`), Memorable Performances, verified `1991 Nandi Award for Best Male Comedian` + archival notice, Career Milestones, and Cinema Gallery.
- **About, Photo Gallery (with Lightbox), Media & Interviews, and Contact (`GET IN TOUCH`)**.
- **Admin Dashboard Concept UI**: Separate interactive management workspace previewing CRUD flows for Filmography, Awards, Political Timeline, Gallery/Cloudinary uploads, Media, Biography, and Contact channels.
- **Strict Data & Media Integrity**: No fabricated film credits, awards, dates, contact details, or AI-generated portraits presented as real photographs.

