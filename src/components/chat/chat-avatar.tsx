'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Message } from '@/lib/types';

interface ChatAvatarProps {
  role: Message['role'];
}

export function ChatAvatar({ role }: ChatAvatarProps) {
  if (role === 'user') {
    return (
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-secondary text-secondary-foreground"></AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
      <AvatarFallback className="bg-primary text-primary-foreground"></AvatarFallback>
    </Avatar>
  );
}
