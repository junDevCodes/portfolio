# PoReSt 개발 단계별 체크리스트

> **프로젝트**: PoReSt — Public Portfolio + Private Dashboard  
> **우선순위**: Portfolio > Notes > Blog > Feedback  
> **목표**: 각 마일스톤/도메인별로 빠짐없이 개발하고 검증한다

---

## 📋 전체 마일스톤 개요

- **M0**: Foundation (프로젝트 뼈대)
- **M1**: Portfolio (공개 포트폴리오 + 관리)
- **M2**: Resume (이력서 버전 관리)
- **M3**: Notes (지식노트 + 그래프)
- **M4**: Blog (작성 + Lint + Export)
- **M5**: Feedback (피드백 실행/비교)

---

## M0 — Foundation (프로젝트 초기 세팅)

### 📦 A. 프로젝트 구조 세팅
- [ ] Next.js (App Router) 프로젝트 생성
- [ ] TypeScript 설정 (`tsconfig.json` strict mode)
- [ ] ESLint + Prettier 설정
- [ ] Route Groups 구조 생성 (`(public)`, `(private)`)
- [ ] 환경변수 템플릿 작성 (`.env.example`)
- [ ] `.gitignore` 설정 (node_modules, .env, .next 등)

### 🔐 B. 인증/권한 (Auth.js)
- [ ] Auth.js (NextAuth) 설치 및 기본 설정
- [ ] Prisma Adapter 연결
- [ ] 오너 전용 정책 구현 (allowlist email 또는 `User.isOwner`)
- [ ] 로그인/로그아웃 페이지 (`/auth/signin`, `/auth/signout`)
- [ ] 세션 쿠키 설정 (HttpOnly, Secure, SameSite)

### 🛡️ C. 라우트 보호 (Middleware)
- [ ] Middleware 작성 (`/app/*` 경로 보호)
- [ ] 비인증 접근 시 로그인 페이지로 리다이렉트
- [ ] Public 경로 (`/`, `/projects`, `/api/public/*`) 예외 처리
- [ ] Middleware 테스트 (비인증 차단 확인)

### 🗄️ D. Database (Prisma + PostgreSQL)
- [ ] Prisma 설치 및 초기 스키마 작성
- [ ] PostgreSQL 연결 (Neon/Prisma Postgres 선택)
- [ ] Pooled connection 설정 (서버리스 환경 대비)
- [ ] `prisma migrate dev` 실행 (초기 마이그레이션)
- [ ] Seed 스크립트 작성 (`prisma/seed.ts`)
- [ ] Seed 데이터 실행 (`npm run seed`)

### 🚀 E. 배포 파이프라인 (Vercel)
- [ ] Vercel 프로젝트 생성 및 연결
- [ ] 환경변수 설정 (Preview/Production 분리)
- [ ] Preview 배포 확인 (PR마다 자동 배포)
- [ ] Production 배포 확인 (main 브랜치 머지 시)
- [ ] `prisma migrate deploy` 자동화 (배포 파이프라인)

### ✅ M0 완료 기준
- [ ] Public 홈 더미 페이지 접근 성공
- [ ] `/app` 경로는 비로그인 시 차단 확인
- [ ] DB 마이그레이션이 Preview/Prod에서 재현 가능
- [ ] 로그인 → `/app` 접근 성공

---

## M1 — Portfolio (공개 포트폴리오 + 관리)

### 🎨 A. Prisma 스키마 (Portfolio 도메인)
- [ ] `PortfolioSettings` 모델 생성 (홈 구성, 링크)
- [ ] `Project` 모델 생성 (slug, title, visibility 등)
- [ ] `Experience` 모델 생성 (원본 데이터)
- [ ] `Skill` 모델 생성 (선택)
- [ ] 마이그레이션 실행 (`prisma migrate dev`)
- [ ] Seed 데이터 추가 (대표 프로젝트 3개)

