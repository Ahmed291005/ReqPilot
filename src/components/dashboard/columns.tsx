'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Requirement } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Requirement>[] = [
  {
    accessorKey: 'description',
    header: 'Requirement',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue('description')}</div>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      const variant = type === 'functional' ? 'outline' : 'secondary';
      return (
        <Badge variant={variant} className="capitalize">
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const priority = row.getValue('priority') as string;
      const priorityVariant = {
        high: 'destructive',
        medium: 'default',
        low: 'secondary',
      } as const;
      return (
        <Badge
          variant={
            priorityVariant[priority as keyof typeof priorityVariant] ||
            'secondary'
          }
        >
          {priority}
        </Badge>
      );
    },
  },
];
