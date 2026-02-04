# Dev OS# Portfolio v2 (Next.js)

A modern, full-stack portfolio website built with **Next.js 16**, **Prisma**, and **PostgreSQL**.  
Features a public portfolio page and a private admin hub for content management.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: Auth.js (NextAuth v5)
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel
- **Language**: TypeScript

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd portfolio
npm install
```

### 2. Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Then configure the following variables in `.env`:

#### **Database** (Required)
- `DATABASE_URL`: Pooled connection string from Neon (for API routes)
- `DATABASE_URL_UNPOOLED`: Direct connection string (for migrations)

#### **Authentication** (Required)
- `AUTH_SECRET`: Generate with `openssl rand -base64 32`
- `AUTH_TRUST_HOST`: Set to `true`
- `OWNER_EMAIL`: Your email for admin access

#### **OAuth** (Optional - for GitHub login)
- `AUTH_GITHUB_ID`: GitHub OAuth App Client ID
- `AUTH_GITHUB_SECRET`: GitHub OAuth App Client Secret

#### **Application**
- `NEXT_PUBLIC_SITE_URL`: Your site URL (localhost:3000 for dev)

### 3. Database Setup

```bash
# Run migrations
npm run db:migrate:dev

# (Optional) Open Prisma Studio to view/edit data
npm run db:studio
```

### 4. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Build

```bash
npm run build
npm start
```

## 📂 Project Structure

```
portfolio/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── (public)/          # Public routes
│   │   └── (private)/         # Protected admin routes
│   ├── components/            # Reusable components
│   └── lib/                   # Utilities and configurations
├── docs/                      # Project documentation
├── .env.example               # Environment variable template
└── vercel.json                # Vercel deployment config
```

## 🚢 Deployment (Vercel)

### Initial Setup

1. **Create Vercel Project**
   - Connect your GitHub repository
   - Framework Preset: Next.js
   - Root Directory: `.`

2. **Configure Environment Variables**
   - Add all variables from `.env.example`
   - Set for both **Production** and **Preview** environments

3. **Deploy**
   - Push to `main` branch → Production deployment
   - Create PR → Preview deployment

### Automatic Deployments

- **PR Created** → Vercel deploys preview with URL comment on PR
- **Merged to main** → Vercel deploys to production
- **Migrations** → Automatically run via `vercel-build` script

### Database Migration Strategy

- **Development**: `npm run db:migrate:dev`
- **Preview/Production**: Automatic via `prisma migrate deploy` in `vercel-build`

## 🗃️ Database Schema

The application uses the following main models:

- `Portfolio`: Main portfolio information
- `Project`: Portfolio projects
- `Skill`: Skills with categories and proficiency levels
- `Experience`: Work experience
- `Education`: Educational background
- `User`, `Account`, `Session`: Auth.js authentication tables

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate:dev` - Run Prisma migrations (dev)
- `npm run db:migrate:deploy` - Run Prisma migrations (production)
- `npm run db:push` - Push schema changes without migration
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database (if configured)

## 🔐 Authentication

The app uses Auth.js (NextAuth v5) with:
- GitHub OAuth provider
- Owner-based access control via `OWNER_EMAIL`

## 📖 Documentation

See the `docs/` directory for detailed planning and design documents.

---

**Version**: 2.0.0  
**Last Updated**: 2026-02-04t
