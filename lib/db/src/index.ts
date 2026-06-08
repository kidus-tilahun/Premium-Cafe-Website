import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set.\n" +
      "For local development, use:\n" +
      "  export DATABASE_URL='postgresql://user:password@localhost:5432/cafe_db'\n" +
      "Or use a cloud database like:\n" +
      "  export DATABASE_URL='postgresql://...' (from Neon, Supabase, etc.)\n" +
      "See lib/db/drizzle.config.ts for migration commands.",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

export * from "./schema";
