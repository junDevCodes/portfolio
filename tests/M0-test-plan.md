# M0 테스트 계획 (QA)

작성일: 2026-02-05  
작성자: 강민서 (QA)

## 범위
- 인증/권한 흐름
- `/app` 라우트 보호
- `/api/app/*` 인증 보호
- 배포 파이프라인(Preview/Production) 확인

## 테스트 전제조건
- 로컬 `.env.local` 또는 `.env`에 `AUTH_SECRET`, `AUTH_TRUST_HOST`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `OWNER_EMAIL` 설정
- DB 연결 가능 (Neon/Prisma Postgres)
- 오너 계정 시드 완료 또는 `OWNER_EMAIL` allowlist 설정 완료

## 테스트 케이스

### TC-M0-1: 비인증 `/app` 접근 차단
1. 시크릿/로그아웃 상태에서 `http://localhost:3000/app` 접근
2. `/auth/signin`으로 리다이렉트되는지 확인
3. URL에 `next` 파라미터가 포함되는지 확인

예상 결과:  
- `/auth/signin`으로 이동  
- `next=/app` 파라미터 포함  

### TC-M0-2: 오너 로그인 후 `/app` 접근
1. `http://localhost:3000/auth/signin` 접속
2. 오너 계정으로 로그인
3. 로그인 후 `/app` 화면 노출 확인

예상 결과:  
- 오너 대시보드 화면이 표시됨  
- 사용자 이름 또는 이메일이 표시됨  

### TC-M0-3: 비인증 API 호출 차단
1. Authorization 없이 `GET /api/app/test/auth` 호출
2. 응답 상태 코드 확인

예상 결과:  
- 401 응답  
- JSON: `{ "error": "인증이 필요합니다." }`  

### TC-M0-4: 비오너 API 호출 차단
1. 오너가 아닌 계정으로 로그인
2. `GET /api/app/test/owner` 호출
3. 응답 상태 코드 확인

예상 결과:  
- 403 응답  
- JSON: `{ "error": "오너 권한이 필요합니다." }`  

### TC-M0-5: 세션 쿠키 보안 설정
1. 로그인 후 브라우저 개발자 도구 열기
2. Cookies에서 `next-auth.session-token` 확인

예상 결과:  
- `HttpOnly` 활성화  
- Production 환경에서 `Secure` 활성화  
- `SameSite=Lax`  

### TC-M0-6: 배포 파이프라인 검증
1. PR 생성 후 Preview URL 확인
2. Preview 환경에서 `/` 접근
3. main 머지 후 Production URL 접근

예상 결과:  
- Preview/Production 모두 접근 가능  
- Public 홈 렌더링 정상  

## 실행 결과 (2026-02-06)
- TC-M0-1 통과 (비인증 `/app` → `/auth/signin`, `next` 파라미터 확인)
- TC-M0-2 통과 (오너 로그인 후 `/app` 접근 확인)
- TC-M0-3 통과 (401 + `{ "error": "인증이 필요합니다." }`)
- TC-M0-4 통과 (403 + `{ "error": "오너 권한이 필요합니다." }`)
- TC-M0-5 통과 (HttpOnly, Secure(Production), SameSite=Lax 확인)
- TC-M0-6 통과 (Preview/Production `/` 정상 렌더)
- 운영 설정 확인: `NEXTAUTH_DEBUG` 비활성화

## 결과 기록
- 실행 결과는 본 문서에 기록 (docs/는 로컬 보관)
- 실패 케이스는 GitHub Issue로 등록
