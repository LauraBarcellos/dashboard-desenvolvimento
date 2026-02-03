import { z } from "zod";

export const metricasFiltersSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  tipos: z.array(z.enum(["Bug", "Task", "Story", "Epic"])),
  projetos: z.array(z.string()),
});
