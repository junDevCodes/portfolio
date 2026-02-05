# 김민준 (Team Lead) - 개인 작업 문서

## 👤 담당자 정보
- **이름**: 김민준
- **역할**: 시니어 팀장 (Senior Team Lead)
- **주요 책임**: 아키텍처 설계, 기술 의사결정, 인증/보안, 코드 리뷰

---

## 📦 개발 단위 1: M0 - Foundation

### 해야 할 Task

#### Task 1: 프로젝트 아키텍처 설계 및 기술 스택 확정
**예상 소요**: 1일  
**의존성**: 없음

#### Task 2: Next.js 프로젝트 초기화 및 설정
**예상 소요**: 0.5일  
**의존성**: Task 1

#### Task 3: Auth.js 인증 시스템 구현
**예상 소요**: 1일  
**의존성**: 박지훈(Prisma User 모델)

#### Task 4: Middleware 라우트 보호 구현
**예상 소요**: 0.5일  
**의존성**: Task 3

---

### Task별 체크리스트

#### ✅ Task 1 체크리스트: 아키텍처 설계
- [ ] 전체 시스템 아키텍처 다이어그램 작성
- [ ] Public/Private 경계 설계 문서 작성
- [ ] 기술 스택 최종 확정 (Next.js, Auth.js, Prisma, PostgreSQL)
- [ ] 폴더 구조 설계 (`/app`, `/lib`, `/components`, `/prisma`)
- [ ] Route Groups 구조 설계 (`(public)`, `(private)`)
- [ ] API 네이밍 컨벤션 정의 (`/api/public/*`, `/api/app/*`)
- [ ] 환경변수 구조 설계
- [ ] 팀원과 아키텍처 리뷰 미팅 (1시간)
- [ ] 아키텍처 문서 `docs/architecture.md` 작성 완료
- [ ] 팀 전체 아키텍처 승인

#### ✅ Task 2 체크리스트: Next.js 초기화
- [ ] `npx create-next-app@latest` 실행
- [ ] TypeScript 설정 (`tsconfig.json` strict mode)
- [ ] ESLint 설정 (`.eslintrc.json`)
- [ ] Prettier 설정 (`.prettierrc`)
- [ ] `.gitignore` 설정
- [ ] `package.json` scripts 정리
- [ ] `npm install` 의존성 설치
- [ ] `npm run dev` 정상 실행 확인
- [ ] GitHub 저장소 생성 및 첫 커밋
- [ ] README.md 초기 작성

#### ✅ Task 3 체크리스트: Auth.js 구현
- [ ] `next-auth` 패키지 설치
- [ ] `@auth/prisma-adapter` 설치
- [ ] `/api/auth/[...nextauth]/route.ts` 작성
- [ ] Auth.js 기본 설정 (providers, adapter)
- [ ] 오너 전용 정책 구현 (`User.isOwner` 체크)
- [ ] 세션 전략 설정 (JWT or Database)
- [ ] 세션 쿠키 보안 설정 (HttpOnly, Secure, SameSite)
- [ ] 로그인 페이지 UI 작성 (`/auth/signin`)
- [ ] 로그아웃 기능 구현
- [ ] 로그인/로그아웃 테스트 (수동)
- [ ] 박지훈(Backend)과 User 스키마 조율

#### ✅ Task 4 체크리스트: Middleware 보호
- [ ] `middleware.ts` 파일 작성
- [ ] `/app/*` 경로 보호 로직 구현
- [ ] Public 경로 예외 처리 (`/`, `/projects`, `/api/public/*`)
- [ ] 비인증 접근 시 `/auth/signin`으로 리다이렉트
- [ ] Middleware matcher 설정
- [ ] 세션 체크 로직 구현
- [ ] Middleware 테스트 (비인증 차단 확인)
- [ ] 로그인 후 `/app` 접근 성공 확인
- [ ] Edge Runtime 호환성 확인

---

### M0 전체 체크리스트

