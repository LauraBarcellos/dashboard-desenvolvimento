import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando o povoamento do banco de dados...');

  await prisma.workItem.deleteMany();

  const projects = ['Fênix', 'Apolo', 'Nexus', 'Gênesis'];
  const types = ['Feature', 'Bug', 'Debt', 'Task'];
  const statusList = ['todo', 'doing', 'done', 'closed'];

  for (let i = 0; i < 50; i++) {
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));

    const activatedAt = Math.random() > 0.2 ? new Date(createdAt.getTime() + 86400000) : null;
    const closedAt = (activatedAt && Math.random() > 0.5) 
      ? new Date(activatedAt.getTime() + 172800000) 
      : null;

    await prisma.workItem.create({
      data: {
        externalId: `TASK-${1000 + i}`,
        title: `Tarefa de Desenvolvimento ${i + 1}`,
        type: types[Math.floor(Math.random() * types.length)] ?? 'Feature',
        status: statusList[Math.floor(Math.random() * statusList.length)] ?? 'todo',
        project: projects[Math.floor(Math.random() * projects.length)] ?? 'Fênix',
        createdAt,
        activatedAt,
        closedAt,
      },
    });
  }

  console.log('✅ Banco de dados populado com sucesso (50 itens)!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });