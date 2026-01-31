import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/work-items', async (req, res) => {
  try {
    const items = await prisma.workItem.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

app.listen(3001, () => {
  console.log('🚀 API rodando em http://localhost:3001');
});