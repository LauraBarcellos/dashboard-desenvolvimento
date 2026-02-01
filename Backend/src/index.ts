import express, { Request, Response } from "express";
import cors from "cors";
import {
  fetchAllWorkItems,
  fetchWorkItemDetails,
  saveWorkItems,
} from "./azure";

const app = express();

app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Backend rodando");
});

app.get("/api", (_req: Request, res: Response) => {
  res.send("Backend conectado");
});

app.get("/test", async (_req: Request, res: Response) => {
  try {
    const wiql = await fetchAllWorkItems();
    const ids = wiql.workItems.map((w) => w.id);
    const details = await fetchWorkItemDetails(ids);

    await saveWorkItems(details);

    res.json({ saved: details.length });
  } catch {
    res.status(500).json({ error: "Erro ao processar dados" });
  }
});

app.listen(3001, "0.0.0.0");