#### 완료 기준
- [ ] 아키텍처 문서 작성 완료 및 팀 승인
- [ ] Next.js 프로젝트 정상 실행 (`npm run dev`)
- [ ] Auth.js 로그인/로그아웃 동작 확인
- [ ] Middleware 보호 동작 확인 (비인증 차단)
- [ ] 모든 Task PR 머지 완료
- [ ] 강민서(QA) M0 테스트 통과

#### 협업 포인트
- [ ] 박지훈(Backend): User 스키마 조율
- [ ] 정하은(DevOps): 환경변수 공유
- [ ] 이서현(Frontend): Route Groups 구조 공유

---

## 📦 개발 단위 2: M1 - Portfolio

### 해야 할 Task

#### Task 1: 코드 리뷰 및 아키텍처 가이드
**예상 소요**: 상시 (주 2-3시간)  
**의존성**: 모든 팀원 작업

#### Task 2: Public/Private 경계 검증
**예상 소요**: 0.5일  
**의존성**: 박지훈(DTO 검증), 강민서(Public API 테스트)

---

### Task별 체크리스트

#### ✅ Task 1 체크리스트: 코드 리뷰
- [ ] 박지훈 PR 리뷰 (Portfolio API)
  - [ ] API 스펙 문서 일치 확인
  - [ ] ownerId scope 강제 확인
  - [ ] 에러 처리 일관성 확인
  - [ ] 24시간 내 1차 피드백
- [ ] 이서현 PR 리뷰 (Portfolio UI)
  - [ ] Public 페이지 SEO 확인
  - [ ] Admin UI UX 확인
  - [ ] ISR 설정 확인
  - [ ] 24시간 내 1차 피드백
- [ ] 아키텍처 가이드 제공
  - [ ] API 설계 패턴 안내
  - [ ] 컴포넌트 구조 안내
  - [ ] 보안 Best Practice 안내

#### ✅ Task 2 체크리스트: 보안 검증
- [ ] Public API Private 필드 노출 여부 확인
  - [ ] `/api/public/portfolio` 응답 검증
  - [ ] `/api/public/projects` 응답 검증
  - [ ] `/api/public/projects/[slug]` 응답 검증
- [ ] visibility=PRIVATE 프로젝트 노출 안 함 확인
- [ ] Public 페이지에서 Private 데이터 접근 시도 → 차단 확인
- [ ] 캐시 헤더에 민감 정보 없음 확인
- [ ] 보안 검증 리포트 작성
- [ ] 보안 이슈 0건 확인

---

### M1 전체 체크리스트

#### 완료 기준
- [ ] 모든 팀원 PR 리뷰 완료
- [ ] Public/Private 경계 검증 완료
- [ ] 보안 이슈 0건
- [ ] 강민서(QA) M1 테스트 통과

#### 협업 포인트
- [ ] 박지훈(Backend): DTO 검증 협의
- [ ] 강민서(QA): 보안 테스트 결과 공유

---

## 🎯 전체 프로젝트 체크리스트

### 프로젝트 완료 기준
- [ ] M0 Foundation 완료
- [ ] M1 Portfolio 완료
- [ ] M2 Resume 완료 (리뷰 참여)
- [ ] M3 Notes 완료 (리뷰 참여)
- [ ] M4 Blog 완료 (리뷰 참여)
- [ ] M5 Feedback 완료 (리뷰 참여)

### 팀장 최종 검증
- [ ] 전체 아키텍처 일관성 확인
- [ ] Public/Private 경계 최종 검증
- [ ] 인증/권한 시스템 최종 검증
- [ ] 성능 최적화 검증 (Lighthouse 90+)
- [ ] 보안 검증 (모든 마일스톤)
- [ ] 코드 품질 검증 (린트/타입 에러 0건)
- [ ] 문서 동기화 확인 (코드 ↔ 문서)
- [ ] 배포 안정성 확인 (Preview/Production)

### 릴리즈 승인
- [ ] 모든 DoD 충족 확인
- [ ] 전체 팀원 작업 완료 확인
- [ ] QA 최종 테스트 통과
- [ ] Production 배포 승인

---

**작업 원칙**
> "아키텍처는 명확하게, 리뷰는 신속하게, 보안은 타협 없이"

