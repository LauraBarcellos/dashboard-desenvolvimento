import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShowcaseSection } from "@/features/styleguide/components/showcase-section";
import { MoreVertical } from "lucide-react";

const mockData = [
  { id: "1", nome: "Empresa Alpha", status: "ativo", projeto: "Portal Web", fase: "Desenvolvimento" },
  { id: "2", nome: "Beta Ltda", status: "ativo", projeto: "App Mobile", fase: "Design" },
  { id: "3", nome: "Gamma S.A.", status: "inativo", projeto: "E-commerce", fase: "Planejamento" },
  { id: "4", nome: "Delta Corp", status: "ativo", projeto: "Dashboard", fase: "Garantia" },
];

export default function TabelasPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Tabelas</h1>
        <p className="mt-1 text-muted-foreground">
          Table, TableHeader, TableBody, TableRow, TableHead, TableCell.
        </p>
      </div>

      <ShowcaseSection title="Tabela Padrão" description="Padrão usado em listagens do projeto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Projeto</TableHead>
              <TableHead>Fase</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.nome}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "ativo" ? "default" : "destructive"}>
                    {item.status === "ativo" ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell>{item.projeto}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.fase}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon-sm" aria-label="Ações">
                    <MoreVertical />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ShowcaseSection>
    </>
  );
}
