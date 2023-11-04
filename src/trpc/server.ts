import { headers } from "next/headers";

import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";

export const api = appRouter.createCaller({
  db: db,
  headers: headers(),
});
