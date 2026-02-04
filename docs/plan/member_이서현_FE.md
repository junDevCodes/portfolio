# 이서현 (Frontend Developer) - 개인 작업 문서

## 👤 담당자 정보
- **이름**: 이서현
- **역할**: 주니어 레벨 2 Frontend Developer
- **주요 책임**: UI/UX 구현, Public 페이지, Admin 대시보드, SEO 최적화

---

## 📦 개발 단위 1: M0 - Foundation

### 해야 할 Task
#### Task 1: Route Groups 구조 생성 (0.5일)
#### Task 2: Public 홈 더미 페이지 (0.5일)
#### Task 3: Private 대시보드 더미 페이지 (0.5일)

### Task별 체크리스트

#### ✅ Task 1: Route Groups
- [ ] `app/(public)` 폴더 생성
- [ ] `app/(public)/layout.tsx` 작성
- [ ] `app/(private)` 폴더 생성
- [ ] `app/(private)/layout.tsx` 작성
- [ ] Public 레이아웃 스타일 (헤더/푸터)
- [ ] Private 레이아웃 스타일 (사이드바)

#### ✅ Task 2: Public 더미
- [ ] `app/(public)/page.tsx` 작성
- [ ] "Coming Soon" 페이지 디자인
- [ ] 반응형 확인

#### ✅ Task 3: Private 더미
- [ ] `app/(private)/app/page.tsx` 작성
- [ ] "Dashboard" 페이지 기본 레이아웃
- [ ] 로그인 후 접근 확인

### M0 전체 체크리스트
- [ ] Route Groups 분리 확인
- [ ] Public/Private 레이아웃 렌더링
- [ ] 강민서(QA) 테스트 통과

---

## 📦 개발 단위 2: M1 - Portfolio

### 해야 할 Task
#### Task 1: Public 포트폴리오 홈 (2일)
#### Task 2: Public 프로젝트 목록/상세 (2.5일)
#### Task 3: SEO/OG 메타데이터 (1일)
#### Task 4: Private Admin UI (3일)
#### Task 5: ISR 캐싱 (0.5일)

### Task별 체크리스트

#### ✅ Task 1: Public 홈
- [ ] `/` 페이지 디자인
  - [ ] Hero 섹션 (소개, 프로필)
  - [ ] 대표 프로젝트 3개 카드
  - [ ] 연락처 섹션
- [ ] 박지훈(BE)과 API 스펙 확인
- [ ] `/api/public/portfolio` 호출
- [ ] 데이터 바인딩
- [ ] 반응형 디자인 (모바일/태블릿/데스크톱)
- [ ] 이미지 최적화 (Next.js Image)
- [ ] 스크롤 애니메이션 (선택)

#### ✅ Task 2: 프로젝트 목록/상세
- [ ] `/projects` 페이지
  - [ ] 프로젝트 그리드 레이아웃
  - [ ] 필터링 UI (선택)
  - [ ] 페이지네이션 (선택)
- [ ] `/projects/[slug]` 페이지
  - [ ] Problem 섹션
  - [ ] Approach 섹션
  - [ ] Architecture 섹션 (선택)
  - [ ] Results 섹션
  - [ ] 링크 (GitHub, Demo)
- [ ] 반응형 디자인
- [ ] 코드 블록 스타일링

#### ✅ Task 3: SEO/OG
- [ ] 각 페이지 metadata export
- [ ] title, description 작성
- [ ] OG 이미지 설정
- [ ] `app/sitemap.ts` 생성
- [ ] `app/robots.ts` 생성
- [ ] Open Graph 테스트

#### ✅ Task 4: Admin UI
- [ ] `/app/portfolio/settings` 설정 페이지
- [ ] `/app/projects` 목록 (테이블/카드)
- [ ] `/app/projects/new` 생성 폼
- [ ] `/app/projects/[id]/edit` 편집 폼
  - [ ] Markdown 에디터
  - [ ] 이미지 업로드 (선택)
  - [ ] 태그 입력
- [ ] `/app/experiences` CRUD UI
- [ ] 대표 프로젝트 토글
- [ ] 폼 검증 (Zod/React Hook Form)

#### ✅ Task 5: ISR
- [ ] Public 페이지에 `revalidate` 추가
- [ ] 캐시 동작 확인

### M1 전체 체크리스트
- [ ] Public 3페이지 완성
- [ ] Admin CRUD 완성
- [ ] SEO 메타 태그 확인
- [ ] Lighthouse 90+
- [ ] 강민서(QA) E2E 테스트 통과

---

## 📦 개발 단위 3: M2 - Resume

### 해야 할 Task
#### Task 1: Resume Builder UI (2일)
#### Task 2: Experience 선택/정렬 UI (1.5일)
#### Task 3: HTML Preview (1일)

### Task별 체크리스트

#### ✅ Task 1: Builder UI
- [ ] `/app/resumes` 목록
- [ ] `/app/resumes/new` 생성 폼
- [ ] `/app/resumes/[id]/edit` 편집

#### ✅ Task 2: 선택/정렬
- [ ] Experience 체크박스
- [ ] Drag & Drop 정렬
- [ ] Override 편집 UI

#### ✅ Task 3: Preview
- [ ] HTML 템플릿
- [ ] 인쇄 스타일
- [ ] PDF 다운로드 (선택)

---

## 📦 개발 단위 4: M3 - Notes

### 해야 할 Task
#### Task 1: Notes UI (2일)
#### Task 2: 연관 후보 UI (1.5일)
#### Task 3: 연관 리스트 (1일)
#### Task 4: 그래프 시각화 (2일, 선택)

---

## 📦 개발 단위 5: M4 - Blog

### 해야 할 Task
#### Task 1: Blog UI (2일)
#### Task 2: Lint 결과 UI (1일)
#### Task 3: Export UI (0.5일)

---

## 📦 개발 단위 6: M5 - Feedback

### 해야 할 Task
#### Task 1: Feedback UI (2일)
#### Task 2: 비교 UI (1일)

---

## 🎯 전체 프로젝트 체크리스트

### Frontend 완료 기준
- [ ] M0-M5 모든 UI 구현 완료
- [ ] 반응형 디자인 100%
- [ ] 접근성 (a11y) 기준 충족
- [ ] Lighthouse 90+ (모든 Public 페이지)
- [ ] 브라우저 호환성 (Chrome, Safari, Firefox)
- [ ] 폼 검증 100%
- [ ] 에러 핸들링 일관성
- [ ] 강민서(QA) E2E 테스트 통과

---

**작업 원칙**
> "사용자 중심, 픽셀 퍼펙트, 성능 최적화"
