# PoReSt 개발 체크리스트

---

## M0 — Foundation ✅

### 프로젝트 구조
- [x] Next.js App Router 생성
- [x] TypeScript strict mode 설정
- [x] ESLint 설정
- [x] Prettier 설정
- [x] `.gitignore` 설정
- [x] Route Groups 생성 (`(public)`, `(private)`)
- [x] `.env.example` 작성
- [x] `package.json` scripts 정리

### 인증/권한 (Auth.js)
- [x] `next-auth` 패키지 설치
- [x] `@auth/prisma-adapter` 설치
- [x] `/api/auth/[...nextauth]/route.ts` 작성
- [x] Google OAuth Provider 설정
- [x] Prisma Adapter 연결
- [x] 오너 전용 정책 (`isOwner` 체크)
- [x] 세션 전략 설정 (JWT)
- [x] 세션 쿠키 보안 (HttpOnly, Secure, SameSite)
- [x] 로그인 페이지 (`/auth/signin`)
- [x] 로그아웃 기능

### 라우트 보호 (Middleware)
- [x] `middleware.ts` 파일 작성
- [x] `/app/*` 경로 보호 로직
- [x] Public 경로 예외 처리 (`/`, `/projects`, `/api/public/*`)
- [x] 비인증 접근 시 리다이렉트
- [x] Middleware matcher 설정
- [x] Edge Runtime 호환성 확인

### Database (Prisma + PostgreSQL)
- [x] Prisma 설치
- [x] `schema.prisma` 파일 생성
- [x] User 모델 (id, email, name, isOwner)
- [x] Account 모델 (Auth.js용)
- [x] Session 모델 (Auth.js용)
- [x] VerificationToken 모델
- [x] 관계 설정 (User ↔ Account, Session)
- [x] 인덱스 설정 (email unique)
- [x] PostgreSQL 연결 (Neon)
- [x] Pooled connection 설정
- [x] `prisma migrate dev` 실행
- [x] `lib/prisma.ts` 싱글톤 생성
- [x] 쿼리 로깅 설정 (개발 환경)

### Seed 스크립트
- [x] `prisma/seed.ts` 파일 생성
- [x] 오너 User 생성 로직
- [x] `package.json`에 seed 스크립트 추가
- [x] Seed 실행 및 확인

### API 인증 가드
- [x] `lib/auth-guard.ts` 파일 생성
- [x] `getServerSession` 유틸 함수
- [x] `requireAuth` 미들웨어 함수
- [x] `requireOwner` 미들웨어 함수
- [x] 401/403 에러 응답 표준화

### 배포 (Vercel)
- [x] Vercel 프로젝트 생성
- [x] GitHub 연동
- [x] 환경변수 설정 (Preview/Production)
  - [x] `DATABASE_URL`
  - [x] `AUTH_SECRET`
  - [x] `AUTH_TRUST_HOST`
  - [x] `NEXT_PUBLIC_SITE_URL`
- [x] PR → Preview 자동 배포
- [x] main → Production 자동 배포
- [x] `vercel-build` 스크립트 (migrate deploy)

### 더미 페이지
- [x] `app/(public)/layout.tsx` 작성
- [x] `app/(public)/page.tsx` 작성
- [x] `app/(private)/layout.tsx` 작성
- [x] `app/(private)/app/page.tsx` 작성

---

## M1 — Portfolio

### Prisma 스키마
- [ ] PortfolioSettings 모델
  - [ ] id, ownerId
  - [ ] publicSlug (unique), isPublic
  - [ ] displayName, headline, bio, avatarUrl
  - [ ] layoutJson
  - [ ] links (PortfolioLink: label, url, order)
- [ ] Project 모델
  - [ ] id, ownerId, slug (unique)
  - [ ] title, subtitle, description, contentMd
  - [ ] techStack, repoUrl, demoUrl, thumbnailUrl
  - [ ] visibility (PUBLIC/UNLISTED/PRIVATE)
  - [ ] isFeatured, order
  - [ ] createdAt, updatedAt
- [ ] Experience 모델
  - [ ] id, ownerId
  - [ ] visibility (PUBLIC/UNLISTED/PRIVATE)
  - [ ] company, role, startDate, endDate, isCurrent
  - [ ] summary, bulletsJson, metricsJson, techTags
  - [ ] isFeatured, order, createdAt, updatedAt
- [ ] 관계 설정
- [ ] 인덱스 설정 (slug unique, ownerId+visibility+order)
- [ ] 마이그레이션 실행

