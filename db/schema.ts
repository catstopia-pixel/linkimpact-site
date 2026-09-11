import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const siteSettings = sqliteTable("site_settings", {
  id: integer("id").primaryKey(),
  heroTitleKo: text("hero_title_ko").notNull(),
  heroTitleEn: text("hero_title_en").notNull(),
  heroLeadKo: text("hero_lead_ko").notNull(),
  heroLeadEn: text("hero_lead_en").notNull(),
  heroBodyKo: text("hero_body_ko").notNull(),
  heroBodyEn: text("hero_body_en").notNull(),
  heroImageKey: text("hero_image_key"),
  missionTitleKo: text("mission_title_ko").notNull(),
  missionTitleEn: text("mission_title_en").notNull(),
  missionBodyKo: text("mission_body_ko").notNull(),
  missionBodyEn: text("mission_body_en").notNull(),
  platformTitleKo: text("platform_title_ko").notNull(),
  platformTitleEn: text("platform_title_en").notNull(),
  platformBodyKo: text("platform_body_ko").notNull(),
  platformBodyEn: text("platform_body_en").notNull(),
  visionTitleKo: text("vision_title_ko").notNull(),
  visionTitleEn: text("vision_title_en").notNull(),
  visionBodyKo: text("vision_body_ko").notNull(),
  visionBodyEn: text("vision_body_en").notNull(),
  donateUrl: text("donate_url").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const impactStats = sqliteTable("impact_stats", {
  key: text("key").primaryKey(),
  labelKo: text("label_ko").notNull(),
  labelEn: text("label_en").notNull(),
  value: text("value").notNull(),
  sortOrder: integer("sort_order").notNull(),
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type", { enum: ["notice", "activity"] }).notNull(),
  titleKo: text("title_ko").notNull(),
  titleEn: text("title_en").notNull().default(""),
  excerptKo: text("excerpt_ko").notNull().default(""),
  excerptEn: text("excerpt_en").notNull().default(""),
  contentKo: text("content_ko").notNull(),
  contentEn: text("content_en").notNull().default(""),
  imageKey: text("image_key"),
  galleryJson: text("gallery_json").notNull().default("[]"),
  category: text("category").notNull().default("일반"),
  status: text("status", { enum: ["draft", "published"] }).notNull().default("draft"),
  isPinned: integer("is_pinned", { mode: "boolean" }).notNull().default(false),
  eventDate: text("event_date"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [
  index("idx_posts_status_type_created").on(table.status, table.type, table.createdAt),
]);
