"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ShowcaseSection } from "@/features/styleguide/components/showcase-section";

export default function FormulariosPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Formulários</h1>
        <p className="mt-1 text-muted-foreground">
          Input, Textarea, Select, Switch, Label. Padrão: React Hook Form + Zod + Shadcn Form.
        </p>
      </div>

      <ShowcaseSection title="Input">
        <div className="max-w-sm space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input-default">Nome</Label>
            <Input id="input-default" placeholder="Digite o nome..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="input-disabled">Desabilitado</Label>
            <Input id="input-disabled" placeholder="Campo desabilitado" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="input-error">Com erro</Label>
            <Input id="input-error" placeholder="Campo com erro" aria-invalid="true" />
            <p className="text-xs text-destructive">Campo obrigatório</p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Textarea">
        <div className="max-w-sm space-y-2">
          <Label htmlFor="textarea-demo">Observações</Label>
          <Textarea id="textarea-demo" placeholder="Digite suas observações..." />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Select">
        <div className="max-w-sm space-y-2">
          <Label>Status</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Switch">
        <div className="flex items-center gap-3">
          <Switch id="switch-demo" />
          <Label htmlFor="switch-demo">Notificações por e-mail</Label>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Padrão de Formulário" description="Layout típico de formulário no projeto">
        <form className="max-w-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="form-nome">Nome completo</Label>
            <Input id="form-nome" placeholder="João Silva" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="form-email">E-mail</Label>
            <Input id="form-email" type="email" placeholder="joao@exemplo.com" />
          </div>
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pf">Pessoa Física</SelectItem>
                <SelectItem value="pj">Pessoa Jurídica</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="form-obs">Observações</Label>
            <Textarea id="form-obs" placeholder="Observações adicionais..." />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button">
              Cancelar
            </Button>
            <Button type="button">Salvar</Button>
          </div>
        </form>
      </ShowcaseSection>
    </>
  );
}