### 🔌 B. Backend API (Portfolio)
- [ ] `/api/public/portfolio` — 공개 포트폴리오 홈 데이터
- [ ] `/api/public/projects` — 공개 프로젝트 목록 (visibility=PUBLIC)
- [ ] `/api/public/projects/[slug]` — 프로젝트 상세
- [ ] `/api/app/portfolio/settings` — PortfolioSettings CRUD
- [ ] `/api/app/projects` — Project CRUD (Private)
- [ ] `/api/app/experiences` — Experience CRUD
- [ ] ownerId scope 강제 (모든 Private API)
- [ ] DTO 강제 (Public API는 공개 필드만 반환)

### 🖼️ C. Frontend (Public Pages)
- [ ] `/` — 포트폴리오 홈 (대표 프로젝트, 소개, 연락)
- [ ] `/projects` — 프로젝트 목록 페이지
- [ ] `/projects/[slug]` — 프로젝트 상세 페이지 (Problem/Approach/Results)
- [ ] SEO 메타데이터 설정 (title, description, OG)
- [ ] `sitemap.xml` 생성
- [ ] `robots.txt` 설정
- [ ] 이미지 최적화 (Next.js Image 컴포넌트)

### 🛠️ D. Frontend (Private Admin)
- [ ] `/app` — 대시보드 홈
- [ ] `/app/portfolio/settings` — PortfolioSettings 편집
- [ ] `/app/projects` — Project 목록
- [ ] `/app/projects/new` — Project 생성
- [ ] `/app/projects/[id]/edit` — Project 편집
- [ ] `/app/experiences` — Experience 목록/편집
- [ ] 대표 프로젝트 설정 UI (isFeatured toggle)

### 🏎️ E. 성능 최적화 (ISR/캐시)
- [ ] Public 페이지에 ISR 적용 (`revalidate` 설정)
- [ ] (선택) on-demand revalidate (관리 저장 시 즉시 갱신)
- [ ] 이미지 lazy loading 확인
- [ ] Lighthouse 스코어 확인 (Performance 90+)

### ✅ M1 완료 기준
- [ ] 대표 프로젝트가 홈에 노출
- [ ] 프로젝트 상세 페이지가 템플릿대로 렌더링
- [ ] Public 데이터가 Private 데이터를 읽지 않음
- [ ] `/app/portfolio`에서 CRUD 완주 가능

---

## M2 — Resume (이력서 버전 관리)

### 🎨 A. Prisma 스키마 (Resume 도메인)
- [ ] `ResumeVersion` 모델 생성 (회사/직무, 제목)
- [ ] `ResumeItem` 모델 생성 (Experience 조합용, 선택지 B)
- [ ] `Experience`에 `metricsJson`, `techTags` 필드 추가
- [ ] 마이그레이션 실행
- [ ] Seed 데이터 추가 (샘플 Resume 1개)

### 🔌 B. Backend API (Resume)
- [ ] `/api/app/resumes` — Resume 목록/생성/수정/삭제
- [ ] `/api/app/resumes/[id]` — Resume 상세 (ResumeItem 포함)
- [ ] `/api/app/resumes/[id]/items` — ResumeItem CRUD
- [ ] `/api/app/resumes/[id]/preview` — HTML Preview 데이터
- [ ] Experience 선택/정렬 로직 구현
- [ ] Override 필드 저장 (ResumeItem.overrideText)

### 🖼️ C. Frontend (Resume Builder)
- [ ] `/app/resumes` — Resume 목록
- [ ] `/app/resumes/new` — Resume 생성 (회사/직무 입력)
- [ ] `/app/resumes/[id]/edit` — Experience 선택 UI
- [ ] Drag & Drop 정렬 UI (ResumeItem 순서)
- [ ] Override 편집 UI (원본 vs 수정본 비교)
- [ ] HTML Preview 화면 (인쇄 가능 스타일)

### 🔔 D. UX 개선 (동기화 알림)
- [ ] 원본 Experience 변경 시 배지 표시
- [ ] 동기화 알림 UI (선택)
- [ ] Diff 뷰 (원본 vs 현재, v1.5 고려)

### ✅ M2 완료 기준
- [ ] ResumeVersion 생성 → Experience 선택/정렬 → 프리뷰까지 완주
- [ ] 원본 Experience 변경이 자동으로 Resume에 섞이지 않음
- [ ] HTML Preview가 인쇄 가능한 수준