### Public API
- [ ] `GET /api/public/portfolio`
  - [ ] PortfolioSettings 조회
  - [ ] 대표 프로젝트 (visibility=PUBLIC + isFeatured=true)
  - [ ] 대표 경험 (visibility=PUBLIC + isFeatured=true)
  - [ ] DTO select (공개 필드만)
- [ ] `GET /api/public/projects`
  - [ ] visibility=PUBLIC 필터
  - [ ] 페이지네이션 (선택)
  - [ ] DTO select
- [ ] `GET /api/public/projects/[slug]`
  - [ ] slug로 조회
  - [ ] visibility 확인
  - [ ] 404 처리
  - [ ] DTO select

### Private API
- [ ] `GET /api/app/portfolio/settings`
  - [ ] 인증 가드
  - [ ] ownerId scope
- [ ] `PUT /api/app/portfolio/settings`
  - [ ] 인증 가드
  - [ ] 입력 검증 (Zod)
- [ ] `GET /api/app/projects`
  - [ ] 목록 조회
  - [ ] ownerId scope
- [ ] `POST /api/app/projects`
  - [ ] 프로젝트 생성
  - [ ] slug 중복 체크
  - [ ] slug 자동 생성
- [ ] `GET /api/app/projects/[id]`
  - [ ] 상세 조회
- [ ] `PUT /api/app/projects/[id]`
  - [ ] 수정
  - [ ] ownerId 검증
- [ ] `DELETE /api/app/projects/[id]`
  - [ ] 삭제
  - [ ] ownerId 검증
- [ ] `GET /api/app/experiences`
- [ ] `POST /api/app/experiences`
- [ ] `PUT /api/app/experiences/[id]`
- [ ] `DELETE /api/app/experiences/[id]`
- [ ] 에러 처리 (401/403/404/409/422)

### Public 페이지
- [ ] `/` 홈 페이지
  - [ ] Hero 섹션 (소개, 프로필)
  - [ ] 대표 프로젝트 카드 (3개)
  - [ ] 연락처/소셜 섹션
  - [ ] 반응형 디자인
- [ ] `/projects` 목록 페이지
  - [ ] 프로젝트 그리드 레이아웃
  - [ ] 필터링 UI (선택)
  - [ ] 페이지네이션 (선택)
- [ ] `/projects/[slug]` 상세 페이지
  - [ ] Problem 섹션
  - [ ] Approach 섹션
  - [ ] Results 섹션
  - [ ] GitHub/Demo 링크
  - [ ] 관련 기술 태그
- [ ] 이미지 최적화 (Next.js Image)
- [ ] 스크롤 애니메이션 (선택)

### SEO
- [ ] 각 페이지 metadata export
- [ ] title, description 작성
- [ ] OG 이미지 설정
- [ ] `app/sitemap.ts` 생성
- [ ] `app/robots.ts` 생성
- [ ] Open Graph 테스트

### Admin UI
- [ ] `/app/portfolio/settings` 설정 페이지
  - [ ] 프로필 편집 폼
  - [ ] 소셜 링크 편집
- [ ] `/app/projects` 목록
  - [ ] 테이블/카드 뷰
  - [ ] 정렬, 필터
- [ ] `/app/projects/new` 생성 폼
  - [ ] Markdown 에디터
  - [ ] 이미지 업로드 (선택)
  - [ ] 태그 입력
  - [ ] visibility 토글
- [ ] `/app/projects/[id]/edit` 편집 폼
- [ ] `/app/experiences` CRUD UI
- [ ] 대표 프로젝트 토글 (isFeatured)
- [ ] 폼 검증 (Zod + React Hook Form)

### 성능
- [ ] ISR 적용 (`revalidate` 설정)
- [ ] on-demand revalidate (선택)
- [ ] 이미지 lazy loading
- [ ] Lighthouse 90+

### Seed 확장
- [ ] 대표 프로젝트 3개 샘플
- [ ] Experience 5개 샘플
- [ ] PortfolioSettings 샘플

---

## M2 — Resume

### 스키마
- [ ] ResumeVersion 모델 (company, jobTitle)
- [ ] ResumeItem 모델 (experienceId, order, overrideText)
- [ ] Experience 필드 확장 (metricsJson, techTags)

### API
- [ ] `/api/app/resumes` CRUD
- [ ] `/api/app/resumes/[id]/items` CRUD
- [ ] `/api/app/resumes/[id]/preview`

### UI
- [ ] `/app/resumes` 목록
- [ ] `/app/resumes/new` 생성
- [ ] `/app/resumes/[id]/edit` 편집
- [ ] Experience 선택 체크박스
- [ ] Drag & Drop 정렬
- [ ] Override 편집 UI
- [ ] HTML Preview
- [ ] PDF 다운로드 (선택)

