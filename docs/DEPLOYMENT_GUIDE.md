# M0 Foundation - 배포 파이프라인 구성 가이드

## 📋 개요

이 문서는 Portfolio v2 프로젝트의 M0 Foundation 단계에서 구성한 배포 파이프라인과 데이터베이스 설정 가이드입니다.

---

## 1️⃣ PostgreSQL 데이터베이스 생성 (Neon)

### 1.1 Neon 계정 생성 및 로그인

1. [Neon Console](https://console.neon.tech) 접속
2. GitHub 계정으로 로그인 (권장)

### 1.2 DB 인스턴스 생성

1. **New Project** 클릭
2. 프로젝트 설정:
   - **Project Name**: `portfolio-v2` (또는 원하는 이름)
   - **Region**: `Asia Pacific (Singapore)` (Seoul 미지원 시 가장 가까운 리전)
   - **Postgres Version**: 최신 버전 (기본값)
   - **Plan**: Free Tier 선택

3. **Create Project** 클릭

### 1.3 연결 문자열 확보

프로젝트 생성 후 Dashboard에서:

1. **Connection Details** 섹션 확인
2. 두 가지 연결 문자열 복사:

#### Pooled Connection (권장 - Serverless용)
```
postgresql://[user]:[password]@[host]/[database]?sslmode=require&pgbouncer=true
```

#### Direct Connection (Migration용)
```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

### 1.4 연결 테스트

#### Option 1: Prisma CLI (권장)
```bash
# .env 파일에 연결 문자열 추가 후
npx prisma db push
```

#### Option 2: psql
```bash
psql "postgresql://[user]:[password]@[host]/[database]?sslmode=require"
```

### 1.5 환경변수 설정

`.env` 파일에 다음 추가:

```bash
# Pooled connection (API routes용)
DATABASE_URL="postgresql://[user]:[password]@[host]/[database]?sslmode=require&pgbouncer=true&connect_timeout=15"

# Direct connection (Migration용)
DATABASE_URL_UNPOOLED="postgresql://[user]:[password]@[host]/[database]?sslmode=require"
```

---

## 2️⃣ Vercel 프로젝트 생성

### 2.1 Vercel 계정 생성/로그인

1. [Vercel](https://vercel.com) 접속
2. GitHub 계정으로 로그인

### 2.2 GitHub 저장소 연동

1. Dashboard에서 **Add New** > **Project** 클릭
2. **Import Git Repository** 선택
3. GitHub 저장소 선택 (예: `junDevCodes/portfolio`)
4. **Import** 클릭

### 2.3 프로젝트 설정

#### Framework Preset
- **Framework**: Next.js (자동 감지됨)

#### Root Directory
- **Root Directory**: `.` (기본값, 프로젝트 루트)

#### Build & Development Settings
- **Build Command**: `npm run build`
  - 자동으로 `vercel-build` 스크립트 실행됨 (Prisma 마이그레이션 포함)
- **Install Command**: `npm install` (기본값)
- **Output Directory**: `.next` (기본값)

### 2.4 환경변수 설정

**Settings** > **Environment Variables**에서 다음 변수 추가:

#### Production 환경

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Neon Pooled Connection String | Required |
| `DATABASE_URL_UNPOOLED` | Neon Direct Connection String | Required for migrations |
| `AUTH_SECRET` | `openssl rand -base64 32` 결과 | Required |
| `AUTH_TRUST_HOST` | `true` | Required |
| `OWNER_EMAIL` | 관리자 이메일 | Required |
| `NEXT_PUBLIC_SITE_URL` | `https://your-app.vercel.app` | Production URL |
| `AUTH_GITHUB_ID` | GitHub OAuth Client ID | Optional |
| `AUTH_GITHUB_SECRET` | GitHub OAuth Client Secret | Optional |

#### Preview 환경

Production과 동일한 환경변수 설정 (단, `NEXT_PUBLIC_SITE_URL`은 Preview URL로 설정 가능)

> **💡 Tip**: "Preview" 환경에 체크하여 PR 배포 시에도 환경변수가 적용되도록 설정

### 2.5 첫 배포

1. **Deploy** 클릭
2. 배포 로그 확인
3. 배포 완료 후 Production URL 확인

---

## 3️⃣ 배포 파이프라인 구성

### 3.1 자동 배포 워크플로우

Vercel은 GitHub와 연동 시 자동으로 다음 워크플로우를 설정합니다:

#### PR 생성 → Preview 배포
```
1. 브랜치에서 작업
2. PR 생성
3. Vercel이 자동으로 Preview 배포 트리거
4. PR에 Preview URL 코멘트 자동 추가
5. 코드 변경 시마다 자동 재배포
```

#### main 머지 → Production 배포
```
1. PR을 main에 머지
2. Vercel이 자동으로 Production 배포 트리거
3. 배포 완료 후 Production URL 업데이트
```

### 3.2 Build 설정 확인

`package.json`의 스크립트 확인:

```json
{
  "scripts": {
    "build": "next build",
    "vercel-build": "prisma migrate deploy && next build"
  }
}
```

> **중요**: Vercel은 `vercel-build` 스크립트가 있으면 `build` 대신 이를 실행합니다.  
> 따라서 배포 시마다 Prisma 마이그레이션이 자동 실행됩니다.

### 3.3 Prisma 마이그레이션 자동화

#### 개발 환경 (로컬)
```bash
# 새 마이그레이션 생성
npm run db:migrate:dev

# Prisma Studio로 데이터 확인
npm run db:studio
```

#### Preview/Production 환경 (Vercel)
- `vercel-build` 스크립트가 자동으로 `prisma migrate deploy` 실행
- 따라서 **별도 마이그레이션 작업 불필요**

### 3.4 배포 테스트

#### ✅ Preview 배포 테스트

1. 새 브랜치 생성:
   ```bash
   git checkout -b test/deployment
   ```

2. 간단한 변경 커밋:
   ```bash
   echo "// test deployment" >> src/app/page.tsx
   git add .
   git commit -m "test: preview deployment"
   git push origin test/deployment
   ```

3. GitHub에서 PR 생성

4. Vercel Preview URL 확인:
   - PR 코멘트에서 Preview URL 클릭
   - 배포 로그 확인: [Vercel Dashboard](https://vercel.com) > Deployments

#### ✅ Production 배포 테스트

1. PR을 main에 머지

2. Vercel Production 배포 확인:
   - Dashboard에서 "Production" 배포 상태 확인
   - Production URL 접속하여 변경사항 확인

### 3.5 롤백 프로세스

#### Vercel Dashboard에서 롤백

1. [Vercel Dashboard](https://vercel.com) > 프로젝트 선택
2. **Deployments** 탭 클릭
3. 이전 성공한 배포 선택
4. **⋯** (더보기) > **Promote to Production** 클릭

#### 명령어로 롤백 (선택)

```bash
# Vercel CLI 설치
npm i -g vercel

# 이전 배포로 롤백
vercel rollback [deployment-url]
```

---

## 4️⃣ 환경변수 템플릿

### 4.1 `.env.example` 파일

프로젝트 루트에 이미 생성되어 있습니다:

```bash
# ============================================
# Database Configuration
# ============================================
# Pooled connection (recommended for serverless/API routes)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public&pgbouncer=true&connect_timeout=15"

# Direct/Unpooled connection (required for migrations and CLI commands)
DATABASE_URL_UNPOOLED="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"

# ============================================
# Authentication (Auth.js / NextAuth)
# ============================================
AUTH_SECRET="replace-with-strong-random-secret-string"
AUTH_TRUST_HOST="true"
AUTH_URL="http://localhost:3000"

# GitHub OAuth (optional - for admin login)
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""

# ============================================
# Application Configuration
# ============================================
# Owner email for admin access control
OWNER_EMAIL="owner@example.com"

# Public site URL (used for API routes, redirects, etc.)
# Production: https://your-app.vercel.app
# Preview: https://your-app-git-branch.vercel.app
# Development: http://localhost:3000
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4.2 README.md 업데이트

`README.md`에 환경변수 설명이 추가되었습니다. (이미 완료)

### 4.3 팀원과 환경변수 공유

#### 공유 방법

1. **Slack/Discord**: 민감한 정보는 DM으로 전달
2. **Notion**: 팀 문서에 환경변수 설명 추가 (값은 제외)
3. **1Password/Bitwarden**: 팀 Vault에 저장 (권장)

#### 공유할 정보

- ✅ `.env.example` 파일 위치
- ✅ 각 환경변수의 용도
- ✅ Neon Dashboard URL
- ✅ Vercel Project URL
- ❌ 실제 연결 문자열 및 시크릿 (DM 또는 암호화된 채널로만 전달)

---

## 5️⃣ 배포 파이프라인 검증 체크리스트

### ✅ M0 전체 체크리스트

- [x] DB 생성 및 연결 성공
  - [x] Neon 프로젝트 생성
  - [x] Pooled/Direct 연결 문자열 확보
  - [x] 환경변수 설정
- [x] Vercel 프로젝트 생성 성공
  - [x] GitHub 저장소 연동
  - [x] 환경변수 설정 (Production/Preview)
  - [x] Framework 설정 (Next.js)
- [x] Preview/Production 배포 파이프라인 구성
  - [x] `vercel-build` 스크립트 추가
  - [x] Prisma 마이그레이션 자동화
  - [x] 롤백 프로세스 문서화
- [x] 환경변수 문서화 완료
  - [x] `.env.example` 작성
  - [x] `README.md` 업데이트
- [ ] 강민서(QA) 배포 파이프라인 검증 통과
  - **대기 중**: 실제 배포 후 QA 팀 검증 필요

---

## 6️⃣ 다음 단계 (M1 이후)

### M1 - Portfolio 배포 시

1. M1 기능 개발 완료 후 PR 머지
2. Production 배포 자동 트리거
3. Health Check 수행:
   - Public 페이지 접근 확인 (`/`, `/projects`)
   - API 동작 확인 (`/api/public/portfolio`)
   - 에러 로그 확인 (Vercel Dashboard)

### 모니터링 설정 (선택)

- **Vercel Analytics**: 기본 제공 (무료)
- **Sentry**: 에러 로깅 (선택 사항)

---

## 📞 문제 해결

### 자주 발생하는 문제

#### 1. 배포 시 Prisma 에러

**증상**: `Error: P1001: Can't reach database server`

**해결**:
- Vercel Dashboard에서 `DATABASE_URL_UNPOOLED` 환경변수 확인
- Neon Dashboard에서 DB 상태 확인
- 연결 문자열에 `sslmode=require` 포함되었는지 확인

#### 2. Preview 배포가 Production DB를 사용

**해결**:
- Vercel에서 Preview 환경에도 환경변수 설정되었는지 확인
- 필요 시 Preview 전용 DB 인스턴스 생성 (권장하지 않음, Free Tier 제한)

#### 3. 환경변수 변경 후 반영 안됨

**해결**:
- Vercel Dashboard > Settings > Environment Variables에서 변경
- **Redeploy** 버튼 클릭하여 재배포

---

## 📚 참고 자료

- [Neon Documentation](https://neon.tech/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma with Vercel Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)

---

**작성일**: 2026-02-04  
**작성자**: 정하은 (DevOps Engineer)  
**버전**: 1.0
