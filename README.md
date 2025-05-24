# AI Chat Web Application

Next.js 기반의 AI 채팅 웹 애플리케이션입니다. 소셜 로그인(Google, Naver)을 지원하며, 다양한 AI 캐릭터와 대화할 수 있습니다.

## 주요 기능

- 소셜 로그인 (Google, Naver)
- AI 캐릭터 선택
- 실시간 채팅 인터페이스
- 반응형 디자인

## 기술 스택

- Next.js 15.1.8
- TypeScript
- NextAuth.js
- Tailwind CSS

## 실행 방법

1. 프로젝트 클론
```bash
git clone https://github.com/HaesuOceanHwang/aichat.git
cd aichat
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 내용을 추가하세요:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Google OAuth
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# Naver OAuth
NAVER_CLIENT_ID=your-naver-client-id
NAVER_CLIENT_SECRET=your-naver-client-secret
```

4. 개발 서버 실행
```bash
npm run dev
```

5. 브라우저에서 확인
http://localhost:3000 으로 접속하세요.

## OAuth 설정 방법

### Google OAuth
1. [Google Cloud Console](https://console.cloud.google.com)에서 프로젝트 생성
2. OAuth 2.0 클라이언트 ID 생성
3. 승인된 리디렉션 URI에 `http://localhost:3000/api/auth/callback/google` 추가

### Naver OAuth
1. [Naver Developers](https://developers.naver.com/main/)에서 애플리케이션 등록
2. 서비스 URL: `http://localhost:3000`
3. Callback URL: `http://localhost:3000/api/auth/callback/naver`

## 주의사항

- 환경 변수 파일(.env.local)은 절대 GitHub에 커밋하지 마세요.
- 실제 서비스 배포 시에는 환경 변수의 값을 변경해야 합니다.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
