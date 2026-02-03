import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { ShowcaseSection } from "@/features/styleguide/components/showcase-section";

export default function NavegacaoPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Navegação</h1>
        <p className="mt-1 text-muted-foreground">Tabs, Pagination, Separator.</p>
      </div>

      <ShowcaseSection
        title="Tabs"
        description="Usado na página de detalhe do cliente (Informações, Projetos, Documentos, Timeline)"
      >
        <Tabs defaultValue="tab1" className="max-w-md">
          <TabsList>
            <TabsTrigger value="tab1">Informações</TabsTrigger>
            <TabsTrigger value="tab2">Projetos</TabsTrigger>
            <TabsTrigger value="tab3">Timeline</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-4">
            <p className="text-sm text-muted-foreground">Conteúdo da aba Informações.</p>
          </TabsContent>
          <TabsContent value="tab2" className="mt-4">
            <p className="text-sm text-muted-foreground">Conteúdo da aba Projetos.</p>
          </TabsContent>
          <TabsContent value="tab3" className="mt-4">
            <p className="text-sm text-muted-foreground">Conteúdo da aba Timeline.</p>
          </TabsContent>
        </Tabs>
      </ShowcaseSection>

      <ShowcaseSection
        title="Pagination"
        description="Usado na listagem de clientes e timeline"
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </ShowcaseSection>

      <ShowcaseSection title="Separator">
        <div className="space-y-4">
          <p className="text-sm">Conteúdo acima</p>
          <Separator />
          <p className="text-sm">Conteúdo abaixo</p>
        </div>
      </ShowcaseSection>
    </>
  );
}
