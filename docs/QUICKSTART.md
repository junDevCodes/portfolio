# 🚀 Quick Start Guide - Portfolio v2

**For Team Members**: 5분 안에 로컬 개발 환경 구축하기

---

## 📋 Prerequisites

- Node.js 20+ installed
- Git installed
- GitHub account

---

## ⚡ Quick Setup (5 minutes)

### 1. Clone Repository

```bash
git clone <repository-url>
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

이 과정에서 자동으로 `prisma generate`가 실행됩니다.

### 3. Setup Environment Variables

```bash
# .env.example을 복사하여 .env 파일 생성
cp .env.example .env
```

그런 다음 `.env` 파일을 열고 다음 값들을 입력:

```bash
# DevOps(정하은)에게 받은 실제 연결 문자열로 교체
DATABASE_URL="<Neon Pooled Connection>"
DATABASE_URL_UNPOOLED="<Neon Direct Connection>"

# AUTH_SECRET 생성 (아래 명령 실행 후 복사)
AUTH_SECRET="<아래 명령으로 생성>"

# 나머지는 기본값 사용 가능
AUTH_TRUST_HOST="true"
OWNER_EMAIL="your-email@example.com"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

**AUTH_SECRET 생성**:
```bash
# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Linux/Mac/WSL
openssl rand -base64 32
```

### 4. Run Database Migrations

```bash
npm run db:migrate:dev
```

### 5. Start Development Server

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

---

## 🎯 Role-Specific Quick Tips

### 🔧 Backend Engineer (박지훈)

**Database 작업**:
```bash
# Prisma Studio 실행 (GUI로 DB 확인/수정)
npm run db:studio

# 스키마 변경 후 migration
npm run db:migrate:dev

# 스키마만 푸시 (migration 없이)
npm run db:push
```

**Prisma Client 사용**:
```typescript
import { prisma } from '@/lib/prisma'

// 예시
const portfolio = await prisma.portfolio.findFirst()
const projects = await prisma.project.findMany({ where: { featured: true } })
```

### 🎨 Frontend Engineer (이서현)

**API 호출**:
```typescript
// Public API (인증 불필요)
fetch('/api/public/portfolio')
fetch('/api/public/projects')

// Private API (인증 필요)
fetch('/api/app/profile')
```

**환경변수 사용**:
```typescript
// 클라이언트 컴포넌트에서
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
```

### 📊 Data Engineer (김태영)

**Data Seeding**:
```bash
# prisma/seed.ts 파일 생성 후
npm run db:seed
```

**직접 DB 연결** (SQL 쿼리 실행):
```bash
# .env의 DATABASE_URL_UNPOOLED 사용
psql $(grep DATABASE_URL_UNPOOLED .env | cut -d '=' -f2)
```

### ✅ QA Engineer (강민서)

**Local Testing**:
```bash
# Production 빌드 테스트
npm run build
npm start
```

**Deployment Testing**:
- Preview: PR 생성 → Vercel 코멘트에서 Preview URL 확인
- Production: main 브랜치 머지 → Vercel Dashboard에서 확인

---

## 📦 Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (hot reload) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:migrate:dev` | Create and apply migration |
| `npm run db:push` | Push schema without migration |

---

## 🔍 Troubleshooting

### "Prisma Client not generated" 에러

```bash
npx prisma generate
```

### Database 연결 실패

1. `.env` 파일의 `DATABASE_URL` 확인
2. DevOps(정하은)에게 연결 정보 재확인 요청
3. Neon Dashboard에서 DB 상태 확인

### Port 3000 already in use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill
```

---

## 📚 More Info

- **Full Setup Guide**: [README.md](../README.md)
- **Deployment Guide**: [docs/DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Database Schema**: [prisma/schema.prisma](../prisma/schema.prisma)

---

**Questions?** Contact:
- DevOps: 정하은
- Backend: 박지훈
- Frontend: 이서현

---

**Last Updated**: 2026-02-04
