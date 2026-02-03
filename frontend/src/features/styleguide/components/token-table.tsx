import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TokenRow {
  token: string;
  value: string;
  preview?: React.ReactNode;
}

interface TokenTableProps {
  headers: string[];
  rows: TokenRow[];
}

export function TokenTable({ headers, rows }: TokenTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((h) => (
            <TableHead key={h}>{h}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.token}>
            <TableCell className="font-mono text-xs">{row.token}</TableCell>
            <TableCell className="text-sm">{row.value}</TableCell>
            {row.preview && <TableCell>{row.preview}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
