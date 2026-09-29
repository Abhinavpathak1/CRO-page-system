import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const trials = pgTable("trials", {
  id: serial("id").primaryKey(),
  studyId: varchar("study_id", { length: 32 }).notNull().unique(),
  title: text("title").notNull(),
  therapeuticArea: varchar("therapeutic_area", { length: 64 }).notNull(),
  phase: varchar("phase", { length: 16 }).notNull(),
  sites: integer("sites").notNull().default(0),
  enrolled: integer("enrolled").notNull().default(0),
  target: integer("target").notNull().default(0),
  compliance: integer("compliance").notNull().default(0),
  safety: varchar("safety", { length: 16 }).notNull().default("Normal"),
  status: varchar("status", { length: 16 }).notNull().default("Active"),
  country: varchar("country", { length: 64 }).notNull().default("India"),
  sponsor: varchar("sponsor", { length: 128 }).notNull().default("Internal"),
  startDate: timestamp("start_date", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const sites = pgTable("sites", {
  id: serial("id").primaryKey(),
  siteCode: varchar("site_code", { length: 16 }).notNull().unique(),
  name: text("name").notNull(),
  country: varchar("country", { length: 64 }).notNull(),
  city: varchar("city", { length: 64 }).notNull(),
  pi: varchar("pi", { length: 128 }).notNull(),
  screened: integer("screened").notNull().default(0),
  enrolled: integer("enrolled").notNull().default(0),
  screenFailure: integer("screen_failure").notNull().default(0),
  deviations: integer("deviations").notNull().default(0),
  performance: varchar("performance", { length: 24 }).notNull().default("Good"),
  status: varchar("status", { length: 16 }).notNull().default("Operational"),
});

export const auditEvents = pgTable("audit_events", {
  id: serial("id").primaryKey(),
  ts: timestamp("ts", { withTimezone: true }).defaultNow().notNull(),
  user: varchar("user", { length: 128 }).notNull(),
  role: varchar("role", { length: 64 }).notNull(),
  action: varchar("action", { length: 32 }).notNull(),
  study: varchar("study", { length: 32 }).notNull(),
  record: varchar("record", { length: 64 }).notNull(),
  oldValue: text("old_value"),
  newValue: text("new_value"),
  ip: varchar("ip", { length: 64 }).notNull(),
  hash: varchar("hash", { length: 64 }).notNull(),
  meta: jsonb("meta"),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  ts: timestamp("ts", { withTimezone: true }).defaultNow().notNull(),
  actor: varchar("actor", { length: 128 }).notNull(),
  role: varchar("role", { length: 64 }).notNull(),
  message: text("message").notNull(),
  study: varchar("study", { length: 32 }),
});
