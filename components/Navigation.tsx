'use client';


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Users } from 'lucide-react';

import { cn } from '@/utils/utils';

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/timeline', label: 'Timeline', icon: Home },
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/friends', label: 'Friends', icon: Users },
  ];


  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">

            <Link href="/timeline" className="text-2xl font-bold text-gray-900">
              AppSocil
            </Link>
          </div>
          <div className="flex space-x-4">
            {links.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2  text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}


