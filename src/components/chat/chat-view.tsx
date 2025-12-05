'use client';

import { useState, useRef, useEffect } from 'react';
import { continueConversation } from '@/app/actions';
import type { Message, Requirement } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { useToast } from '@/hooks/use-toast';

import { useAppContext } from '@/context/app-state-provider';

import { cn } from '@/lib/utils';

const initialMessages: Message[] = [
  {
    id: crypto.randomUUID(),
    role: 'assistant',
    content:
      "Hello! I'm ReqPilot, your AI assistant for software requirement gathering. To start, please describe your application idea.",
    createdAt: new Date(),
  },
];

export function ChatView() {
  const { 
    setRequirements,
    isSidebarOpen,
   } = useAppContext();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (input: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      createdAt: new Date(),
    };

    const newMessages: Message[] = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
        const conversationForAI = newMessages.map(
          // Strip out the complex data fields before sending to the AI
          ({ requirements, classifiedRequirements, userStories, stakeholders, ...rest }) => rest
        );
      
        const result = await continueConversation(conversationForAI);

        const updatedRequirements = result.updatedRequirements || [];
        setRequirements(updatedRequirements);

        const assistantResponse: Message = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: result.followUpQuestion,
            createdAt: new Date(),
          };

        setMessages(prev => [...prev, assistantResponse]);

    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        variant: 'destructive',
        title: 'An Error Occurred',
        description: errorMessage,
      });
      const assistantErrorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}`,
        createdAt: new Date(),
      };
      setMessages(prev => [...prev, assistantErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-1 overflow-hidden">
      <main className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1" viewportRef={viewportRef}>
          <div className="container mx-auto max-w-3xl space-y-6 p-4">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <ChatMessage
                message={{
                  id: 'loading',
                  role: 'assistant',
                  content: '',
                  createdAt: new Date(),
                }}
                isLoading
              />
            )}
          </div>
        </ScrollArea>
        <div className="border-t bg-background/95 p-4 backdrop-blur-sm">
          <div className="container mx-auto flex max-w-3xl flex-col gap-2">
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
      <aside
        className={cn(
          'w-full md:w-1/3 border-l overflow-y-auto p-4 transition-transform transform md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full',
          'absolute md:relative right-0 top-0 h-full bg-background z-10 md:z-0'
        )}
      >
        {/* The requirements display was here */}
      </aside>
    </div>
  );
}
