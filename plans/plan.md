# PoReSt 개발 계획

> **프로젝트**: PoReSt — Public Portfolio + Private Dashboard  
> **우선순위**: Portfolio > Notes > Blog > Feedback

---

## 마일스톤 개요

| 단계 | 명칭 | 기간 | 주요 내용 |
|------|------|------|----------|
| M0 | Foundation | 1주 | 프로젝트 뼈대, 인증, DB, 배포 |
| M1 | Portfolio | 2주 | 공개 포트폴리오 + Admin CRUD |
| M2 | Resume | 1주 | 이력서 버전 관리, Builder UI |
| M3 | Notes | 2주 | 지식노트, 연관 그래프, Candidate Generator |
| M4 | Blog | 1주 | 블로그 작성, Lint 엔진, Export |
| M5 | Feedback | 1주 | 피드백 실행, 비교, 엔진 템플릿 |

---

## M0 — Foundation ✅

### 프로젝트 구조
- Next.js App Router + TypeScript
- ESLint + Prettier
- Route Groups (`(public)`, `(private)`)
- 환경변수 템플릿

### 인증/권한
- Auth.js + Prisma Adapter
- Google OAuth
- 오너 전용 정책 (`isOwner`)
- 세션 쿠키 보안

### 라우트 보호
- Middleware (`/app/*` 보호)
- Public 경로 예외 처리
- 비인증 리다이렉트

### Database
- Prisma + PostgreSQL (Neon)
- User/Account/Session 모델
- Pooled connection
- Seed 스크립트

### 배포
- Vercel 자동 배포
- `prisma migrate deploy` 자동화

---

## M1 — Portfolio

### 스키마 설계
- **PortfolioSettings**: publicSlug, displayName, headline, bio, avatarUrl, layoutJson, links(PortfolioLink)
- **Project**: slug(unique), title, subtitle, description, contentMd, techStack, repoUrl, demoUrl, thumbnailUrl, visibility, isFeatured, order
- **Experience**: company, role, startDate, endDate, isCurrent, summary, bulletsJson, metricsJson, techTags, visibility, isFeatured, order