---

## M3 — Notes

### 스키마
- [ ] Notebook 모델
- [ ] Note 모델 (title, contentMd, tags, domain)
- [ ] NoteEdge 모델 (fromId, toId, status)
- [ ] NoteEmbedding 모델 (선택)
- [ ] Edge status enum (CANDIDATE/CONFIRMED/REJECTED)

### API
- [ ] `/api/app/notes` CRUD
- [ ] `/api/app/notes/[id]`
- [ ] `/api/app/notes/search`
- [ ] `/api/app/notes/edges`
- [ ] `/api/app/notes/edges/confirm`
- [ ] `/api/app/notes/edges/reject`

### Candidate Generator
- [ ] 태그 기반 후보 생성
- [ ] Jaccard 유사도 계산
- [ ] Threshold 0.7 적용
- [ ] Top-N 제한 (10~20개)
- [ ] Domain 필터링

### UI
- [ ] `/app/notes` Notebook/Note 목록
- [ ] Note 상세 (연관 개념 리스트)
- [ ] 연관 후보 UI (CANDIDATE)
- [ ] Confirm/Reject 버튼
- [ ] 그래프 시각화 (선택)

---

## M4 — Blog

### 스키마
- [ ] BlogPost 모델 (title, contentMd, status, lintResultJson)
- [ ] BlogExternalPost 모델 (선택)
- [ ] status enum (DRAFT/PUBLISHED/ARCHIVED)

### API
- [ ] `/api/app/blog/posts` CRUD
- [ ] `/api/app/blog/posts/[id]/lint`
- [ ] `/api/app/blog/posts/[id]/export`

### Lint 엔진
- [ ] Rule Interface 정의
- [ ] Rule 1: Long sentence (45자 이상)
- [ ] Rule 2: 반복 표현
- [ ] Rule 3: 모호 표현 밀도
- [ ] Rule 4: 근거 없는 단정
- [ ] Rule 5: 문단 과다 길이
- [ ] Rule 6: 단위/숫자 불일치
- [ ] Rule 7: 코드블록만 있고 설명 부족
- [ ] Rule 8: 금칙어 리스트
- [ ] Rule 9: 제목-본문 불일치
- [ ] Rule 10: 맞춤법 (선택)

### Export
- [ ] HTML Export
- [ ] Markdown Export
- [ ] ZIP 아카이브

### UI
- [ ] `/app/blog` 목록
- [ ] `/app/blog/new` 작성
- [ ] `/app/blog/[id]/edit` 편집
- [ ] Lint 결과 표시
- [ ] Export 다운로드

---

## M5 — Feedback

### 스키마
- [ ] FeedbackRequest 모델 (targetType, targetId, context)
- [ ] FeedbackItem 모델 (category, severity, message)
- [ ] targetType enum (PORTFOLIO/RESUME/NOTE/BLOG)

### API
- [ ] `/api/app/feedback` 목록/생성
- [ ] `/api/app/feedback/[id]` 상세
- [ ] `/api/app/feedback/[id]/run` 실행
- [ ] `/api/app/feedback/compare` 비교

### 엔진
- [ ] Resume 체크 템플릿
- [ ] Portfolio 체크 템플릿
- [ ] Note 체크 템플릿
- [ ] Blog 체크 템플릿
- [ ] 실행 로직

### UI
- [ ] `/app/feedback` 목록
- [ ] `/app/feedback/new` 실행
- [ ] `/app/feedback/[id]` 결과
- [ ] 비교 UI (diff)

---

## 🔐 보안 (공통)

- [x] `/app/*` 비인증 차단
- [x] `/api/app/*` 세션 체크
- [ ] `/api/app/*` ownerId scope 강제
- [ ] Public API DTO 강제
- [x] 세션 쿠키 보안
- [ ] slug 길이 제한 (100자)
- [ ] slug 허용 문자 검증
- [ ] JSON 크기 제한 (1MB)
- [ ] XSS 방어

---

## 📊 성능 (Public)

- [ ] Lighthouse Performance 90+
- [ ] ISR 적용
- [ ] 이미지 최적화
- [ ] Core Web Vitals (LCP, FID, CLS)

---

## 📈 DoD (작업 완료 기준)

- [ ] 기능 동작 확인
- [ ] 예외 처리 (401/403/404/409/422)
- [ ] 타입 에러 0건
- [ ] 린트 에러 0건
- [ ] 빌드 성공
- [ ] 테스트 1개 이상
- [ ] PR 리뷰 승인
- [ ] CI 통과
