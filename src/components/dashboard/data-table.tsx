'use client';

import * as React from 'react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useAppContext } from '@/context/app-state-provider';
import type { Requirement, UserStory, Stakeholder } from '@/lib/types';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends Requirement, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { userStories, stakeholders } = useAppContext();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: -1,
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    let finalY = 0;
    const pageMargin = 14;

    // Report Title
    doc.setFontSize(22);
    doc.text('Requirement Report', pageMargin, 20);

    // Requirements Table
    (doc as any).autoTable({
        head: [['Requirement', 'Classification', 'Priority']],
        body: table.getRowModel().rows.map(row => [
            row.original.description,
            row.original.type,
            row.original.priority,
        ]),
        startY: 30,
        headStyles: {
            fillColor: [45, 52, 129]
        },
        didDrawPage: function (data: any) {
          doc.setFontSize(18);
          doc.text('Requirement Repository', pageMargin, data.settings.margin.top);
        },
        margin: { top: 30 }
    });

    finalY = (doc as any).lastAutoTable.finalY || 0;

    const checkAndAddPage = () => {
        if (finalY > 250) {
            doc.addPage();
            finalY = 0;
        }
    }

    // User Stories
    if (userStories.length > 0) {
      checkAndAddPage();
      const userStoriesBody = userStories.flatMap(story => [
        [`As a ${story.userPersona}, I want to ${story.feature}, so that ${story.benefit}.`],
        ...story.acceptanceCriteria.map(ac => [{ content: `- ${ac}`, styles: { cellPadding: {left: 5}}} ]),
        [' '] // Spacer row
      ]);

      (doc as any).autoTable({
        startY: finalY + 15,
        head: [['User Stories']],
        body: userStoriesBody,
        theme: 'plain',
        headStyles: {
          fillColor: [45, 52, 129]
        },
        didDrawPage: function (data: any) {
            doc.setFontSize(18);
            doc.text('User Stories', pageMargin, data.settings.margin.top);
        },
        margin: { top: 30 }
      });
      finalY = (doc as any).lastAutoTable.finalY;
    }
    
    // Stakeholders
    if (stakeholders.length > 0) {
        checkAndAddPage();
        const stakeholdersBody = stakeholders.map(s => [s.role, s.description]);
        (doc as any).autoTable({
            startY: finalY + 15,
            head: [['Role', 'Description']],
            body: stakeholdersBody,
            headStyles: {
              fillColor: [45, 52, 129]
            },
            didDrawPage: function (data: any) {
              doc.setFontSize(18);
              doc.text('Stakeholders', pageMargin, data.settings.margin.top);
            },
            margin: { top: 30 }
        });
    }

    doc.save('report.pdf');
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="flex-1"></div>
        <Button onClick={exportToPDF} variant="outline" className="ml-auto">
          <Download className="mr-2 h-4 w-4" />
          Export Requirement
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
      </div>
    </div>
  );
}