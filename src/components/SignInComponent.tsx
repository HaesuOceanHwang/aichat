'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

interface SignInComponentProps {
  providers: any;
}

export default function SignInComponent({ providers }: SignInComponentProps) {
  const socialProviders = {
    google: {
      id: 'google',
      name: 'Google',
      logo: '/google.svg',
      buttonStyle: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
    },
    naver: {
      id: 'naver',
      name: '네이버',
      logo: '/naver.svg',
      buttonStyle: 'border-[#2DB400] text-white bg-[#2DB400] hover:bg-[#28a000]',
    },
    apple: {
      id: 'apple',
      name: 'Apple',
      logo: '/apple.svg',
      buttonStyle: 'border-gray-900 text-white bg-gray-900 hover:bg-black',
    },
  };

  const handleSignIn = async (providerId: string) => {
    try {
      await signIn(providerId, {
        callbackUrl: '/',
        redirect: true,
      });
    } catch (error) {
      console.error('로그인 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      {Object.values(socialProviders).map((provider) => (
        <button
          key={provider.id}
          onClick={() => handleSignIn(provider.id)}
          className={`w-full flex items-center justify-center px-4 py-3 border rounded-md shadow-sm text-sm font-medium transition-colors ${provider.buttonStyle}`}
        >
          <Image
            src={provider.logo}
            alt={`${provider.name} logo`}
            width={20}
            height={20}
            className="mr-2"
          />
          {provider.name} 계정으로 로그인
        </button>
      ))}
    </div>
  );
} 