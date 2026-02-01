import express from "express";
import {
  fetchAllWorkItems,
  fetchWorkItemDetails,
  saveWorkItems,
} from "./azure";

const app = express();

app.get("/", (_req, res) => {
  res.send("Backend funcionando 🚀");
});

app.get("/test", async (_req, res) => {
  try {
    const wiql = await fetchAllWorkItems();

    const ids = wiql.workItems.map((w: any) => w.id);

    const details = await fetchWorkItemDetails(ids);

    await saveWorkItems(details);

    res.json({
      saved: details.length,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: "Erro ao buscar ou salvar dados",
      details: err.message,
    });
  }
});

app.listen(3001, "0.0.0.0", () => {
  console.log("Backend rodando em http://0.0.0.0:3001");
});
