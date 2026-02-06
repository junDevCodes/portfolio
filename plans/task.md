# PoReSt 작업 현황

## 현재 마일스톤: M1 - Portfolio

---

## M0 - Foundation ✅ 완료

### 프로젝트 구조
- [x] Next.js App Router 생성
- [x] TypeScript strict mode 설정
- [x] ESLint + Prettier 설정
- [x] Route Groups (`(public)`, `(private)`)
- [x] `.env.example` 작성

### 인증/권한
- [x] Auth.js 설치 및 설정
- [x] Prisma Adapter 연결
- [x] 오너 전용 정책 (`isOwner`)
- [x] 로그인/로그아웃 페이지
- [x] 세션 쿠키 보안 설정

### 라우트 보호
- [x] Middleware 작성
- [x] `/app/*` 경로 보호
- [x] Public 경로 예외 처리
- [x] 비인증 리다이렉트

### Database
- [x] Prisma 스키마 (User, Account, Session)
- [x] PostgreSQL 연결 (Neon)
- [x] Pooled connection 설정
- [x] 초기 마이그레이션
- [x] Seed 스크립트
- [x] `lib/prisma.ts` 싱글톤

### API 가드
- [x] `lib/auth-guard.ts` 생성
- [x] `requireAuth` 함수
- [x] `requireOwner` 함수

### 배포
- [x] Vercel 프로젝트 생성
- [x] 환경변수 설정
- [x] Preview/Production 배포
- [x] `prisma migrate deploy` 자동화

### 더미 페이지
- [x] Public 레이아웃 + 홈
- [x] Private 레이아웃 + 대시보드

---

## M1 - Portfolio 🔄 진행 중

