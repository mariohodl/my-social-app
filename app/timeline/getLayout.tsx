
import { ReactNode } from 'react';

interface TimelineLayoutProps {
  children: ReactNode;
}

export function getTimelineLayout({ children }: TimelineLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}


