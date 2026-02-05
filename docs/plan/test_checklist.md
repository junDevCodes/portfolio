# PoReSt 프로젝트 종합 테스트 체크리스트

## 📋 테스트 계층 구조

1. **Unit Tests**: 개별 함수/컴포넌트 단위
2. **Integration Tests**: API + DB 통합
3. **E2E Tests**: 사용자 플로우 전체
4. **Performance Tests**: 성능/캐시/최적화
5. **Security Tests**: 인증/권한/데이터 보호

---

## M0 — Foundation 테스트

### Unit Tests
- [ ] Auth Guard 함수 테스트
  - 세션 있음 → 통과
  - 세션 없음 → 401 반환
  - 오너 아님 → 403 반환

### Integration Tests
- [ ] Prisma 연결 테스트
  - User 생성/조회 성공
  - 커넥션 풀링 동작 확인

### E2E Tests
- [ ] **E2E-M0-1**: 인증 플로우
  - 비인증 → `/app` 접근 → 로그인 페이지로 리다이렉트
  - 로그인 → `/app` 접근 → 대시보드 표시
- [ ] **E2E-M0-2**: API 권한 테스트
  - 비인증 → `/api/app/*` 호출 → 401 반환

### Security Tests
- [ ] Middleware 보호 확인
- [ ] 세션 쿠키 설정 확인 (HttpOnly, Secure)
- [ ] CSRF 토큰 확인

---

## M1 — Portfolio 테스트

### Unit Tests
- [ ] **DTO Select 테스트**
  - Public API가 `ownerId`, `isPublic` 필드만 반환
  - Private 필드 (`notes`, `internalMemo`) 노출 안 함

### Integration Tests
- [ ] **Portfolio API 통합 테스트**
  - `/api/public/portfolio` → 200, 데이터 정합성
  - `/api/public/projects` → visibility=PUBLIC만 반환
  - `/api/app/projects` (인증) → CRUD 동작
  - `/api/app/projects` (비인증) → 401

### E2E Tests
- [ ] **E2E-M1-1**: Public 포트폴리오 플로우
  - `/` 접근 → 대표 프로젝트 3개 표시
  - 프로젝트 클릭 → `/projects/[slug]` 이동
  - 프로젝트 상세 렌더링 (Problem/Approach/Results)
- [ ] **E2E-M1-2**: Admin CRUD 플로우
  - 로그인 → `/app/projects` 접근
  - 프로젝트 생성 → 저장 → 목록에 표시
  - 프로젝트 편집 → 저장 → 변경사항 반영
  - 프로젝트 삭제 → 목록에서 제거
- [ ] **E2E-M1-3**: ISR 동작 확인
  - Admin에서 프로젝트 수정
  - (on-demand revalidate 있으면) 즉시 Public 반영
  - (time-based) revalidate 시간 후 반영

### Performance Tests
- [ ] Lighthouse 스코어 측정
  - `/` → Performance 90+
  - `/projects` → Performance 90+
- [ ] 이미지 최적화 확인 (Next.js Image)
- [ ] 캐시 헤더 확인 (Cache-Control)

### Security Tests
- [ ] Public API Private 필드 노출 여부
- [ ] visibility=PRIVATE 프로젝트 노출 안 함

---

## M2 — Resume 테스트

### Unit Tests
- [ ] **Resume-Experience 조합 로직**
  - Experience 선택 → ResumeItem 생성
  - Override 적용 → 원본 변경 안 함

### Integration Tests
- [ ] **Resume API 통합 테스트**
  - `/api/app/resumes` → CRUD 동작
  - `/api/app/resumes/[id]/items` → ResumeItem CRUD
  - `/api/app/resumes/[id]/preview` → HTML 데이터 반환

### E2E Tests
- [ ] **E2E-M2-1**: Resume 생성 플로우
  - 로그인 → `/app/resumes/new` 접근
  - 회사/직무 입력 → 저장
  - Resume 목록에 표시
- [ ] **E2E-M2-2**: Experience 선택/정렬
  - Resume 편집 → Experience 선택 (체크박스)
  - Drag & Drop으로 정렬
  - 저장 → 순서 반영
- [ ] **E2E-M2-3**: Preview 확인
  - Resume 클릭 → Preview 화면
  - HTML 렌더링 확인
  - 인쇄 가능 여부 확인

### Functional Tests
- [ ] **원본 변경 비반영 테스트**
  - Experience 원본 수정
  - Resume에 자동 반영 안 됨 확인
  - (선택) 동기화 알림 표시 확인

---

## M3 — Notes 테스트

