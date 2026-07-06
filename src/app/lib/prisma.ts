import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { envVars } from "../config/env.js";

const connectionString = `${envVars.DATABASE_URL}`;

const pool = new Pool({ connectionString });
pool.on("connect", (client) => {
  client.query("SET search_path TO sample, public;");
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter }) as any;

export { prisma };
