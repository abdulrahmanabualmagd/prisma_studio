import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const dbType = process.env.DB_TYPE || "LOCAL_LIMS";
const DATABASE_URL = process.env[`DATABASE_URL_${dbType}`];

if (DATABASE_URL) {
  process.env.DATABASE_URL = DATABASE_URL;
}

export default defineConfig({
  schema: `prisma/${dbType.toLowerCase()}.prisma`,
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: DATABASE_URL || env("DATABASE_URL"),
  },
});

console.log("\x1b[33m%s\x1b[0m", "=======================================");
console.log("\x1b[33m%s\x1b[0m", `Target DB: ${dbType}`);
console.log("\x1b[33m%s\x1b[0m", `Schema: prisma/${dbType.toLowerCase()}.prisma`);
console.log("\x1b[33m%s\x1b[0m", DATABASE_URL || env("DATABASE_URL"));
console.log("\x1b[33m%s\x1b[0m", "=======================================");

