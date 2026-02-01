import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const app = express();

const sqliteAdapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || 'file:./dev.db' });
const prisma = new PrismaClient({ adapter: sqliteAdapter });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API running', endpoints: { workItems: '/api/work-items' } });
});

app.get('/api/work-items', async (req, res) => {
  try {
    const items = await prisma.workItem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (error) {
    console.error('❌ Erro no banco:', error);
    res.status(500).json({ error: 'Erro ao buscar dados.' });
  }
});

app.post('/api/webhook/n8n', async (req, res) => {
  try {
    const payload = req.body;
    const workItems = Array.isArray(payload)
      ? payload
      : payload?.body?.workItems ?? payload?.workItems ?? payload;
    const items = Array.isArray(workItems) ? workItems : [workItems];

    for (const wi of items) {
      const record = {
        externalId: String(wi['System.Id'] ?? wi.externalId ?? wi.id),
        title: wi['System.Title'] ?? wi.title ?? '',
        status: wi['System.State'] ?? wi.status ?? '',
        type: wi['System.WorkItemType'] ?? wi.type ?? '',
        project: wi['System.TeamProject'] ?? wi.project ?? null,
        createdAt: wi['System.CreatedDate'] ? new Date(wi['System.CreatedDate']) : (wi.createdAt ? new Date(wi.createdAt) : new Date()),
        resolvedAt: wi['Microsoft.VSTS.Common.ResolvedDate'] ? new Date(wi['Microsoft.VSTS.Common.ResolvedDate']) : (wi.resolvedAt ? new Date(wi.resolvedAt) : null),
        closedAt: wi['Microsoft.VSTS.Common.ClosedDate'] ? new Date(wi['Microsoft.VSTS.Common.ClosedDate']) : (wi.closedAt ? new Date(wi.closedAt) : null),
      };

      await prisma.workItem.upsert({
        where: { externalId: record.externalId },
        update: record,
        create: record,
      });
    }

    res.json({ ok: true });
  } catch (e) {
    console.error('❌ Webhook processing error:', e);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

app.post('/api/work-items/ids', async (req, res) => {
  const ids = req.body.ids ?? req.body;
  if (!ids || !Array.isArray(ids)) return res.status(400).json({ error: 'Expected { ids: string[] }' });
  try {
    const items = await prisma.workItem.findMany({ where: { externalId: { in: ids } } });
    res.json(items);
  } catch (e) {
    console.error('❌ Error fetching by ids:', e);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

async function ensureSeeded() {
  const count = await prisma.workItem.count();
  if (count === 0) {
    const now = new Date();
    const sample = [
      {
        externalId: 'WI-001',
        title: 'Sample metric - Active',
        type: 'metric',
        status: 'active',
        project: 'devsight',
        createdAt: now
      },
      {
        externalId: 'WI-002',
        title: 'Sample metric - Activated',
        type: 'metric',
        status: 'activated',
        project: 'devsight',
        createdAt: new Date(now.getTime() - 1000 * 60 * 60),
        resolvedAt: now
      },
      {
        externalId: 'WI-003',
        title: 'Sample metric - Closed',
        type: 'metric',
        status: 'closed',
        project: 'devsight',
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24),
        resolvedAt: new Date(now.getTime() - 1000 * 60 * 60 * 23),
        closedAt: now
      }
    ];

    await prisma.workItem.createMany({ data: sample });
    console.log(`🌱 Seeded ${sample.length} work items`);
  }
}

const PORT = 3001;
app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    await ensureSeeded();
    console.log(`🚀 Servidor pronto em http://localhost:${PORT}`);
    console.log(`📡 Banco de dados conectado!`);
  } catch (e) {
    console.error('❌ Falha ao conectar no banco:', e);
  }
});