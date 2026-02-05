# 박지훈 (Backend Developer) - 개인 작업 문서

## 👤 담당자 정보
- **이름**: 박지훈
- **역할**: 미드레벨 Backend Developer
- **주요 책임**: API 설계/구현, Prisma 스키마, DB 최적화, 데이터 보안

---

## 📦 개발 단위 1: M0 - Foundation

### 해야 할 Task

#### Task 1: Prisma 스키마 초기 설계 및 마이그레이션
**예상 소요**: 1일  
**의존성**: 정하은(DB 연결)

#### Task 2: Prisma 클라이언트 설정 및 커넥션 풀링
**예상 소요**: 0.5일  
**의존성**: Task 1

#### Task 3: Seed 스크립트 작성
**예상 소요**: 0.5일  
**의존성**: Task 1

#### Task 4: API 공통 인증 가드 구현
**예상 소요**: 0.5일  
**의존성**: 김민준(Auth.js)

---

### Task별 체크리스트

#### ✅ Task 1: Prisma 스키마
- [x] `prisma/schema.prisma` 파일 생성
- [x] User 모델 작성 (id, email, name, isOwner)
- [x] Account 모델 작성 (Auth.js용)
- [x] Session 모델 작성 (Auth.js용)
- [x] VerificationToken 모델 작성
- [x] 관계 설정 (User ↔ Account, Session)
- [x] 인덱스 설정 (email unique, session token)
- [ ] `npx prisma migrate dev --name init` 실행
- [ ] 마이그레이션 파일 확인
- [ ] 김민준(TL)과 스키마 리뷰

#### ✅ Task 2: Prisma 클라이언트
- [x] `lib/prisma.ts` 파일 생성
- [x] PrismaClient 싱글톤 패턴 구현
- [x] 서버리스 커넥션 풀링 설정
- [x] 개발/프로덕션 환경 분리
- [x] 쿼리 로깅 설정 (개발 환경)
- [ ] `npx prisma generate` 실행
- [ ] 테스트 쿼리 실행 (User.findMany())
- [ ] 정하은(DevOps)과 DB 연결 확인

#### ✅ Task 3: Seed 스크립트
- [x] `prisma/seed.ts` 파일 생성
- [x] 오너 User 1명 생성 로직
- [x] `package.json`에 seed 스크립트 추가
- [ ] `npm run seed` 실행
- [ ] DB에서 오너 계정 확인
- [ ] Seed 데이터 문서화

#### ✅ Task 4: API 가드
- [x] `lib/auth-guard.ts` 파일 생성
- [x] `getServerSession` 유틸 함수 작성
- [x] `requireAuth` 미들웨어 함수 작성
- [x] `requireOwner` 미들웨어 함수 작성
- [x] 401/403 에러 응답 표준화
- [x] 테스트 API 엔드포인트 작성
- [ ] 비인증 호출 → 401 확인
- [ ] 비오너 호출 → 403 확인

---

### M0 전체 체크리스트
- [ ] 모든 Task 완료
- [ ] Prisma 마이그레이션 성공
- [ ] Seed 데이터 생성 성공
- [ ] API 가드 동작 확인
- [ ] 강민서(QA) 테스트 통과

---

## 📦 개발 단위 2: M1 - Portfolio

### 해야 할 Task

#### Task 1: Portfolio 도메인 Prisma 스키마 작성
**예상 소요**: 1일

#### Task 2: Public API 구현
**예상 소요**: 1.5일

#### Task 3: Private Portfolio Admin API 구현
**예상 소요**: 2일

#### Task 4: Public API DTO 검증
**예상 소요**: 0.5일

#### Task 5: Seed 데이터 확장
**예상 소요**: 0.5일

---

### Task별 체크리스트

#### ✅ Task 1: Portfolio 스키마
- [ ] PortfolioSettings 모델 작성
- [ ] Project 모델 작성 (slug unique, visibility)
- [ ] Experience 모델 작성
- [ ] Skill 모델 작성 (선택)
- [ ] 관계 설정 (Project ↔ Experience)
- [ ] 인덱스 설정 (slug, ownerId, visibility)
- [ ] 마이그레이션 실행
- [ ] 스키마 문서화

#### ✅ Task 2: Public API
- [ ] `/api/public/portfolio` 엔드포인트
  - [ ] PortfolioSettings 조회
  - [ ] 대표 프로젝트 조회 (isFeatured)
  - [ ] DTO select (공개 필드만)
- [ ] `/api/public/projects` 엔드포인트
  - [ ] visibility=PUBLIC 필터
  - [ ] 페이지네이션 (선택)
  - [ ] DTO select
