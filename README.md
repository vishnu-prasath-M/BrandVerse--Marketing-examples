# Marketing Examples Website

A fully functional marketing/examples website built with Next.js, TypeScript, Tailwind CSS, Prisma, and PostgreSQL. This project showcases real marketing examples from top brands, allowing users to browse, filter, and learn from successful campaigns.

## Features

- 🏠 **Homepage** with hero section, category chips, and example grid
- 📄 **Detail Pages** for each marketing example with markdown support
- 🔍 **Search & Filter** by categories and keywords
- 📧 **Newsletter Subscription** functionality
- ♾️ **Infinite Scroll / Pagination** with cursor-based loading
- 📱 **Responsive Design** - mobile-first approach
- 🌙 **Dark Mode Support** (optional)
- ♿ **Accessibility** - semantic HTML, ARIA labels, keyboard navigation
- 🎨 **Modern UI** with Tailwind CSS
- 🚀 **SEO Optimized** with dynamic metadata and OpenGraph tags
- 🧪 **Testing** with Jest and React Testing Library
- 🔄 **CI/CD** with GitHub Actions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + @tailwindcss/typography
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Markdown**: react-markdown
- **Testing**: Jest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 20+ and npm/pnpm/yarn
- PostgreSQL database (local or cloud)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd clientins
```

2. **Install dependencies**

```bash
npm install
# or
pnpm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/marketing_examples?schema=public"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

For production, update the `DATABASE_URL` with your PostgreSQL connection string (e.g., from Railway, Neon, or Supabase).

4. **Set up the database**

```bash
# Run Prisma migrations
npm run db:migrate

# Seed the database with sample data
npm run db:seed
```

5. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run type-check` - Run TypeScript type checking
- `npm run db:migrate` - Run Prisma migrations
- `npm run db:seed` - Seed the database
- `npm run db:studio` - Open Prisma Studio

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── examples/      # Examples endpoints
│   │   ├── categories/    # Categories endpoint
│   │   └── subscriptions/ # Newsletter subscriptions
│   ├── examples/[slug]/   # Dynamic example detail pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── CategoryChips.tsx
│   ├── ExampleCard.tsx
│   ├── LoadMoreButton.tsx
│   └── NewsletterForm.tsx
├── lib/
│   └── prisma.ts          # Prisma client instance
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed script
└── components/__tests__/  # Component tests
```

## Database Schema

### Models

- **Example**: Marketing examples with title, description, body, image, revenue, etc.
- **Category**: Categories like "Email Marketing", "Social Media", etc.
- **ExampleCategory**: Join table for many-to-many relationship
- **Subscription**: Newsletter email subscriptions

## API Endpoints

### `GET /api/examples`

Fetch paginated examples with optional filters.

**Query Parameters:**
- `cursor` (optional): Cursor for pagination
- `take` (optional): Number of items to fetch (default: 9)
- `category` (optional): Filter by category slug
- `search` (optional): Search query

**Response:**
```json
{
  "examples": [...],
  "nextCursor": "cursor_id",
  "hasMore": true
}
```

### `GET /api/examples/[slug]`

Get a single example by slug with related examples.

### `GET /api/categories`

Get all categories with example counts.

### `POST /api/subscriptions`

Subscribe to newsletter.

**Body:**
```json
{
  "email": "user@example.com"
}
```

## Deployment

### Vercel + Railway/Neon (Recommended)

1. **Set up PostgreSQL database**
   - Create a database on [Railway](https://railway.app) or [Neon](https://neon.tech)
   - Copy the connection string

2. **Deploy to Vercel**
   - Push your code to GitHub
   - Import the project in [Vercel](https://vercel.com)
   - Add environment variables:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `NEXT_PUBLIC_SITE_URL`: Your Vercel deployment URL
   - Run database migrations:
     ```bash
     # In Vercel build settings, add:
     # Build Command: npm run build
     # Install Command: npm install && npx prisma generate
     ```

3. **Run migrations and seed** (one-time)
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

### Docker Deployment

1. **Build and run with Docker Compose**

```bash
docker-compose up -d
```

This will:
- Start a PostgreSQL container
- Build and start the Next.js application
- Expose the app on port 3000

2. **Set environment variables**

Update `docker-compose.yml` or use a `.env` file with your database credentials.

3. **Run migrations and seed**

```bash
docker exec -it marketing-examples-app npx prisma migrate deploy
docker exec -it marketing-examples-app npx prisma db seed
```

### Manual Deployment

For other platforms (AWS, DigitalOcean, etc.):

1. Build the application: `npm run build`
2. Set environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Start the server: `npm start`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site | Yes (for production) |

## Testing

Run tests with:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:

- Runs type checking
- Runs linting
- Runs tests
- Checks code formatting

This runs automatically on push and pull requests.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests for new features
5. Ensure all tests pass and linting passes
6. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