### Public API
| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/public/portfolio` | 홈 데이터 + 대표 프로젝트 |
| `GET /api/public/projects` | 공개 프로젝트 목록 |
| `GET /api/public/projects/[slug]` | 프로젝트 상세 |

### Private API
| 엔드포인트 | 설명 |
|-----------|------|
| `GET/PUT /api/app/portfolio/settings` | 설정 조회/수정 |
| `GET/POST /api/app/projects` | 목록/생성 |
| `GET/PUT/DELETE /api/app/projects/[id]` | 상세/수정/삭제 |
| `CRUD /api/app/experiences` | 경력 CRUD |

### Public 페이지
| 경로 | 내용 |
|------|------|
| `/` | Hero, 대표 프로젝트 3개, 연락처 |
| `/projects` | 프로젝트 그리드 목록 |
| `/projects/[slug]` | Problem/Approach/Results 상세 |

### Admin 페이지
| 경로 | 내용 |
|------|------|
| `/app/portfolio/settings` | 프로필/소셜 편집 |
| `/app/projects` | 프로젝트 목록 관리 |
| `/app/projects/new` | 프로젝트 생성 (Markdown 에디터) |
| `/app/projects/[id]/edit` | 프로젝트 편집 |
| `/app/experiences` | 경력 CRUD |

### SEO & 성능
- metadata export, OG 이미지
- sitemap.xml, robots.txt
- ISR 캐싱, Lighthouse 90+

---

## M2 — Resume

### 스키마 설계
- **ResumeVersion**: 회사명, 직무, 제목
- **ResumeItem**: Experience 연결, 순서, override 텍스트
- **Experience 확장**: metricsJson, techTags

### API
| 엔드포인트 | 설명 |
|-----------|------|
| `CRUD /api/app/resumes` | 이력서 버전 관리 |
| `CRUD /api/app/resumes/[id]/items` | 항목 관리 |
| `GET /api/app/resumes/[id]/preview` | HTML 프리뷰 데이터 |

### UI
| 경로 | 내용 |
|------|------|
| `/app/resumes` | 이력서 버전 목록 |
| `/app/resumes/new` | 새 이력서 생성 (회사/직무 입력) |
| `/app/resumes/[id]/edit` | Experience 선택, Drag & Drop 정렬 |

### 핵심 기능
- Experience 선택 체크박스
- Drag & Drop 순서 정렬
- Override 텍스트 편집
- HTML Preview (인쇄 가능)
- PDF 다운로드 (선택)

---

## M3 — Notes

### 스키마 설계
- **Notebook**: 분야별 그룹
- **Note**: 제목, 본문, 태그, domain
- **NoteEdge**: fromId, toId, relationType, status
- **NoteEmbedding**: pgvector 임베딩 (선택)
- **Edge status**: CANDIDATE / CONFIRMED / REJECTED

### API
| 엔드포인트 | 설명 |
|-----------|------|
| `CRUD /api/app/notes` | 노트 관리 |
| `GET /api/app/notes/search` | 검색 (q, tag, domain) |
| `GET /api/app/notes/edges` | 후보 Edge 목록 |
| `POST /api/app/notes/edges/confirm` | Edge 확정 |
| `POST /api/app/notes/edges/reject` | Edge 거절 |

### Candidate Generator
- 태그 기반 후보 생성
- Jaccard 유사도 계산
- Threshold 0.7 이상만 후보
- Top-N 제한 (10~20개)
- Domain 필터링 (같은 domain 우선)
- pgvector 임베딩 (선택)

### UI
| 경로 | 내용 |
|------|------|
| `/app/notes` | Notebook/Note 목록 |
| `/app/notes/[id]` | 노트 상세 + 연관 개념 리스트 |

### 핵심 기능
- 연관 후보 표시 (CANDIDATE)
- Confirm/Reject 버튼
- 연관 개념 클릭 → 해당 노트 이동
- 그래프 시각화 (D3.js/React Flow, 선택)

---

## M4 — Blog

### 스키마 설계
- **BlogPost**: title, contentMd, status, lintResultJson
- **BlogExternalPost**: externalUrl, platform (선택)
- **status**: DRAFT / PUBLISHED / ARCHIVED

### API
| 엔드포인트 | 설명 |
|-----------|------|
| `CRUD /api/app/blog/posts` | 블로그 글 관리 |
| `POST /api/app/blog/posts/[id]/lint` | Lint 실행 |
| `GET /api/app/blog/posts/[id]/export` | Export 생성 |
| `CRUD /api/app/blog/external` | 외부 URL 관리 |

### Lint 엔진 (10개 규칙)
1. Long sentence (45자 이상)
2. 반복 표현 과다 (n-gram)
3. 모호 표현 밀도 ("같다", "느낌", "아마")
4. 근거 없는 단정 (링크/인용 부재)
5. 문단 과다 길이
6. 단위/숫자 표기 불일치
7. 코드블록만 있고 설명 부족
8. 금칙어 리스트 (광고성/과장성)
9. 제목-본문 불일치
10. 맞춤법/띄어쓰기 (선택)

### Export 기능
- HTML Export (템플릿 + 스타일)
- Markdown Export
- ZIP 아카이브 (HTML + MD + 이미지)

### UI
| 경로 | 내용 |
|------|------|
| `/app/blog` | 블로그 글 목록 |
| `/app/blog/new` | 글 작성 (Markdown 에디터) |
| `/app/blog/[id]/edit` | 글 편집 + Lint 결과 표시 |

### 핵심 기능
- Lint 결과 표시 (severity, message, line)
- Lint 재실행 버튼
- Export 다운로드 버튼
- 외부 URL 등록

---

## M5 — Feedback

### 스키마 설계
- **FeedbackRequest**: targetType, targetId, context
- **FeedbackItem**: category, severity, message
- **targetType**: PORTFOLIO / RESUME / NOTE / BLOG

### API
| 엔드포인트 | 설명 |
|-----------|------|
| `GET/POST /api/app/feedback` | 피드백 목록/생성 |
| `GET /api/app/feedback/[id]` | 피드백 상세 (items 포함) |
| `POST /api/app/feedback/[id]/run` | 피드백 실행 |
| `GET /api/app/feedback/compare` | Run 비교 (diff) |

### 엔진 템플릿 (4종)
| 타입 | 체크 항목 |
|------|----------|
| Resume | 정량화 지표, 누락 항목, 회사/직무 컨텍스트 |
| Portfolio | 프로젝트 구조, 결과물 명확성 |
| Note | 출처 확인, 단정 표현 검출 |
| Blog | 상충 가능성, 근거 확인 |

### UI
| 경로 | 내용 |
|------|------|
| `/app/feedback` | 피드백 요청 목록 |
| `/app/feedback/new` | 피드백 실행 (대상 선택) |
| `/app/feedback/[id]` | 피드백 결과 상세 |

### 핵심 기능
- targetType별 분기 실행
- FeedbackItem 생성 (category, severity, message)
- Run 비교 UI (이전 vs 현재 diff)

---

## 공통 요구사항

### 보안
- `/app/*` 비인증 차단
- `/api/app/*` ownerId scope 강제
- Public API DTO 강제
- 입력 검증 (slug, JSON)
- XSS 방어

### 성능
- Lighthouse 90+
- ISR 적용
- 이미지 최적화
- Core Web Vitals

### DoD (완료 기준)
- 기능 동작 + 예외 처리
- 타입/린트/빌드 통과
- 테스트 1개 이상
- PR 리뷰 승인
- CI 통과
