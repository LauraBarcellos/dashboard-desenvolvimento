import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ORG = "deviobr";
const PAT = process.env.AZURE_PAT!;

export async function fetchAllWorkItems() {
  const response = await fetch(
    `https://dev.azure.com/${ORG}/_apis/wit/wiql?api-version=6.0`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Basic ${Buffer.from(
          ":" + PAT
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        query: `
          SELECT
            [System.Id],
            [System.Title],
            [System.State],
            [System.WorkItemType],
            [System.TeamProject],
            [System.CreatedDate],
            [Microsoft.VSTS.Common.ActivatedDate],
            [Microsoft.VSTS.Common.ResolvedDate],
            [Microsoft.VSTS.Common.ClosedDate]
          FROM workitems
          WHERE
            [System.CreatedDate] >= '2025-01-01T00:00:00Z'
            AND [System.WorkItemType] IN (
              'Bug',
              'User Story',
              'Ajuste'
            )
          ORDER BY [System.CreatedDate] DESC
        `,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Azure error ${response.status}: ${await response.text()}`
    );
  }

  return response.json();
}

export async function fetchWorkItemDetails(ids: number[]) {
  const batches: number[][] = [];
  const results: any[] = [];

  while (ids.length) {
    batches.push(ids.splice(0, 200));
  }

  for (const batch of batches) {
    const response = await fetch(
      `https://dev.azure.com/deviobr/_apis/wit/workitems?ids=${batch.join(
        ","
      )}&api-version=6.0`,
      {
        headers: {
          "Accept": "application/json",
          "Authorization": `Basic ${Buffer.from(
            ":" + PAT
          ).toString("base64")}`,
        },
      }
    );

    const data = await response.json();
    results.push(...data.value);
  }

  return results;
}

export async function saveWorkItems(items: any[]) {
  for (const item of items) {
    const f = item.fields;

    await prisma.workItem.upsert({
      where: { id: item.id },
      update: {
        title: f["System.Title"],
        type: f["System.WorkItemType"],
        status: f["System.State"],
        project: f["System.TeamProject"],
        createdAt: new Date(f["System.CreatedDate"]),
        activatedAt: f["Microsoft.VSTS.Common.ActivatedDate"]
          ? new Date(f["Microsoft.VSTS.Common.ActivatedDate"])
          : null,
        closedAt: f["Microsoft.VSTS.Common.ClosedDate"]
          ? new Date(f["Microsoft.VSTS.Common.ClosedDate"])
          : null,
      },
      create: {
        id: item.id,
        title: f["System.Title"],
        type: f["System.WorkItemType"],
        status: f["System.State"],
        project: f["System.TeamProject"],
        createdAt: new Date(f["System.CreatedDate"]),
        activatedAt: f["Microsoft.VSTS.Common.ActivatedDate"]
          ? new Date(f["Microsoft.VSTS.Common.ActivatedDate"])
          : null,
        closedAt: f["Microsoft.VSTS.Common.ClosedDate"]
          ? new Date(f["Microsoft.VSTS.Common.ClosedDate"])
          : null,
      },
    });
  }
}
