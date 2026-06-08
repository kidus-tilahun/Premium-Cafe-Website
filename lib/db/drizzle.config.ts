import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { defineConfig } from "drizzle-kit";

type PathLike = string;

function findDotenvFile(startDir = process.cwd()): string | null {
  let currentDir = startDir;

  while (true) {
    const candidate = path.join(currentDir, ".env");
    if (fs.existsSync(candidate)) {
      return candidate;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      return null;
    }
    currentDir = parentDir;
  }
}

const dotenvPath = findDotenvFile();
if (dotenvPath) {
  dotenv.config({ path: dotenvPath });
} else {
  dotenv.config();
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set to run migrations.\n" +
      "Example: export DATABASE_URL='postgresql://user:password@localhost:5432/cafe_db'",
  );
}
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
