# 정하은 (DevOps Engineer) - 개인 작업 문서

## 👤 담당자 정보
- **이름**: 정하은
- **역할**: 주니어 레벨 2 DevOps Engineer
- **주요 책임**: 배포 파이프라인, DB 관리, 환경변수 관리, 모니터링

---

## 📦 개발 단위 1: M0 - Foundation

### 해야 할 Task
#### Task 1: PostgreSQL 데이터베이스 생성 (0.5일)
#### Task 2: Vercel 프로젝트 생성 (0.5일)
#### Task 3: 배포 파이프라인 구성 (1일)
#### Task 4: 환경변수 템플릿 작성 (0.5일)

### Task별 체크리스트

#### ✅ Task 1: DB 생성
- [ ] Neon/Prisma Postgres 계정 생성
- [ ] DB 인스턴스 생성
  - [ ] Region 선택 (Seoul 우선)
  - [ ] Plan 선택 (Free tier)
- [ ] Pooled connection string 확보
- [ ] 연결 테스트 (psql 또는 GUI)
- [ ] 박지훈(BE)에게 연결 정보 전달
- [ ] 환경변수 준비
  - [ ] `DATABASE_URL` (일반)
  - [ ] `DATABASE_URL_POOLED` (pooled)

#### ✅ Task 2: Vercel 프로젝트
- [ ] Vercel 계정 생성/로그인
- [ ] GitHub 연동
- [ ] 프로젝트 생성
  - [ ] Framework: Next.js
  - [ ] Root Directory: `/`
- [ ] 환경변수 설정 (Preview/Production)
  - [ ] `DATABASE_URL`
  - [ ] `AUTH_SECRET`
  - [ ] `AUTH_TRUST_HOST=true`
  - [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] Production URL 확인
- [ ] Preview URL 확인

#### ✅ Task 3: 배포 파이프라인
- [ ] Vercel 자동 배포 설정
  - [ ] PR 생성 → Preview 배포
  - [ ] main 머지 → Production 배포
- [ ] Build Command 설정
  - [ ] `npm run build`
- [ ] Install Command 설정
  - [ ] `npm install`
- [ ] Prisma 마이그레이션 자동화
  - [ ] `package.json`에 `vercel-build` 스크립트 추가
  - [ ] `prisma migrate deploy` 포함
- [ ] 배포 테스트
  - [ ] PR 생성 → Preview URL 확인
  - [ ] main 머지 → Production URL 확인
- [ ] 롤백 프로세스 확인
  - [ ] Vercel Dashboard에서 이전 배포로 복구

#### ✅ Task 4: 환경변수 템플릿
- [ ] `.env.example` 파일 작성
  - [ ] `DATABASE_URL=`
  - [ ] `AUTH_SECRET=`
  - [ ] `AUTH_TRUST_HOST=`
  - [ ] `NEXT_PUBLIC_SITE_URL=`
- [ ] README.md에 환경변수 설명 추가
- [ ] 팀원과 환경변수 공유 (Slack/Notion)

### M0 전체 체크리스트
- [ ] DB 생성 및 연결 성공
- [ ] Vercel 프로젝트 생성 성공
- [ ] Preview/Production 배포 성공
- [ ] 환경변수 문서화 완료
- [ ] 강민서(QA) 배포 파이프라인 검증 통과

---

## 📦 개발 단위 2: M1 - Portfolio

### 해야 할 Task
#### Task 1: M1 배포 (0.5일)
#### Task 2: Health Check (0.5일)

### Task별 체크리스트

#### ✅ Task 1: M1 배포
- [ ] M1 기능 PR 머지 확인
- [ ] Production 배포 트리거
- [ ] 배포 로그 확인
- [ ] 배포 성공 확인

#### ✅ Task 2: Health Check
- [ ] Public 페이지 접근 확인
  - [ ] `/` → 200
  - [ ] `/projects` → 200
  - [ ] `/projects/[slug]` → 200
- [ ] API 동작 확인
  - [ ] `/api/public/portfolio` → 200
  - [ ] `/api/public/projects` → 200
- [ ] 에러 로그 확인
- [ ] Health Check 리포트 작성

### M1 전체 체크리스트
- [ ] Production 배포 성공
- [ ] Public 페이지 정상 동작
- [ ] API 정상 동작
- [ ] 에러 로그 0건

---

## 📦 개발 단위 3-6: M2-M5

### 각 마일스톤별 공통 Task
#### Task 1: 배포 및 검증 (각 0.5일)
#### Task 2: Health Check (각 0.5일)

---

## 🎯 전체 프로젝트 체크리스트

### DevOps 완료 기준
- [ ] M0-M5 모든 배포 성공
- [ ] Preview/Production 환경 안정
- [ ] DB 백업 전략 수립
- [ ] 모니터링 설정 (Vercel Analytics, 선택)
- [ ] 에러 로깅 설정 (Sentry, 선택)
- [ ] 배포 문서 작성 완료
- [ ] 롤백 프로세스 문서화
- [ ] 팀원 배포 가이드 공유

---

**작업 원칙**
> "자동화 우선, 안정성 최우선, 투명한 소통"