- [ ] `/api/public/projects/[slug]` 엔드포인트
  - [ ] slug로 조회
  - [ ] visibility 확인
  - [ ] DTO select
- [ ] 이서현(FE)과 API 스펙 조율
- [ ] Postman 테스트

#### ✅ Task 3: Private API
- [ ] `/api/app/portfolio/settings` (GET/PUT)
  - [ ] 인증 가드
  - [ ] ownerId scope
  - [ ] CRUD 로직
- [ ] `/api/app/projects` (GET/POST)
  - [ ] 목록 조회
  - [ ] 프로젝트 생성
  - [ ] slug 중복 체크
- [ ] `/api/app/projects/[id]` (GET/PUT/DELETE)
  - [ ] 상세 조회
  - [ ] 수정
  - [ ] 삭제
- [ ] `/api/app/experiences` (GET/POST/PUT/DELETE)
  - [ ] CRUD 전체 구현
- [ ] 에러 처리 (401/403/404/409/422)
- [ ] API 테스트

#### ✅ Task 4: DTO 검증
- [ ] Public API 응답 필드 검증
- [ ] Private 필드 노출 여부 체크
- [ ] 검증 스크립트 작성
- [ ] 김민준(TL)과 보안 리뷰

#### ✅ Task 5: Seed 확장
- [ ] 대표 프로젝트 3개 샘플 작성
- [ ] Experience 5개 샘플 작성
- [ ] Seed 실행 및 확인

---

### M1 전체 체크리스트
- [ ] Portfolio 스키마 마이그레이션 성공
- [ ] Public API 3개 엔드포인트 동작
- [ ] Private API 전체 CRUD 동작
- [ ] DTO 검증 통과 (Private 필드 노출 0건)
- [ ] 강민서(QA) API 테스트 통과

---

## 📦 개발 단위 3: M2 - Resume

### 해야 할 Task
#### Task 1: Resume 스키마 (1일)
#### Task 2: Resume API (1.5일)

### Task별 체크리스트

#### ✅ Task 1: Resume 스키마
- [ ] ResumeVersion 모델
- [ ] ResumeItem 모델
- [ ] Experience 필드 확장 (metricsJson, techTags)
- [ ] 마이그레이션

#### ✅ Task 2: Resume API
- [ ] `/api/app/resumes` CRUD
- [ ] `/api/app/resumes/[id]/items` CRUD
- [ ] `/api/app/resumes/[id]/preview` 데이터

---

## 📦 개발 단위 4: M3 - Notes

### 해야 할 Task
#### Task 1: Notes 스키마 (1일)
#### Task 2: Notes API (1.5일)
#### Task 3: NoteEdge API (1일)

### Task별 체크리스트

#### ✅ Task 1: Notes 스키마
- [ ] Notebook 모델
- [ ] Note 모델
- [ ] NoteEdge 모델 (status: CANDIDATE/CONFIRMED)
- [ ] NoteEmbedding 모델 (선택)

#### ✅ Task 2: Notes API
- [ ] `/api/app/notes` CRUD
- [ ] `/api/app/notes/search` 검색/필터

#### ✅ Task 3: Edge API
- [ ] `/api/app/notes/edges` 후보 목록
- [ ] `/api/app/notes/edges/confirm` 확정
- [ ] `/api/app/notes/edges/reject` 거절

---

## 📦 개발 단위 5: M4 - Blog

### 해야 할 Task
#### Task 1: Blog 스키마 (0.5일)
#### Task 2: Blog API (1.5일)
#### Task 3: Lint 엔진 (2일)
#### Task 4: Export 기능 (1일)

### Task별 체크리스트

#### ✅ Task 3: Lint 엔진
- [ ] Rule Interface 정의
- [ ] 10개 Lint 규칙 구현
- [ ] Lint Pipeline 구현

---

## 📦 개발 단위 6: M5 - Feedback

### 해야 할 Task
#### Task 1: Feedback 스키마 (0.5일)
#### Task 2: Feedback API (1.5일)

---

## 🎯 전체 프로젝트 체크리스트

### Backend 완료 기준
- [ ] M0-M5 모든 스키마 마이그레이션 성공
- [ ] 모든 API 엔드포인트 구현 완료
- [ ] API 문서 작성 완료
- [ ] 인증/권한 100% 적용
- [ ] DTO 검증 통과 (모든 Public API)
- [ ] N+1 쿼리 0건
- [ ] 인덱스 최적화 완료
- [ ] 에러 처리 일관성 확보
- [ ] 강민서(QA) 통합 테스트 통과

---

**작업 원칙**
> "API는 명확하게, 쿼리는 효율적으로, 보안은 타협 없이"
