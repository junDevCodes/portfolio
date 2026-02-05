# M0 Foundation 결과 — 박지훈 (Backend)
작성일: 2026-02-05

## 변경사항 요약
- `prisma/schema.prisma`: datasource `url`/`directUrl` 추가, `User.isOwner` 필드 추가, Portfolio 스키마 들여쓰기 정리
- `prisma/seed.ts`: 오너 계정 upsert seed 스크립트 추가
- `package.json`: `seed` 스크립트와 `tsx` dev dependency 추가
- `src/lib/auth-guard.ts`: `getAuthSession`, `requireAuth`, `requireOwner`, 401/403 응답 유틸 추가
- `src/app/api/test/auth/route.ts`: 인증 테스트 엔드포인트 추가
- `src/app/api/test/owner/route.ts`: 오너 권한 테스트 엔드포인트 추가
- `.env.example`: `OWNER_NAME` 옵션 추가
- `docs/plan/member_박지훈_BE.md`: M0 체크리스트 업데이트

## Task 1 결과 — Prisma 스키마
- 완료: `prisma/schema.prisma` 생성, User/Account/Session/VerificationToken 모델 구성, 관계/인덱스 설정, `User.isOwner` 추가
- 미완료: `prisma migrate dev` 실행, 마이그레이션 파일 확인, 김민준(TL) 스키마 리뷰

## Task 2 결과 — Prisma 클라이언트
- 완료: PrismaClient 싱글톤 구성, 풀링용 `DATABASE_URL` 사용, dev 로그 설정, 환경 분리
- 미완료: `prisma generate` 실행, 테스트 쿼리(User.findMany) 실행, 정하은(DevOps) DB 연결 확인

## Task 3 결과 — Seed 스크립트
- 완료: `prisma/seed.ts` 작성, 오너 upsert 로직, `seed` 스크립트 추가
- 미완료: `npm run seed` 실행, DB 오너 계정 확인, Seed 데이터 문서화

## Task 4 결과 — API 가드
- 완료: `auth-guard` 유틸 작성, `requireAuth`/`requireOwner` 구현, 401/403 응답 표준화, 테스트 엔드포인트 추가
- 미완료: 비인증 401 확인, 비오너 403 확인 (현재 sign-in 정책상 비오너 로그인 불가)

## 실행 필요 명령
- `npx prisma migrate dev --name init`
- `npx prisma generate`
- `npm run seed`

## 비고/리스크
- 마이그레이션/seed는 `DATABASE_URL_UNPOOLED` 환경변수가 필요합니다.
- `OWNER_EMAIL` 미설정 시 seed가 실패합니다.