### Unit Tests
- [ ] **Candidate Generator 테스트**
  - 태그 매칭 → 후보 생성
  - Threshold 0.7 미만 → 후보 제외
  - Domain 필터링 → 같은 domain 우선
  - Top-N 제한 → 최대 10개

- [ ] **Edge 상태 전이 테스트**
  - CANDIDATE → Confirm → CONFIRMED
  - CONFIRMED → Undo → CANDIDATE

### Integration Tests
- [ ] **Notes API 통합 테스트**
  - `/api/app/notes` → CRUD
  - `/api/app/notes/edges` → 후보 목록
  - `/api/app/notes/edges/confirm` → 상태 전이

### E2E Tests
- [ ] **E2E-M3-1**: Note 생성 플로우
  - 로그인 → `/app/notes/new` 접근
  - 제목/본문/태그 입력 → 저장
  - 후보 자동 생성 확인
- [ ] **E2E-M3-2**: Edge 확정 플로우
  - Note 상세 → 후보 리스트 확인
  - Confirm 클릭 → CONFIRMED로 전이
  - 연관 개념 리스트에 표시
- [ ] **E2E-M3-3**: 연관 개념 탐색
  - Note 상세 → 연관 개념 클릭
  - 해당 Note로 이동

### Quality Tests
- [ ] **Candidate 품질 검증**
  - 샘플 노트 50개 생성
  - 후보 오탐률 측정 (목표: 30% 이하)
  - Domain 필터링 정확도 측정

### Performance Tests
- [ ] **그래프 탐색 성능**
  - 노트 100개 → 연관 리스트 로딩 1초 이내
  - 노트 1000개 → 성능 저하 없음 (인덱스 확인)

---

## M4 — Blog 테스트

### Unit Tests
- [ ] **Lint Rule 테스트 (각 10개 규칙)**
  - Rule 1: Long sentence → 45자 이상 검출
  - Rule 2: 반복 표현 → n-gram 검출
  - Rule 3: 모호 표현 → "같다/느낌/아마" 검출
  - Rule 4: 근거 없는 단정 → 링크 부재 검출
  - Rule 5: 문단 과다 길이 → 기준 초과 검출
  - Rule 6: 단위/숫자 불일치 → 패턴 검출
  - Rule 7: 코드블록만 존재 → 설명 부재 검출
  - Rule 8: 금칙어 → 리스트 매칭
  - Rule 9: 제목-본문 불일치 → 휴리스틱 검출
  - Rule 10: 맞춤법/띄어쓰기 → (v1.5)

### Integration Tests
- [ ] **Blog API 통합 테스트**
  - `/api/app/blog/posts` → CRUD
  - `/api/app/blog/posts/[id]/lint` → Lint 실행, 결과 저장
  - `/api/app/blog/posts/[id]/export` → ZIP 생성

### E2E Tests
- [ ] **E2E-M4-1**: Blog 작성 플로우
  - 로그인 → `/app/blog/new` 접근
  - Markdown 작성 → 저장 (draft)
  - Lint 자동 실행 → 결과 표시
- [ ] **E2E-M4-2**: Lint 수정 플로우
  - Lint 결과 확인 → 수정
  - 재검수 → 통과
  - 상태 published로 변경
- [ ] **E2E-M4-3**: Export 플로우
  - Export 버튼 클릭 → ZIP 다운로드
  - ZIP 압축 해제 → HTML/MD 파일 확인
  - 외부 URL 등록 → 상태 저장

### Functional Tests
- [ ] **Lint 규칙 검증**
  - 각 규칙별 샘플 데이터 작성
  - 검출 여부 확인 (True Positive)
  - 미검출 여부 확인 (False Positive 최소화)

---

## M5 — Feedback 테스트

### Unit Tests
- [ ] **Feedback 템플릿 테스트**
  - Resume 템플릿 → 회사/직무 컨텍스트 반영
  - Note 템플릿 → 출처/단정 표현 체크

### Integration Tests
- [ ] **Feedback API 통합 테스트**
  - `/api/app/feedback` → CRUD
  - `/api/app/feedback/[id]/run` → 실행, 결과 저장
  - `/api/app/feedback/compare` → diff 데이터 반환

### E2E Tests
- [ ] **E2E-M5-1**: Feedback 실행 플로우
  - 로그인 → `/app/feedback/new` 접근
  - 대상 선택 (Resume/Note) → 실행
  - 결과 표시 (FeedbackItem 리스트)
