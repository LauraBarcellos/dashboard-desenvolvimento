import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Backend rodando");
});

app.get("/dashboard/metrics", async (_req: Request, res: Response) => {
  try {
    const now = new Date();
    const start2025 = new Date("2025-01-01T00:00:00Z");

    const items = await prisma.workItem.findMany({
      where: {
        createdAt: {
          gte: start2025,
        },
      },
    });

    const concludedDate = (i: any) =>
      i.closedAt ?? i.resolvedAt ?? null;

    const daysBetween = (a: Date, b: Date) =>
      (b.getTime() - a.getTime()) / 86400000;

    const cycleTimeByType = (type: string) => {
      const values = items
        .filter(
          i =>
            i.type === type &&
            i.activatedAt &&
            concludedDate(i)
        )
        .map(i =>
          daysBetween(i.activatedAt!, concludedDate(i)!)
        );

      return values.length
        ? values.reduce((a, b) => a + b, 0) / values.length
        : null;
    };

    const throughputByType = (type: string) =>
      items.filter(
        i =>
          i.type === type &&
          concludedDate(i)
      ).length;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const bugsOpenedLast30Days = items.filter(
      i =>
        i.type === "Bug" &&
        i.createdAt >= thirtyDaysAgo &&
        !concludedDate(i)
    ).length;

    const bugsClosedLast30Days = items.filter(
      i =>
        i.type === "Bug" &&
        concludedDate(i) &&
        concludedDate(i)! >= thirtyDaysAgo
    ).length;

    const agingValues = items.map(i =>
      daysBetween(
        i.createdAt,
        concludedDate(i) ?? now
      )
    );

    const agingAvg = agingValues.length
      ? agingValues.reduce((a, b) => a + b, 0) / agingValues.length
      : null;

    res.json({
      cycleTime: {
        userStory: cycleTimeByType("User Story"),
        bug: cycleTimeByType("Bug"),
        ajuste: cycleTimeByType("Ajuste"),
      },
      throughput: {
        userStory: throughputByType("User Story"),
        bug: throughputByType("Bug"),
        ajuste: throughputByType("Ajuste"),
      },
      bugs: {
        opened: bugsOpenedLast30Days,
        closed: bugsClosedLast30Days,
      },
      agingAvg,
      windowDays: 30,
    });
  } catch {
    res.status(500).json({ error: "Erro ao calcular métricas" });
  }
});

app.listen(3001, "0.0.0.0");
