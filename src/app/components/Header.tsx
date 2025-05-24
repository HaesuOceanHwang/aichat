'use client';

import { Bell, Settings, UserCircle } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAuthClick = () => {
    if (session) {
      signOut();
    } else {
      router.push('/auth/signin');
    }
  };

  return (
    <header className="fixed top-0 right-0 p-4 z-50">
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative group">
          <Bell className="w-6 h-6 text-white" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="absolute hidden group-hover:block right-0 mt-2 bg-black/75 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
            알림
          </span>
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative group">
          <Settings className="w-6 h-6 text-white" />
          <span className="absolute hidden group-hover:block right-0 mt-2 bg-black/75 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
            설정
          </span>
        </button>
        <button 
          onClick={handleAuthClick}
          className="p-2 hover:bg-white/10 rounded-full transition-colors relative group"
        >
          {session?.user?.image ? (
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <Image
                src={session.user.image}
                alt={session.user.name || '프로필'}
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <UserCircle className="w-6 h-6 text-white" />
          )}
          <span className="absolute hidden group-hover:block right-0 mt-2 bg-black/75 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
            {session ? '로그아웃' : '로그인'}
          </span>
        </button>
      </div>
    </header>
  );
} 