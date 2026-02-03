'use client';

import { useState } from 'react';
import { Mail, FileText, MapPin, Copy, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { Cliente } from '../types';
import type { Observacao } from '../types/observacao';
import { ClienteObservacoes } from './cliente-observacoes';
import { ClienteProjetoEditable } from './cliente-projeto-editable';

interface ClienteDetailsProps {
  cliente: Cliente;
  observacoes?: Observacao[];
  onAddObservacao?: (texto: string) => Promise<void>;
  onDeleteObservacao?: (observacaoId: string) => Promise<void>;
  onUpdateProjeto?: (data: Partial<Cliente>) => Promise<void>;
}

/**
 * Premium cliente details component
 * Fintech-secure personality: professional card layout, clear information hierarchy
 * Generous spacing, glassmorphism effects, rich color accents, sophisticated animations
 */
export function ClienteDetails({ cliente, observacoes = [], onAddObservacao, onDeleteObservacao, onUpdateProjeto }: ClienteDetailsProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success('Copiado!', {
        description: 'Informação copiada para a área de transferência.',
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error('Erro ao copiar', {
        description: 'Não foi possível copiar a informação.',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Informações Gerais - EDITÁVEL */}
      <ClienteProjetoEditable cliente={cliente} onUpdate={onUpdateProjeto} />

      {/* Informações de Contato e Adicionais - mesmo card */}
      <Card className="border-border bg-muted/30 shadow-sm">
        <CardContent className="pt-6 space-y-8">
          {/* Contact information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <Mail className="h-4 w-4 text-primary" strokeWidth={2} />
              </div>
              <h4 className="text-base font-semibold text-foreground">
                Informações de Contato
              </h4>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 w-full">
              {cliente.email && (
                <div className="group relative flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-muted/30 border border-border hover:border-primary/40 transition-all duration-200 w-full">
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">E-mail</p>
                    <a
                      href={`mailto:${cliente.email}`}
                      className="text-sm text-foreground hover:text-primary hover:underline break-words transition-colors font-medium block"
                    >
                      {cliente.email}
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(cliente.email!, 'email')}
                    className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary"
                    aria-label="Copiar e-mail"
                  >
                    {copiedField === 'email' ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}

              {cliente.telefone && (
                <div className="group relative flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-muted/30 border border-border hover:border-primary/40 transition-all duration-200 w-full">
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Telefone</p>
                    <a
                      href={`tel:${cliente.telefone.replace(/\D/g, '')}`}
                      className="text-sm text-foreground hover:text-primary hover:underline font-mono transition-colors font-medium block break-words"
                    >
                      {cliente.telefone}
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(cliente.telefone!, 'telefone')}
                    className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary"
                    aria-label="Copiar telefone"
                  >
                    {copiedField === 'telefone' ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Additional information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <FileText className="h-4 w-4 text-primary" strokeWidth={2} />
              </div>
              <h4 className="text-base font-semibold text-foreground">
                Informações Adicionais
              </h4>
            </div>
            {cliente.documento && (
              <div className="group relative flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-muted/30 border border-border hover:border-primary/40 transition-all duration-200 w-full">
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">CPF/CNPJ</p>
                  <p className="text-sm text-foreground font-mono font-medium break-words">{cliente.documento}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(cliente.documento!, 'documento')}
                  className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary"
                  aria-label="Copiar documento"
                >
                  {copiedField === 'documento' ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Endereço Detalhado */}
          {(cliente.cep || cliente.logradouro || cliente.bairro || cliente.cidade || cliente.estado || cliente.numero || cliente.complemento || cliente.endereco) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <MapPin className="h-4 w-4 text-primary" strokeWidth={2} />
                </div>
                <h4 className="text-base font-semibold text-foreground">
                  Endereço
                </h4>
              </div>
              {/* Card único com todas as informações de endereço */}
              <div className="group relative flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-muted/30 border border-border hover:border-primary/40 transition-all duration-200 w-full">
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Se tiver campos detalhados, exibir organizados */}
                  {(cliente.cep || cliente.logradouro || cliente.bairro || cliente.cidade || cliente.estado || cliente.numero || cliente.complemento) ? (
                    <>
                      {/* Logradouro completo (linha principal) */}
                      {(cliente.logradouro || cliente.numero) && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Logradouro</p>
                          <p className="text-sm text-foreground leading-relaxed font-medium break-words">
                            {[cliente.logradouro, cliente.numero].filter(Boolean).join(', ')}
                            {cliente.complemento && ` - ${cliente.complemento}`}
                          </p>
                        </div>
                      )}
                      
                      {/* Informações complementares em grid */}
                      {(cliente.bairro || cliente.cidade || cliente.estado || cliente.cep) && (
                        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 pt-2">
                          {cliente.bairro && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Bairro</p>
                              <p className="text-sm text-foreground break-words">{cliente.bairro}</p>
                            </div>
                          )}
                          {(cliente.cidade || cliente.estado) && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Cidade / Estado</p>
                              <p className="text-sm text-foreground break-words">
                                {[cliente.cidade, cliente.estado].filter(Boolean).join(' - ')}
                              </p>
                            </div>
                          )}
                          {cliente.cep && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">CEP</p>
                              <p className="text-sm text-foreground font-mono break-words">{cliente.cep}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    /* Fallback: endereço simples */
                    cliente.endereco && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Endereço</p>
                        <p className="text-sm text-foreground leading-relaxed font-medium break-words">{cliente.endereco}</p>
                      </div>
                    )
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    // Copiar endereço completo
                    const enderecoCompleto = (cliente.cep || cliente.logradouro || cliente.bairro || cliente.cidade || cliente.estado || cliente.numero || cliente.complemento)
                      ? [
                          cliente.logradouro && cliente.numero ? `${cliente.logradouro}, ${cliente.numero}${cliente.complemento ? ` - ${cliente.complemento}` : ''}` : null,
                          cliente.bairro,
                          cliente.cidade && cliente.estado ? `${cliente.cidade} - ${cliente.estado}` : cliente.cidade || cliente.estado,
                          cliente.cep
                        ].filter(Boolean).join(', ')
                      : cliente.endereco || '';
                    handleCopy(enderecoCompleto, 'endereco');
                  }}
                  className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary"
                  aria-label="Copiar endereço"
                >
                  {copiedField === 'endereco' ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Observations section - card separado */}
      <Card className="border-border bg-muted/30 shadow-sm">
        <CardContent className="pt-6">
          <ClienteObservacoes
            clienteId={cliente.id}
            observacoes={observacoes}
            onAddObservacao={onAddObservacao}
            onDeleteObservacao={onDeleteObservacao}
          />
        </CardContent>
      </Card>
    </div>
  );
}