---

## M3 — Notes (지식노트 + 그래프)

### 🎨 A. Prisma 스키마 (Notes 도메인)
- [ ] `Notebook` 모델 생성 (분야별 그룹)
- [ ] `Note` 모델 생성 (제목, 본문, 태그, domain)
- [ ] `NoteEdge` 모델 생성 (fromId, toId, relationType, status)
- [ ] `NoteEmbedding` 모델 생성 (pgvector, 선택)
- [ ] Edge status enum (CANDIDATE, CONFIRMED, REJECTED)
- [ ] 마이그레이션 실행
- [ ] Seed 데이터 추가 (샘플 노트 10개)

### 🔌 B. Backend API (Notes)
- [ ] `/api/app/notes` — Note 목록/생성/수정/삭제
- [ ] `/api/app/notes/[id]` — Note 상세 (연관 개념 포함)
- [ ] `/api/app/notes/edges` — Edge 목록 (candidate 후보)
- [ ] `/api/app/notes/edges/confirm` — Edge 확정 (status → CONFIRMED)
- [ ] `/api/app/notes/edges/reject` — Edge 거절 (status → REJECTED, v1.5)
- [ ] `/api/app/notes/search` — 검색 (q, tag, domain 필터)

### 🤖 C. Candidate Generator (추천 엔진)
- [ ] 태그 기반 후보 생성 (v1)
- [ ] 유사도 Threshold 0.7 이상만 후보 표시
- [ ] Top-N 제한 (기본 10개, 최대 20개)
- [ ] Domain 필터링 (같은 domain 우선)
- [ ] (선택) pgvector 임베딩 생성 (v1.5)
- [ ] (선택) 유사도 계산 + candidate edge 갱신

### 🖼️ D. Frontend (Notes UI)
- [ ] `/app/notes` — Notebook 목록 + Note 목록
- [ ] `/app/notes/[id]` — Note 상세 (연관 개념 리스트)
- [ ] 연관 후보 표시 UI (CANDIDATE 상태)
- [ ] Confirm 버튼 (candidate → confirmed)
- [ ] Undo 버튼 (confirmed → candidate, 선택)
- [ ] 미니 그래프 시각화 (D3.js/React Flow, 선택)

### 📊 E. 그래프 탐색
- [ ] 연관 개념 리스트 (CONFIRMED만 표시)
- [ ] 연관 개념 클릭 시 해당 노트로 이동
- [ ] (선택) 그래프 뷰 (노드/엣지 시각화)

### ✅ M3 완료 기준
- [ ] 노트 작성 후 후보가 생성됨
- [ ] Confirmed된 엣지만 탐색에 반영됨
- [ ] 노트 100개에도 느려지지 않음 (인덱스 확인)

---

## M4 — Blog (작성 + Lint + Export)

### 🎨 A. Prisma 스키마 (Blog 도메인)
- [ ] `BlogPost` 모델 생성 (title, contentMd, status, lintResultJson)
- [ ] `BlogExternalPost` 모델 생성 (externalUrl, platform, 선택)
- [ ] status enum (DRAFT, PUBLISHED, ARCHIVED)
- [ ] 마이그레이션 실행
- [ ] Seed 데이터 추가 (샘플 블로그 글 3개)

### 🔌 B. Backend API (Blog)
- [ ] `/api/app/blog/posts` — BlogPost CRUD
- [ ] `/api/app/blog/posts/[id]` — 글 상세
- [ ] `/api/app/blog/posts/[id]/lint` — Lint 실행
- [ ] `/api/app/blog/posts/[id]/export` — Export 생성 (HTML/MD)
- [ ] `/api/app/blog/external` — 외부 URL/상태 관리

