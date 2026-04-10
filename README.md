# Saudia AC Service

Ultra-premium bilingual portfolio site for a Dammam-based appliance repair business, built with NestJS and MongoDB.

## Features

- Public luxury-style portfolio homepage
- Arabic and English language toggle from the header
- Dedicated contact page with Mongo-backed inquiry submission
- Admin panel at `/admin/`
- Editable footer, phone, hero content, service image URLs, and social links
- Enable or disable Instagram, WhatsApp, Facebook, TikTok, and X from the admin panel
- Contact submissions dashboard backed by MongoDB

## Tech Stack

- NestJS
- MongoDB with Mongoose
- Static premium frontend served by NestJS
- Vanilla JavaScript and custom CSS

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/saudia-ac-service
```

## Install

```bash
npm install
```

## Run in development

```bash
npm run start:dev
```

## Production build

```bash
npm run build
npm run start:prod
```

## Routes

- `/` - portfolio homepage
- `/contact/` - contact page
- `/admin/` - admin dashboard
- `/api/public/settings` - public settings API
- `/api/contact` - submit contact request
- `/api/admin/settings` - admin settings API
- `/api/admin/contact-submissions` - admin submissions API

## Notes

- The default service images are remote `.webp` image URLs and can be changed from the admin panel.
- The admin area does not include authentication yet.
- Update the default business contact details from `/admin/` after the first run.
