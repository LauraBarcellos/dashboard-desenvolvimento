 HEAD
# DevSight - Dev Metrics Dashboard

Dashboard para visualização de métricas de desenvolvimento, incluindo Lead Time, Cycle Time, Throughput e Aging.

## Configuração

O projeto está totalmente configurado e pronto para uso. Todas as dependências foram instaladas e os arquivos foram ajustados.

### Requisitos

- Node.js v24.11.1 ou superior
- npm v11.6.2 ou superior

### Instalação

```sh
npm install
```

## Scripts Disponíveis

### Desenvolvimento

```sh
npm run dev
```

Inicia o servidor de desenvolvimento com HMR em `http://localhost:8080`

### Build

```sh
npm run build
```

Cria uma versão otimizada para produção na pasta `dist/`

### Build Development

```sh
npm run build:dev
```

Cria uma versão para desenvolvimento

### Preview

```sh
npm run preview
```

Visualiza a versão compilada localmente

### Lint

```sh
npm run lint
```

Verifica qualidade do código com ESLint

### Testes

```sh
npm run test
```

Executa testes unitários com Vitest

```sh
npm run test:watch
```

Executa testes em modo watch

## Stack Tecnológico

- **React** 18.3.1 - Biblioteca UI
- **TypeScript** 5.8.3 - Tipagem estática
- **Vite** 5.4.19 - Build tool e dev server
- **Tailwind CSS** 3.4.17 - Estilização
- **shadcn/ui** - Componentes UI customizáveis
- **React Router** 6.30.1 - Roteamento
- **React Query** 5.83.0 - Gerenciamento de estado assíncrono
- **Recharts** 2.15.4 - Gráficos
- **Vitest** 3.2.4 - Testes unitários

## Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
│   ├── business/     # Componentes de negócio
│   ├── charts/       # Componentes de gráficos
│   ├── data/         # Componentes de dados
│   ├── filters/      # Componentes de filtros
│   ├── layout/       # Componentes de layout
│   ├── metrics/      # Componentes de métricas
│   ├── modals/       # Componentes modais
│   └── ui/           # Componentes UI da shadcn
├── contexts/         # Contextos React
├── data/             # Dados mock
├── hooks/            # Hooks customizados
├── lib/              # Utilitários
├── pages/            # Páginas
├── types/            # Tipos TypeScript
└── test/             # Testes
```

## Status da Aplicação

✅ Build: Funcionando  
✅ Testes: Passando  
✅ Lint: Sem erros críticos (8 warnings baixa prioridade)  
✅ Dependências: Todas instaladas
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
=======

 305ee0744f50df8cc7db3e57c29607542c84fbe4
