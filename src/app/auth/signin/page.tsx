import { getProviders } from 'next-auth/react';
import SignInComponent from '@/components/SignInComponent';

export default async function SignIn() {
  const providers = await getProviders();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">로그인</h2>
          <p className="mt-2 text-sm text-gray-600">
            AI 캐릭터와의 대화를 시작하세요
          </p>
        </div>
        <SignInComponent providers={providers} />
      </div>
    </div>
  );
} 