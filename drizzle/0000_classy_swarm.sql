CREATE TABLE `impact_stats` (
	`key` text PRIMARY KEY NOT NULL,
	`label_ko` text NOT NULL,
	`label_en` text NOT NULL,
	`value` text NOT NULL,
	`sort_order` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`title_ko` text NOT NULL,
	`title_en` text DEFAULT '' NOT NULL,
	`excerpt_ko` text DEFAULT '' NOT NULL,
	`excerpt_en` text DEFAULT '' NOT NULL,
	`content_ko` text NOT NULL,
	`content_en` text DEFAULT '' NOT NULL,
	`image_key` text,
	`category` text DEFAULT '일반' NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`is_pinned` integer DEFAULT false NOT NULL,
	`event_date` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`hero_title_ko` text NOT NULL,
	`hero_title_en` text NOT NULL,
	`hero_lead_ko` text NOT NULL,
	`hero_lead_en` text NOT NULL,
	`hero_body_ko` text NOT NULL,
	`hero_body_en` text NOT NULL,
	`hero_image_key` text,
	`mission_title_ko` text NOT NULL,
	`mission_title_en` text NOT NULL,
	`mission_body_ko` text NOT NULL,
	`mission_body_en` text NOT NULL,
	`platform_title_ko` text NOT NULL,
	`platform_title_en` text NOT NULL,
	`platform_body_ko` text NOT NULL,
	`platform_body_en` text NOT NULL,
	`vision_title_ko` text NOT NULL,
	`vision_title_en` text NOT NULL,
	`vision_body_ko` text NOT NULL,
	`vision_body_en` text NOT NULL,
	`donate_url` text NOT NULL,
	`updated_at` text NOT NULL
);
