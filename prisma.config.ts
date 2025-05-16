import path from 'node:path'
import dotenv from 'dotenv';
// @ts-expect-error: PrismaConfig type not available yet
import type { PrismaConfig } from 'prisma'


dotenv.config({ path: '.env.local' });

export default {
  earlyAccess: true,
  schema: path.join('prisma', 'schema'),
} satisfies PrismaConfig