'use client';

import Link from 'next/link';
import {
  ClipboardList,
  LayoutDashboard,
  Bot,
  PanelRight,
} from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useAppContext } from '@/context/app-state-provider';

export function Header() {
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useAppContext();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm z-20 relative">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold tracking-tight font-headline">
            ReqPilot
          </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {pathname === '/' && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <PanelRight className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        )}
      </div>
    </header>
  );
}