### 📝 C. Lint Engine (표현 검출)
- [ ] Lint 엔진 Core 구조 (Rule Interface)
- [ ] Rule 1: Long sentence (45자 이상)
- [ ] Rule 2: 반복 표현 과다 (n-gram)
- [ ] Rule 3: 모호 표현 밀도 ("같다", "느낌", "아마")
- [ ] Rule 4: 근거 없는 단정 (링크/인용 부재)
- [ ] Rule 5: 문단 과다 길이
- [ ] Rule 6: 단위/숫자 표기 불일치
- [ ] Rule 7: 코드블록만 있고 설명 부족
- [ ] Rule 8: 금칙어 리스트 (광고성/과장성)
- [ ] Rule 9: 제목-본문 불일치
- [ ] Rule 10: 맞춤법/띄어쓰기 (라이브러리 연동, v1.5)
- [ ] Lint 결과 저장 (`lintResultJson`)
- [ ] (선택) Ignore 사유 저장

### 📦 D. Export 기능
- [ ] HTML Export 생성 (템플릿 + 스타일)
- [ ] Markdown Export 생성 (원본 contentMd)
- [ ] ZIP 아카이브 생성 (HTML + MD + 이미지)
- [ ] S3/R2/Supabase Storage 업로드 (선택)
- [ ] Export URL 반환

### 🖼️ E. Frontend (Blog UI)
- [ ] `/app/blog` — 블로그 글 목록
- [ ] `/app/blog/new` — 글 작성 (Markdown 에디터)
- [ ] `/app/blog/[id]/edit` — 글 편집
- [ ] Lint 결과 표시 UI (severity, message, line)
- [ ] Lint 재실행 버튼
- [ ] Export 다운로드 버튼
- [ ] 외부 URL 등록 UI (externalUrl, platform)

### ✅ M4 완료 기준
- [ ] 글 작성 → Lint → 수정 → Export → externalUrl 등록까지 완주
- [ ] Lint 규칙 10개 이상 동작
- [ ] Export ZIP 다운로드 성공

---

## M5 — Feedback (피드백 실행/비교)

### 🎨 A. Prisma 스키마 (Feedback 도메인)
- [ ] `FeedbackRequest` 모델 생성 (targetType, targetId, context)
- [ ] `FeedbackItem` 모델 생성 (category, severity, message)
- [ ] targetType enum (PORTFOLIO, RESUME, NOTE, BLOG)
- [ ] 마이그레이션 실행

### 🔌 B. Backend API (Feedback)
- [ ] `/api/app/feedback` — FeedbackRequest 목록/생성
- [ ] `/api/app/feedback/[id]` — 피드백 상세 (FeedbackItem 포함)
- [ ] `/api/app/feedback/[id]/run` — 피드백 실행
- [ ] `/api/app/feedback/compare` — Run 비교 (diff)

### 🤖 C. Feedback 엔진
- [ ] Resume/Portfolio: 회사/직무 컨텍스트 기반 체크
- [ ] Note/Blog: 출처/단정 표현/상충 점검
- [ ] 피드백 결과 저장 (FeedbackItem)
- [ ] 템플릿 기반 점검 로직

### 🖼️ D. Frontend (Feedback UI)
- [ ] `/app/feedback` — 피드백 목록
- [ ] `/app/feedback/new` — 피드백 실행 (대상 선택)
- [ ] `/app/feedback/[id]` — 피드백 결과
- [ ] Run 비교 UI (이전 vs 현재 diff)

### ✅ M5 완료 기준
- [ ] Run 1회 이상 저장됨
- [ ] 이전 Run과 diff 뷰 가능

---

## 🔐 보안 체크리스트 (전체 마일스톤 공통)

### A. 인증/권한
- [ ] `/app/*` 경로는 비인증 차단 (Middleware)
- [ ] `/api/app/*` API는 세션 체크 + ownerId scope 강제
- [ ] Public API는 공개 필드만 select (DTO 강제)
- [ ] 세션 쿠키 설정 (HttpOnly, Secure, SameSite)

### B. 입력 검증
- [ ] slug/URL 길이 제한 (예: 100자)
- [ ] slug 허용 문자 검증 (영문/숫자/하이픈)
- [ ] JSON 크기 제한 (예: 1MB)
- [ ] XSS 방어 (React는 기본, 추가 sanitize 필요 시)

