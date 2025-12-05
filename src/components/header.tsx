'use client';

import Link from 'next/link';
import {
  Rocket,
  LayoutDashboard,
  Bot,
  PanelRight,
} from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useAppContext } from '@/context/app-state-provider';
import { generateReport } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    requirements,
    classifiedRequirements,
    setRequirements,
    setClassifiedRequirements,
    setUserStories,
    setStakeholders,
  } = useAppContext();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateReport = async () => {
    if (requirements.length === 0) {
      toast({
        title: 'No requirements to analyze',
        description:
          'Please describe your app idea first to generate some requirements.',
      });
      return;
    }
    setIsLoading(true);
    try {
      const { classifiedResult, userStories, stakeholders } =
        await generateReport(requirements, classifiedRequirements);

      const requirementMap = new Map(
        classifiedResult.map(cr => [cr.requirement, cr.type])
      );

      const typeOrder: Record<string, number> = {
        functional: 1,
        'non-functional': 2,
        domain: 3,
        inverse: 4,
      };

      const updatedReqs = requirements
        .map(req => ({
          ...req,
          type: requirementMap.get(req.description) || req.type,
        }))
        .sort(
          (a, b) => (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99)
        );

      setRequirements(updatedReqs);
      setClassifiedRequirements(classifiedResult);
      setUserStories(userStories);
      setStakeholders(stakeholders);
      
      toast({
        title: 'Requirements Extracted',
        description:
          "Navigating to the dashboard to view the extracted requirements.",
      });

      router.push('/dashboard');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        variant: 'destructive',
        title: 'Failed to Extract Requirements',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm z-20 relative">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold tracking-tight font-headline">
            ReqPilot
          </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              pathname === '/'
                ? 'bg-muted text-primary'
                : 'text-muted-foreground hover:bg-muted/50'
            )}
          >
            <Bot className="h-4 w-4" />
            Chat
          </Link>
          <Link
            href="/dashboard"
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              pathname === '/dashboard'
                ? 'bg-muted text-primary'
                : 'text-muted-foreground hover:bg-muted/50'
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={handleGenerateReport}
          disabled={isLoading || requirements.length === 0}
          className="shrink-0 hidden md:flex"
        >
          Extract Requirement
        </Button>
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
