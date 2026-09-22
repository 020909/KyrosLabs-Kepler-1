"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ComparisonRow = {
  metric: string;
  kepler: string;
  jev: string;
};

export function ComparisonTabs({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="mt-10 overflow-hidden rounded-[4px] border border-white/10">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="type-mono-label h-12 px-5 text-muted-foreground">
              Metric
            </TableHead>
            <TableHead className="type-mono-label h-12 px-5 text-signal">
              Kepler 1.2
            </TableHead>
            <TableHead className="type-mono-label h-12 px-5 text-muted-foreground">
              Jev (proprietary)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.metric}
              className="border-white/10 hover:bg-white/[0.02]"
            >
              <TableCell className="type-body-md px-5 py-4 text-muted-foreground">
                {row.metric}
              </TableCell>
              <TableCell className="type-body-md-strong px-5 py-4">
                {row.kepler}
              </TableCell>
              <TableCell className="type-body-md px-5 py-4 text-muted-foreground">
                {row.jev}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