### 선행 작업
- [ ] 문서 정합성 확정 (docs/plan/*, 06/07/08/09, 00_README)

### Prisma 스키마
- [ ] PortfolioSettings 모델
  - [ ] publicSlug, displayName, headline, bio, avatarUrl
  - [ ] isPublic, layoutJson
  - [ ] links (PortfolioLink: label, url, order)
- [ ] Project 모델
  - [ ] slug (unique), title, subtitle, description, contentMd
  - [ ] techStack, repoUrl, demoUrl, thumbnailUrl
  - [ ] visibility (PUBLIC/UNLISTED/PRIVATE)
  - [ ] isFeatured, order
- [ ] Experience 모델
  - [ ] visibility (PUBLIC/UNLISTED/PRIVATE)
  - [ ] company, role, startDate, endDate, isCurrent
  - [ ] summary, bulletsJson, metricsJson, techTags
  - [ ] isFeatured, order
- [ ] 관계 및 인덱스 설정
- [ ] 마이그레이션 실행

### 테스트
- [ ] slug unique 충돌 시 409
- [ ] visibility=PUBLIC만 Public API 노출
- [ ] isFeatured=true는 visibility=PUBLIC 조건
- [ ] slug 미존재 시 404
- [ ] ownerId scope 미일치 시 403

### Public API
- [ ] `GET /api/public/portfolio`
  - [ ] PortfolioSettings 조회
  - [ ] 대표 프로젝트 (visibility=PUBLIC + isFeatured=true)
  - [ ] 대표 경험 (visibility=PUBLIC + isFeatured=true)
  - [ ] DTO select (공개 필드만)
- [ ] `GET /api/public/projects`
  - [ ] visibility=PUBLIC 필터
  - [ ] 페이지네이션 (선택)
- [ ] `GET /api/public/projects/[slug]`
  - [ ] slug로 조회
  - [ ] 404 처리

### Private API
- [ ] `GET /api/app/portfolio/settings`
- [ ] `PUT /api/app/portfolio/settings`
- [ ] `GET /api/app/projects`
- [ ] `POST /api/app/projects`
  - [ ] slug 중복 체크
  - [ ] slug 자동 생성
- [ ] `GET /api/app/projects/[id]`
- [ ] `PUT /api/app/projects/[id]`
- [ ] `DELETE /api/app/projects/[id]`
- [ ] `GET /api/app/experiences`
- [ ] `POST /api/app/experiences`
- [ ] `PUT /api/app/experiences/[id]`
- [ ] `DELETE /api/app/experiences/[id]`
- [ ] ownerId scope 강제
- [ ] 에러 처리 (401/403/404/409/422)

### Public 페이지
- [ ] `/` 홈 페이지
  - [ ] Hero 섹션 (소개, 프로필)
  - [ ] 대표 프로젝트 카드 3개
  - [ ] 연락처/소셜 섹션
- [ ] `/projects` 목록 페이지
  - [ ] 프로젝트 그리드 레이아웃
  - [ ] 필터링 UI (선택)
- [ ] `/projects/[slug]` 상세 페이지
  - [ ] Problem 섹션
  - [ ] Approach 섹션
  - [ ] Results 섹션
  - [ ] GitHub/Demo 링크
- [ ] 반응형 디자인
- [ ] 이미지 최적화 (Next.js Image)

### SEO
- [ ] 각 페이지 metadata export
- [ ] OG 이미지 설정
- [ ] sitemap.xml 생성
- [ ] robots.txt 설정

### Admin UI
- [ ] `/app/portfolio/settings`
  - [ ] 프로필 편집 폼
  - [ ] 소셜 링크 편집
- [ ] `/app/projects` 목록
  - [ ] 테이블/카드 뷰
  - [ ] 정렬, 필터
- [ ] `/app/projects/new`
  - [ ] Markdown 에디터
  - [ ] 이미지 업로드 (선택)
  - [ ] 태그 입력
  - [ ] visibility 토글
- [ ] `/app/projects/[id]/edit`
- [ ] `/app/experiences` CRUD UI
- [ ] 대표 프로젝트 토글 (isFeatured)
- [ ] 폼 검증 (Zod + React Hook Form)

### 성능
- [ ] ISR 적용 (`revalidate`)
- [ ] Lighthouse 90+

### Seed 확장
- [ ] 대표 프로젝트 3개 샘플
- [ ] Experience 5개 샘플
- [ ] PortfolioSettings 샘플

---

## M2 - Resume 📋 예정

### Prisma 스키마
- [ ] ResumeVersion 모델
  - [ ] company, jobTitle, title
  - [ ] createdAt, updatedAt
- [ ] ResumeItem 모델
  - [ ] experienceId, order
  - [ ] overrideText (원본 수정)
- [ ] Experience 확장
  - [ ] metricsJson (정량 지표)
  - [ ] techTags 배열
- [ ] 마이그레이션 실행

### API
- [ ] `GET /api/app/resumes`
- [ ] `POST /api/app/resumes`
- [ ] `GET /api/app/resumes/[id]`
- [ ] `PUT /api/app/resumes/[id]`
- [ ] `DELETE /api/app/resumes/[id]`
- [ ] `GET /api/app/resumes/[id]/items`
- [ ] `POST /api/app/resumes/[id]/items`
- [ ] `PUT /api/app/resumes/[id]/items/[itemId]`
- [ ] `DELETE /api/app/resumes/[id]/items/[itemId]`
- [ ] `GET /api/app/resumes/[id]/preview`

### UI
- [ ] `/app/resumes` 목록
  - [ ] 이력서 버전 카드
  - [ ] 생성/편집/삭제 버튼
- [ ] `/app/resumes/new`
  - [ ] 회사명, 직무 입력
  - [ ] 제목 입력
- [ ] `/app/resumes/[id]/edit`
  - [ ] Experience 선택 체크박스
  - [ ] Drag & Drop 순서 정렬
  - [ ] Override 텍스트 편집
  - [ ] 원본 vs 수정본 비교
- [ ] HTML Preview
  - [ ] 인쇄 가능 스타일
  - [ ] PDF 다운로드 (선택)

### 동기화
- [ ] 원본 Experience 변경 시 배지 표시
- [ ] 동기화 알림 UI (선택)

---

## M3 - Notes 📋 예정

### Prisma 스키마
- [ ] Notebook 모델
  - [ ] name, description
  - [ ] ownerId
- [ ] Note 모델
  - [ ] title, contentMd (Markdown)
  - [ ] tags (배열), domain
  - [ ] notebookId
- [ ] NoteEdge 모델
  - [ ] fromId, toId
  - [ ] relationType
  - [ ] status (CANDIDATE/CONFIRMED/REJECTED)
  - [ ] similarity (float)
- [ ] NoteEmbedding 모델 (선택)
  - [ ] noteId, embedding (vector)
- [ ] 마이그레이션 실행

### API
- [ ] `GET /api/app/notes`
- [ ] `POST /api/app/notes`
- [ ] `GET /api/app/notes/[id]`
- [ ] `PUT /api/app/notes/[id]`
- [ ] `DELETE /api/app/notes/[id]`
- [ ] `GET /api/app/notes/search`
  - [ ] q (검색어), tag, domain 필터
- [ ] `GET /api/app/notes/edges`
  - [ ] CANDIDATE 상태만 조회
- [ ] `POST /api/app/notes/edges/confirm`
  - [ ] status → CONFIRMED
- [ ] `POST /api/app/notes/edges/reject`
  - [ ] status → REJECTED

### Candidate Generator
- [ ] `lib/notes/candidate-generator.ts`
- [ ] 태그 매칭 알고리즘
  - [ ] 공통 태그 개수 계산
  - [ ] Jaccard 유사도 계산
- [ ] Threshold 0.7 적용
- [ ] Top-N 제한 (10~20개)
- [ ] 중복 후보 제거
- [ ] 자기 자신 제외
- [ ] Domain 필터링
  - [ ] 같은 domain 우선순위
  - [ ] 가중치 로직
- [ ] 성능 최적화 (인덱스 활용)

### pgvector 파이프라인 (선택)
- [ ] Embedding 모델 선정
- [ ] `lib/notes/embedding.ts`
- [ ] Note 저장 시 임베딩 생성
- [ ] 코사인 유사도 계산
- [ ] HNSW 인덱스 생성

### UI
- [ ] `/app/notes`
  - [ ] Notebook 목록
  - [ ] Note 목록 (선택된 Notebook)
- [ ] `/app/notes/[id]`
  - [ ] 노트 상세 뷰
  - [ ] 연관 개념 리스트 (CONFIRMED)
  - [ ] 연관 후보 표시 (CANDIDATE)
  - [ ] Confirm/Reject 버튼
- [ ] 그래프 시각화 (선택)
  - [ ] D3.js 또는 React Flow
  - [ ] 노드/엣지 시각화

---

## M4 - Blog 📋 예정

### Prisma 스키마
- [ ] BlogPost 모델
  - [ ] title, contentMd
  - [ ] status (DRAFT/PUBLISHED/ARCHIVED)
  - [ ] lintResultJson
  - [ ] publishedAt
- [ ] BlogExternalPost 모델 (선택)
  - [ ] externalUrl, platform
  - [ ] syncStatus
- [ ] 마이그레이션 실행

### API
- [ ] `GET /api/app/blog/posts`
- [ ] `POST /api/app/blog/posts`
- [ ] `GET /api/app/blog/posts/[id]`
- [ ] `PUT /api/app/blog/posts/[id]`
- [ ] `DELETE /api/app/blog/posts/[id]`
- [ ] `POST /api/app/blog/posts/[id]/lint`
  - [ ] Lint 실행
  - [ ] lintResultJson 저장
- [ ] `GET /api/app/blog/posts/[id]/export`
  - [ ] HTML/MD Export
  - [ ] ZIP 아카이브
- [ ] `CRUD /api/app/blog/external` (선택)

### Lint 엔진
- [ ] Rule Interface 정의
- [ ] Rule 구현
  - [ ] Rule 1: Long sentence (45자 이상)
  - [ ] Rule 2: 반복 표현 (n-gram)
  - [ ] Rule 3: 모호 표현 ("같다", "느낌")
  - [ ] Rule 4: 근거 없는 단정
  - [ ] Rule 5: 문단 과다 길이
  - [ ] Rule 6: 단위/숫자 불일치
  - [ ] Rule 7: 코드블록만 있고 설명 부족
  - [ ] Rule 8: 금칙어 리스트
  - [ ] Rule 9: 제목-본문 불일치
  - [ ] Rule 10: 맞춤법 (선택)
- [ ] Lint Pipeline 구현
- [ ] Ignore 사유 저장 (선택)

### Export 기능
- [ ] HTML Export
  - [ ] 템플릿 적용
  - [ ] 스타일 포함
- [ ] Markdown Export
- [ ] ZIP 아카이브
  - [ ] HTML + MD + 이미지
- [ ] Export URL 반환

### UI
- [ ] `/app/blog`
  - [ ] 글 목록 (status별 필터)
  - [ ] 생성/편집/삭제 버튼
- [ ] `/app/blog/new`
  - [ ] Markdown 에디터
  - [ ] 실시간 프리뷰
- [ ] `/app/blog/[id]/edit`
  - [ ] 편집 폼
  - [ ] Lint 결과 표시
    - [ ] severity 색상 구분
    - [ ] message, line 표시
  - [ ] Lint 재실행 버튼
- [ ] Export 다운로드 버튼
- [ ] 외부 URL 등록 UI (선택)

---

## M5 - Feedback 📋 예정

### Prisma 스키마
- [ ] FeedbackRequest 모델
  - [ ] targetType (PORTFOLIO/RESUME/NOTE/BLOG)
  - [ ] targetId
  - [ ] context (JSON)
  - [ ] createdAt
- [ ] FeedbackItem 모델
  - [ ] requestId
  - [ ] category
  - [ ] severity (INFO/WARNING/ERROR)
  - [ ] message
  - [ ] suggestion (선택)
- [ ] 마이그레이션 실행

### API
- [ ] `GET /api/app/feedback`
- [ ] `POST /api/app/feedback`
- [ ] `GET /api/app/feedback/[id]`
  - [ ] FeedbackItem 포함
- [ ] `POST /api/app/feedback/[id]/run`
  - [ ] 피드백 실행
  - [ ] FeedbackItem 생성
- [ ] `GET /api/app/feedback/compare`
  - [ ] Run 비교 (diff)

### 엔진 템플릿
- [ ] `lib/feedback/templates.ts`
- [ ] Resume 체크 템플릿
  - [ ] 회사/직무 컨텍스트 반영
  - [ ] 정량화 지표 체크
  - [ ] 누락 항목 체크
- [ ] Portfolio 체크 템플릿
  - [ ] 프로젝트 구조 검증
  - [ ] 결과물 명확성 체크
- [ ] Note 체크 템플릿
  - [ ] 출처 확인
  - [ ] 단정 표현 검출
- [ ] Blog 체크 템플릿
  - [ ] 상충 가능성 체크
  - [ ] 근거 확인

### 실행 로직
- [ ] `lib/feedback/executor.ts`
- [ ] `executeFeedback(targetType, targetId, context)`
- [ ] targetType별 분기 로직
- [ ] FeedbackItem 생성
  - [ ] category, severity, message
- [ ] 결과 저장

### UI
- [ ] `/app/feedback`
  - [ ] 피드백 요청 목록
  - [ ] targetType별 필터
- [ ] `/app/feedback/new`
  - [ ] 대상 선택 (타입/ID)
  - [ ] 컨텍스트 입력 (선택)
  - [ ] 실행 버튼
- [ ] `/app/feedback/[id]`
  - [ ] 피드백 결과 상세
  - [ ] FeedbackItem 목록
  - [ ] severity별 색상 구분
- [ ] 비교 UI
  - [ ] 이전 Run 선택
  - [ ] 현재 vs 이전 diff
  - [ ] 개선/악화 표시

---

## 공통 작업

### 보안
- [x] `/app/*` 비인증 차단
- [x] 세션 쿠키 보안
- [ ] `/api/app/*` ownerId scope 강제
- [ ] Public API DTO 강제
- [ ] slug 길이/문자 검증
- [ ] JSON 크기 제한
- [ ] XSS 방어

### 성능
- [ ] Lighthouse 90+
- [ ] ISR 적용
- [ ] 이미지 최적화
- [ ] Core Web Vitals
