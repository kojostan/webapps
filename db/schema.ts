import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const entries=sqliteTable('entries',{id:text('id').primaryKey(),payload:text('payload').notNull(),deleted:integer('deleted').notNull().default(0)});
