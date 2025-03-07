# PM & AI Newsletter

A minimalistic web app that aggregates articles from top Product Management and AI resources.

## Features

- Automatic article scraping from popular PM and AI blogs/newsletters
- Clean, responsive UI with article cards
- Automatic updates every 6 hours
- Server-side rendering for optimal performance

## Sources

- [Cutlefish](https://cutlefish.substack.com/)
- [One Knight in Product](https://oneknightinproduct.substack.com/)
- [Product Talk](https://www.producttalk.org/blog/)
- [Mind the Product](https://www.mindtheproduct.com/articles/)
- [Hils](https://hils.substack.com/)
- [Product Compass](https://www.productcompass.pm/)
- [Superhuman AI](https://www.superhuman.ai/)

## Tech Stack

- Frontend: Next.js, Tailwind CSS, Shadcn UI
- Backend: Supabase (PostgreSQL), Drizzle ORM
- Web Scraping: Cheerio
- Deployment: Vercel (with Cron Jobs)

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new project at [Supabase](https://supabase.com)
   - Go to Project Settings > Database to find your database connection string
   - Go to Project Settings > API to find your project URL and anon key
   - Copy these values to your environment variables

4. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then fill in the following variables:
   - `DATABASE_URL`: Your Supabase PostgreSQL connection string
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

5. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

1. Push to GitHub
2. Connect to Vercel
3. Set up environment variables in Vercel:
   - Add all variables from `.env.local`
   - Vercel will automatically set `VERCEL_URL` and `VERCEL_ENV`
4. Deploy

The app will automatically scrape new articles every 6 hours using Vercel Cron Jobs.

## License

MIT
