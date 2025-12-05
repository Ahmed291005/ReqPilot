'use client';

import { useAppContext } from '@/context/app-state-provider';
import { columns } from './columns';
import { DataTable } from './data-table';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../ui/card';
import { EditRequirementDialog } from './edit-requirement-dialog';

export function RequirementsDashboard() {
  const { requirements } = useAppContext();

  return (
    <main className="flex-1 flex-col p-4 md:p-8 overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle>Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={requirements} />
        </CardContent>
      </Card>

      <EditRequirementDialog />
    </main>
  );
}
