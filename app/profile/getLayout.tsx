import { ReactNode } from 'react';

interface ProfileLayoutProps {
  children: ReactNode;
}

export function getProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-8 border border-cyan-500">
        {children}
      </main>
    </div>
  );
}
