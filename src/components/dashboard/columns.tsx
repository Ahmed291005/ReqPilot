'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Requirement } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<Requirement>[] = [
  {
    accessorKey: 'description',
    header: 'Requirement',
    cell: ({ row }) => <div className="text-left">{row.getValue('description')}</div>
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
        const type = row.getValue('type') as string;
        const variant = type === 'functional' ? 'outline' : 'secondary';
        return <Badge variant={variant} className="capitalize">{type}</Badge>;
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
        const priority = row.getValue('priority') as string;
        const priorityVariant = {
            high: 'destructive',
            medium: 'default',
            low: 'secondary',
          } as const;
        return <Badge variant={priorityVariant[priority as keyof typeof priorityVariant] || 'secondary'}>{priority}</Badge>;
    },
  },
];