### C. 민감정보
- [ ] 환경변수에 시크릿 저장 (.env.local, Vercel)
- [ ] DB 비밀번호/API 키는 절대 커밋 금지
- [ ] (선택) BlogIntegration.credentialsJson 암호화 저장

### D. CSRF/CORS
- [ ] CSRF 토큰 (Auth.js 기본 제공)
- [ ] CORS 헤더 설정 (필요 시)

---

## 🧪 테스트 체크리스트 (전체 마일스톤 공통)

### A. Unit Tests
- [ ] Lint 규칙별 테스트 (각 rule의 detect 함수)
- [ ] NoteEdge 상태 전이 테스트 (candidate → confirmed)
- [ ] DTO select 테스트 (Public API가 Private 필드 노출 안 함)

### B. Integration Tests
- [ ] API Handler + Prisma (테스트 DB)
- [ ] 인증/권한 검증 (401/403 케이스)
- [ ] CRUD 흐름 (create → read → update → delete)

### C. E2E Smoke Tests
- [ ] Public: `/` → `/projects` → `/projects/[slug]`
- [ ] Private: login → create project → public 반영 확인
- [ ] Notes: create note → confirm edge → related list

---

## 📊 성능 체크리스트 (Public 페이지)

- [ ] Lighthouse 스코어: Performance 90+
- [ ] ISR 적용 확인 (revalidate 설정)
- [ ] 이미지 최적화 (Next.js Image, lazy loading)
- [ ] 불필요한 JavaScript 번들 제거
- [ ] Core Web Vitals 확인 (LCP, FID, CLS)

---

## 📚 문서화 체크리스트 (전체)

- [ ] README.md (프로젝트 소개, 설치/실행 방법)
- [ ] API 문서 (Swagger/OpenAPI 또는 Markdown)
- [ ] Prisma 스키마 주석 (각 모델/필드 설명)
- [ ] 환경변수 템플릿 (`.env.example`)
- [ ] 배포 가이드 (Vercel + DB 마이그레이션)
- [ ] 트러블슈팅 가이드 (자주 발생하는 이슈)

---

## 🚀 배포 체크리스트 (각 마일스톤)

### Preview 배포 (PR)
- [ ] PR 생성 시 Preview URL 자동 생성
- [ ] Preview 환경변수 설정 (DB, Auth)
- [ ] Public/Private 핵심 플로우 스모크 테스트

### Production 배포 (main)
- [ ] main 브랜치 머지 시 자동 배포
- [ ] `prisma migrate deploy` 실행 (배포 파이프라인)
- [ ] 배포 후 Health Check (Public 홈 접근 확인)
- [ ] 롤백 계획 (이전 배포로 복구 가능)

---

## 📈 DoD (Definition of Done) 통합 체크리스트

각 작업 완료 시 아래 항목 모두 확인:

- [ ] 기능 동작 + 예외 흐름 (401/403/404/409/422) 확인
- [ ] 타입/린트/빌드 통과
- [ ] Public 페이지 SEO/OG 깨짐 없음 (해당 범위)
- [ ] 최소 테스트 1개 이상 추가/갱신
- [ ] 관련 문서 갱신 (기능명세/스키마/API)
- [ ] PR 리뷰 2명 이상 Approve
- [ ] CI 통과 (lint, typecheck, test, build)

---

## 🎯 핵심 리스크 체크리스트

- [ ] **R1. Public/Private 데이터 누출**  
  → DTO select 강제 + API scope 강제 + 보안 테스트
- [ ] **R2. 외부 블로그 자동 게시 정책/제약**  
  → v1은 Export + URL 상태관리, Connector는 확장만
- [ ] **R3. 서버리스 DB 커넥션 폭증**  
  → pooled connection 사용 + 쿼리/인덱스 최적화
- [ ] **R4. 노트 추천 품질 (오탐/과연결)**  
  → 자동=후보만, 확정은 오너만 + Reject 옵션

---

**체크리스트 원칙**  
> "완료는 배포 가능한 상태를 의미한다. 문서와 코드는 항상 동기화된다."

