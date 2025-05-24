'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">로그인</h2>
          <p className="mt-2 text-sm text-gray-600">
            소셜 계정으로 간편하게 로그인하세요
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <Image
              src="/google.svg"
              alt="Google logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Google 계정으로 로그인
          </button>
          
          <button
            onClick={() => signIn('naver', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center px-4 py-3 border border-[#2DB400] rounded-md shadow-sm text-sm font-medium text-white bg-[#2DB400] hover:bg-[#28a000] transition-colors"
          >
            <Image
              src="/naver.svg"
              alt="Naver logo"
              width={20}
              height={20}
              className="mr-2"
            />
            네이버 계정으로 로그인
          </button>

          <button
            onClick={() => signIn('apple', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-900 rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-black transition-colors"
          >
            <Image
              src="/apple.svg"
              alt="Apple logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Apple 계정으로 로그인
          </button>
        </div>
      </div>
    </div>
  );
} 