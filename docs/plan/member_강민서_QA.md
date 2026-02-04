# 강민서 (QA Engineer) - 개인 작업 문서

## 👤 담당자 정보
- **이름**: 강민서
- **역할**: 주니어 레벨 1 QA Engineer
- **주요 책임**: 테스트 계획, 기능 테스트, E2E 테스트, 버그 리포트

---

## 📦 개발 단위 1: M0 - Foundation

### 해야 할 Task
#### Task 1: M0 테스트 계획 수립 (0.5일)
#### Task 2: 인증/권한 테스트 (0.5일)
#### Task 3: 배포 파이프라인 검증 (0.5일)

### Task별 체크리스트

#### ✅ Task 1: 테스트 계획
- [ ] M0 완료 기준 확인
- [ ] 테스트 시나리오 작성 (`tests/M0-test-plan.md`)
  - [ ] 인증 플로우
  - [ ] 권한 차단
  - [ ] 배포 검증
- [ ] 팀 리뷰 미팅 (30분)
- [ ] 시나리오 승인 확보

#### ✅ Task 2: 인증/권한 테스트
- [ ] **TC-M0-1**: 비인증 `/app` 접근
  - [ ] 브라우저 시크릿 모드
  - [ ] `/app` URL 접근
  - [ ] → `/auth/signin` 리다이렉트 확인
- [ ] **TC-M0-2**: 로그인 후 `/app` 접근
  - [ ] 로그인 (오너 계정)
  - [ ] `/app` URL 접근
  - [ ] → Dashboard 페이지 표시 확인
- [ ] **TC-M0-3**: 비인증 API 호출
  - [ ] Postman/curl 사용
  - [ ] `/api/app/*` 호출 (Authorization 헤더 없이)
  - [ ] → 401 응답 확인
- [ ] **TC-M0-4**: 세션 쿠키 보안
  - [ ] 브라우저 DevTools
  - [ ] 세션 쿠키 확인
  - [ ] → HttpOnly, Secure, SameSite 확인
- [ ] 테스트 결과 리포트 작성
- [ ] 버그 발견 시 GitHub Issue 생성

#### ✅ Task 3: 배포 검증
- [ ] **TC-M0-5**: Preview 배포
  - [ ] PR 생성
  - [ ] Preview URL 생성 확인
  - [ ] Preview 환경 접근
  - [ ] → Public 페이지 렌더링 확인
- [ ] **TC-M0-6**: Production 배포
  - [ ] main 브랜치 머지
  - [ ] Production 배포 트리거 확인
  - [ ] Production URL 접근
  - [ ] → Public 페이지 렌더링 확인
- [ ] 배포 테스트 체크리스트 작성

### M0 전체 체크리스트
- [ ] 모든 테스트 케이스 실행 완료
- [ ] 테스트 통과율 100%
- [ ] 버그 리포트 작성 (발견 시)
- [ ] M0 DoD 검증 완료

---

## 📦 개발 단위 2: M1 - Portfolio

### 해야 할 Task
#### Task 1: M1 테스트 계획 (0.5일)
#### Task 2: Public API 테스트 (1일)
#### Task 3: Public E2E 테스트 (1.5일)
#### Task 4: Admin CRUD 테스트 (1일)
#### Task 5: ISR/캐싱 검증 (0.5일)

### Task별 체크리스트

#### ✅ Task 1: 테스트 계획
- [ ] M1 기능 명세 확인
- [ ] 테스트 시나리오 작성
- [ ] 팀 리뷰 및 승인

#### ✅ Task 2: Public API
- [ ] **TC-M1-1**: `/api/public/portfolio`
  - [ ] 200 응답
  - [ ] 데이터 정합성
  - [ ] Private 필드 노출 없음
- [ ] **TC-M1-2**: `/api/public/projects`
  - [ ] visibility=PUBLIC만 반환
  - [ ] Private 프로젝트 노출 없음
- [ ] **TC-M1-3**: `/api/public/projects/[slug]`
  - [ ] 슬러그로 조회 성공
  - [ ] 404 처리 확인

#### ✅ Task 3: Public E2E
- [ ] **TC-M1-4**: Public 플로우
  - [ ] `/` → 대표 프로젝트 3개 표시
  - [ ] 프로젝트 클릭 → `/projects/[slug]` 이동
  - [ ] Problem/Approach/Results 렌더링
  - [ ] 다시 홈으로 내비게이션
- [ ] **TC-M1-5**: SEO 검증
  - [ ] `<title>` 태그 확인
  - [ ] `<meta description>` 확인
  - [ ] OG 태그 확인
  - [ ] sitemap.xml 접근 확인

#### ✅ Task 4: Admin CRUD
- [ ] **TC-M1-6**: Project CRUD
  - [ ] 로그인 → `/app/projects`
  - [ ] "New" 버튼 → 생성 폼
  - [ ] 프로젝트 생성 → 목록 표시
  - [ ] 편집 → 변경사항 반영
  - [ ] 삭제 → 목록에서 제거

#### ✅ Task 5: 캐싱 검증
- [ ] Cache-Control 헤더 확인
- [ ] Lighthouse 성능 측정 (90+)

### M1 전체 체크리스트
- [ ] 모든 테스트 케이스 통과
- [ ] 버그 0건 (Critical/High)
- [ ] M1 DoD 검증 완료

---

## 📦 개발 단위 3: M2 - Resume

### 해야 할 Task
#### Task 1: 테스트 계획 (0.5일)
#### Task 2: Resume CRUD 테스트 (1일)
#### Task 3: 재사용 검증 (0.5일)

---

## 📦 개발 단위 4: M3 - Notes

### 해야 할 Task
#### Task 1: 테스트 계획 (0.5일)
#### Task 2: CRUD 테스트 (1일)
#### Task 3: 품질 검증 (1일)
#### Task 4: Edge 테스트 (0.5일)

---

## 📦 개발 단위 5: M4 - Blog

### 해야 할 Task
#### Task 1: 테스트 계획 (0.5일)
#### Task 2: CRUD 테스트 (1일)
#### Task 3: Lint 검증 (1.5일)
#### Task 4: Export 테스트 (0.5일)

---

## 📦 개발 단위 6: M5 - Feedback

### 해야 할 Task
#### Task 1: 테스트 계획 (0.5일)
#### Task 2: 실행 테스트 (1일)
#### Task 3: 비교 테스트 (0.5일)

---

## 🎯 전체 프로젝트 체크리스트

### QA 완료 기준
- [ ] M0-M5 모든 테스트 계획 작성
- [ ] 모든 테스트 케이스 실행 완료
- [ ] 전체 테스트 통과율 95% 이상
- [ ] Critical/High 버그 0건
- [ ] 버그 리포트 문서화 완료
- [ ] 회귀 테스트 체크리스트 작성
- [ ] 릴리즈 최종 승인

---

**작업 원칙**
> "꼼꼼하게 테스트, 명확하게 리포트, 협력하며 개선"
