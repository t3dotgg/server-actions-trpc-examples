import { type Config } from "drizzle-kit";
import "better-sqlite3";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "better-sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
  tablesFilter: ["four-mutations_*"],
} satisfies Config;
