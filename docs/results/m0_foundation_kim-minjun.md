# M0 Foundation 결과 — 김민준 (TL)
작성일: 2026-02-04

## 변경사항 요약
- 아키텍처 문서 신규 작성: `docs/architecture.md`
- 환경변수 템플릿/포맷팅 설정 추가: `.env.example`, `.prettierrc`, `.prettierignore`
- Auth.js 기본 골격 구성: `src/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/types/next-auth.d.ts`
- Middleware 보호 로직 추가: `middleware.ts`
- Public/Private 라우팅 스캐폴딩: `/app`, `/projects`, `/projects/[slug]` 플레이스홀더
- Owner 대시보드/Sign-in UI 추가: `src/app/(private)/app/page.tsx`, `src/app/(public)/auth/signin/page.tsx`
- README 갱신: 프로젝트 스택/실행 방법/라우팅 구조 반영
- 정하은(DevOps) 답신 반영: `.env.example` 템플릿 확인 및 OWNER_EMAIL 지정

---

## 정하은(DevOps) 답신 요약
- 로컬용 `.env.local` 생성 완료 및 필수 환경변수 포함
- Production/Preview 환경변수 키 구조 동일 유지 가이드 제공
- AUTH_SECRET 생성 가이드(Windows/Linux) 공유
- GitHub OAuth 설정 절차 및 콜백 URL 안내
- `.env.example`는 템플릿 용도로 유지(실제 값 제외)

---

## Task 1 — 아키텍처 설계
- [x] 전체 시스템 아키텍처 다이어그램 작성 (Mermaid) — `docs/architecture.md`
- [x] Public/Private 경계 설계 문서 작성
- [x] 기술 스택 확정 (Next.js, Auth.js, Prisma, PostgreSQL)
- [x] 폴더 구조 설계 (`/app`, `/lib`, `/components`, `/prisma`)
- [x] Route Groups 구조 설계 (`(public)`, `(private)`)
- [x] API 네이밍 컨벤션 정의 (`/api/public/*`, `/api/app/*`)
- [x] 환경변수 구조 설계 (`.env.example`)
- [ ] 팀원과 아키텍처 리뷰 미팅 (1시간) — 일정 필요
- [x] 아키텍처 문서 `docs/architecture.md` 작성 완료
- [ ] 팀 전체 아키텍처 승인 — 리뷰 후 승인 필요

## Task 2 — Next.js 초기화
- [x] `npx create-next-app@latest` 실행 (기존 프로젝트에서 확인)
- [x] TypeScript strict mode (`tsconfig.json`)
- [x] ESLint 설정 (`eslint.config.mjs` 기반)
- [x] Prettier 설정 (`.prettierrc`, `format` 스크립트 추가)
- [x] `.gitignore` 설정 (기존 파일 유지)
- [x] `package.json` scripts 정리 (`lint`, `format`)
- [x] `npm install` 의존성 설치
- [ ] `npm run dev` 정상 실행 확인 — 실행 필요
- [ ] GitHub 저장소 생성 및 첫 커밋 — 외부 작업 필요
- [x] README.md 초기 작성 — Next.js 기반으로 갱신

## Task 3 — Auth.js 구현
- [x] `next-auth` 패키지 설치
- [x] `@auth/prisma-adapter` 설치
- [x] `/api/auth/[...nextauth]/route.ts` 작성
- [x] Auth.js 기본 설정 (providers, adapter)
- [x] 오너 전용 정책 구현 (`User.isOwner` + OWNER_EMAIL allowlist)
- [x] 세션 전략 설정 (JWT)
- [x] 세션 쿠키 보안 설정 (HttpOnly, Secure, SameSite)
- [x] 로그인 페이지 UI 작성 (`/auth/signin`)
- [x] 로그아웃 기능 구현 (`SignOutButton`)
- [ ] 로그인/로그아웃 테스트 (수동) — 환경변수/DB 준비 후 필요
- [ ] 박지훈(Backend)과 User 스키마 조율 — 의존 작업

## Task 4 — Middleware 보호
- [x] `middleware.ts` 파일 작성
- [x] `/app/*` 경로 보호 로직 구현
- [x] Public 경로 예외 처리 (`/`, `/projects`, `/api/public/*`, `/auth/*`)
- [x] 비인증 접근 시 `/auth/signin` 리다이렉트
- [x] Middleware matcher 설정
- [x] 세션 체크 로직 구현 (`withAuth` token)
- [ ] Middleware 테스트 (비인증 차단 확인) — 실행 필요
- [ ] 로그인 후 `/app` 접근 성공 확인 — 실행 필요
- [x] Edge Runtime 호환성 고려 (JWT + Prisma 미사용)

---

## M0 완료 기준 상태
- [ ] 아키텍처 문서 작성 완료 및 팀 승인 (작성 완료, 승인 대기)
- [ ] Next.js 프로젝트 정상 실행 (`npm run dev`)
- [ ] Auth.js 로그인/로그아웃 동작 확인
- [ ] Middleware 보호 동작 확인 (비인증 차단)
- [ ] 모든 Task PR 머지 완료
- [ ] 강민서(QA) M0 테스트 통과

---

## 의존/리스크 및 후속 액션
- **Prisma 스키마/마이그레이션**: 박지훈(BE) 작업 완료 후 Auth.js 전 구간 검증 필요
- **환경변수 공유**: 템플릿/가이드 준비 완료, `AUTH_SECRET` 생성 및 Vercel 환경변수 반영 필요
- **Owner 계정 부트스트랩**: `User.isOwner=true` seed 또는 `OWNER_EMAIL` 기준 합의
- **실행 검증**: `npm run dev` 후 로그인/미들웨어 흐름 확인
