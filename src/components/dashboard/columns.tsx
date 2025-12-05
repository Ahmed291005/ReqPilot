'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Requirement } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

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
      return <div className="capitalize">{type}</div>;
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const priority = row.getValue('priority') as string;
      return <div className="capitalize">{priority}</div>;
    },
  },
];