- [ ] **E2E-M5-2**: Feedback 비교 플로우
  - 이전 Run 선택 → 현재 Run 선택
  - Diff 뷰 렌더링 → 변경사항 확인

---

## 🔐 보안 테스트 (전체 마일스톤 공통)

### 인증/권한
- [ ] **비인증 접근 차단**
  - `/app/*` 경로 → 로그인 페이지 리다이렉트
  - `/api/app/*` API → 401 반환
- [ ] **ownerId Scope 강제**
  - 다른 사용자 데이터 접근 시도 → 403 반환
- [ ] **세션 보안**
  - 세션 쿠키 HttpOnly=true
  - 세션 쿠키 Secure=true (HTTPS)
  - 세션 쿠키 SameSite=Lax/Strict

### 입력 검증
- [ ] **Slug 검증**
  - 허용 문자 (영문/숫자/하이픈)
  - 길이 제한 (100자)
- [ ] **JSON 크기 제한**
  - 1MB 초과 → 413 반환
- [ ] **XSS 방어**
  - 사용자 입력 sanitize 확인

### 데이터 노출
- [ ] **Public API DTO 검증**
  - Private 필드 노출 0건
  - visibility=PRIVATE 데이터 노출 0건

---

## ⚡ 성능 테스트 (전체)

### Public 페이지
- [ ] **Lighthouse 스코어**
  - Performance 90+
  - Accessibility 90+
  - Best Practices 90+
  - SEO 90+
- [ ] **Core Web Vitals**
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1

### API 성능
- [ ] **응답 시간**
  - 단일 조회 API < 200ms
  - 목록 API (페이지네이션) < 500ms
  - 복잡한 쿼리 (그래프 탐색) < 1s

### 데이터베이스
- [ ] **쿼리 최적화**
  - N+1 쿼리 0건
  - 주요 쿼리 EXPLAIN ANALYZE 확인
  - 인덱스 활용 확인

---

## 🧪 통합 테스트 시나리오 (전체 플로우)

### IT-1: Portfolio 전체 플로우
1. 비인증 → Public 포트폴리오 탐색
2. 로그인 → Admin에서 프로젝트 생성
3. 프로젝트 수정 → Public 반영 확인
4. 프로젝트 삭제 → Public에서 제거 확인

### IT-2: Resume 전체 플로우
1. Experience 3개 생성
2. Resume 생성 → Experience 선택/정렬
3. Override 수정 → Preview 확인
4. Experience 원본 수정 → Resume 비반영 확인

### IT-3: Notes 전체 플로우
1. Note 10개 생성 (태그 중복)
2. 후보 자동 생성 확인
3. 5개 Confirm → 연관 리스트 확인
4. 연관 개념 클릭 → 노트 이동

### IT-4: Blog 전체 플로우
1. Blog 작성 (draft)
2. Lint 실행 → 결과 확인
3. 수정 → 재검수 → published
4. Export → ZIP 다운로드 → 외부 URL 등록

### IT-5: 권한 경계 테스트
1. 로그아웃
2. Public API 호출 → 성공
3. Private API 호출 → 401
4. `/app` 접근 → 리다이렉트

---

## 📊 테스트 커버리지 목표

- **Unit Tests**: 핵심 비즈니스 로직 80% 이상
- **Integration Tests**: 모든 API 엔드포인트 100%
- **E2E Tests**: 주요 사용자 플로우 5개 이상 (각 마일스톤)
- **Security Tests**: 인증/권한 관련 100%
- **Performance Tests**: Public 페이지 100%

---

## ✅ DoD (Definition of Done) 통합 체크

각 작업 완료 시:
- [ ] 기능 동작 확인
- [ ] 예외 흐름 확인 (401/403/404/409/422)
- [ ] 타입/린트/빌드 통과
- [ ] 최소 테스트 1개 이상 추가/갱신
- [ ] 관련 문서 갱신
- [ ] PR 리뷰 2명 Approve
- [ ] CI 통과

---

## 🎯 릴리즈 전 최종 체크리스트

### 기능
- [ ] M0-M5 모든 DoD 통과
- [ ] 통합 테스트 시나리오 5개 통과

### 보안
- [ ] 보안 테스트 전체 통과
- [ ] Public/Private 경계 검증 완료

### 성능
- [ ] Lighthouse 스코어 90+ 달성
- [ ] API 응답 시간 기준 충족

### 품질
- [ ] 테스트 커버리지 목표 달성
- [ ] 버그 0건 (Critical/High)

**테스트 원칙**  
> "자동화할 수 있는 것은 자동화하고, 수동으로 해야 하는 것은 체크리스트로 관리한다."

