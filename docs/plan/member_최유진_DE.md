# 최유진 (Data Engineer) - 개인 작업 문서

## 👤 담당자 정보
- **이름**: 최유진
- **역할**: 주니어 레벨 3 Data Engineer
- **주요 책임**: Notes 추천 엔진, 유사도 계산, Feedback 엔진

---

## 📦 개발 단위 1: M3 - Notes Graph

### 해야 할 Task
#### Task 1: Notes 스키마 설계 지원 (0.5일)
#### Task 2: 태그 기반 Candidate Generator (2일)
#### Task 3: Domain 필터링 로직 (0.5일)
#### Task 4: pgvector 임베딩 파이프라인 (2일, 선택)

### Task별 체크리스트

#### ✅ Task 1: 스키마 설계
- [ ] Note/NoteEdge 데이터 구조 협의
- [ ] 박지훈(BE)과 스키마 조율
- [ ] Edge status enum 정의 (CANDIDATE/CONFIRMED/REJECTED)
- [ ] 유사도 계산 필요 필드 확인

#### ✅ Task 2: Candidate Generator
- [ ] `lib/notes/candidate-generator.ts` 파일 생성
- [ ] 태그 매칭 알고리즘 구현
  - [ ] 공통 태그 개수 계산
  - [ ] Jaccard 유사도 계산
- [ ] Threshold 0.7 적용
- [ ] Top-N 제한 (기본 10개, 최대 20개)
- [ ] 후보 생성 함수 작성
  - [ ] `generateCandidates(noteId)`
  - [ ] 중복 후보 제거
  - [ ] 자기 자신 제외
- [ ] 테스트 데이터로 검증
  - [ ] 샘플 노트 20개 생성
  - [ ] 후보 생성 품질 확인
  - [ ] 오탐률 측정 (목표: 30% 이하)
- [ ] 성능 최적화
  - [ ] 쿼리 최적화
  - [ ] 인덱스 활용 확인

#### ✅ Task 3: Domain 필터링
- [ ] `filterByDomain(candidates, targetDomain)` 함수
- [ ] 같은 domain 우선순위 부여
- [ ] Domain 가중치 로직 구현
- [ ] 테스트 케이스 작성

#### ✅ Task 4: pgvector 파이프라인 (선택)
- [ ] Embedding 모델 선정 (OpenAI/HuggingFace)
- [ ] `lib/notes/embedding.ts` 파일 생성
- [ ] Note 저장 시 임베딩 생성
- [ ] NoteEmbedding 테이블에 저장
- [ ] 유사도 계산 (코사인 유사도)
- [ ] pgvector 인덱스 생성 (HNSW)
- [ ] 성능 측정 (노트 1000개 기준)

### M3 전체 체크리스트
- [ ] Candidate Generator 구현 완료
- [ ] 후보 생성 품질 검증 (오탐률 30% 이하)
- [ ] Domain 필터링 동작 확인
- [ ] (선택) pgvector 파이프라인 동작 확인
- [ ] 강민서(QA) 품질 테스트 통과

---

## 📦 개발 단위 2: M5 - Feedback

### 해야 할 Task
#### Task 1: Feedback 엔진 설계 (1일)
#### Task 2: Feedback 실행 로직 (2일)

### Task별 체크리스트

#### ✅ Task 1: 엔진 설계
- [ ] `lib/feedback/templates.ts` 파일 생성
- [ ] Resume 체크 템플릿 작성
  - [ ] 회사/직무 컨텍스트 반영 로직
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

#### ✅ Task 2: 실행 로직
- [ ] `lib/feedback/executor.ts` 파일 생성
- [ ] `executeFeedback(targetType, targetId, context)` 함수
- [ ] targetType별 분기 로직
  - [ ] RESUME → Resume 템플릿 적용
  - [ ] PORTFOLIO → Portfolio 템플릿 적용
  - [ ] NOTE → Note 템플릿 적용
  - [ ] BLOG → Blog 템플릿 적용
- [ ] FeedbackItem 생성 로직
  - [ ] category, severity, message 생성
- [ ] 결과 저장 로직
- [ ] 테스트 케이스 작성

### M5 전체 체크리스트
- [ ] Feedback 템플릿 4개 작성 완료
- [ ] 실행 로직 동작 확인
- [ ] 샘플 데이터로 검증
- [ ] 강민서(QA) 테스트 통과

---

## 🎯 전체 프로젝트 체크리스트

### Data Engineering 완료 기준
- [ ] M3 Notes Candidate Generator 완료
- [ ] M5 Feedback 엔진 완료
- [ ] 추천 품질 목표 달성 (오탐률 30% 이하)
- [ ] 성능 목표 달성 (노트 1000개에서 1초 이내)
- [ ] 알고리즘 문서화 완료
- [ ] 박지훈(BE)과 통합 확인
- [ ] 강민서(QA) 품질 테스트 통과

---

**작업 원칙**
> "데이터 품질 우선, 알고리즘 검증 필수, 성능 측정 상시"
