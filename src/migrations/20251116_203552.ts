import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_square_url\` text,
  	\`sizes_square_width\` numeric,
  	\`sizes_square_height\` numeric,
  	\`sizes_square_mime_type\` text,
  	\`sizes_square_filesize\` numeric,
  	\`sizes_square_filename\` text,
  	\`sizes_small_url\` text,
  	\`sizes_small_width\` numeric,
  	\`sizes_small_height\` numeric,
  	\`sizes_small_mime_type\` text,
  	\`sizes_small_filesize\` numeric,
  	\`sizes_small_filename\` text,
  	\`sizes_medium_url\` text,
  	\`sizes_medium_width\` numeric,
  	\`sizes_medium_height\` numeric,
  	\`sizes_medium_mime_type\` text,
  	\`sizes_medium_filesize\` numeric,
  	\`sizes_medium_filename\` text,
  	\`sizes_large_url\` text,
  	\`sizes_large_width\` numeric,
  	\`sizes_large_height\` numeric,
  	\`sizes_large_mime_type\` text,
  	\`sizes_large_filesize\` numeric,
  	\`sizes_large_filename\` text,
  	\`sizes_xlarge_url\` text,
  	\`sizes_xlarge_width\` numeric,
  	\`sizes_xlarge_height\` numeric,
  	\`sizes_xlarge_mime_type\` text,
  	\`sizes_xlarge_filesize\` numeric,
  	\`sizes_xlarge_filename\` text,
  	\`sizes_og_url\` text,
  	\`sizes_og_width\` numeric,
  	\`sizes_og_height\` numeric,
  	\`sizes_og_mime_type\` text,
  	\`sizes_og_filesize\` numeric,
  	\`sizes_og_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_square_sizes_square_filename_idx\` ON \`media\` (\`sizes_square_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_small_sizes_small_filename_idx\` ON \`media\` (\`sizes_small_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_medium_sizes_medium_filename_idx\` ON \`media\` (\`sizes_medium_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_large_sizes_large_filename_idx\` ON \`media\` (\`sizes_large_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_xlarge_sizes_xlarge_filename_idx\` ON \`media\` (\`sizes_xlarge_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_og_sizes_og_filename_idx\` ON \`media\` (\`sizes_og_filename\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_full_screen_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_variant\` text DEFAULT 'default',
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_icon\` text,
  	\`link_size\` text DEFAULT 'default',
  	\`link_icon_right\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero_full_screen\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_full_screen_links_order_idx\` ON \`pages_blocks_hero_full_screen_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_full_screen_links_parent_id_idx\` ON \`pages_blocks_hero_full_screen_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_full_screen\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bg_variant\` text,
  	\`slug\` text,
  	\`background_media_id\` integer,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_full_screen_order_idx\` ON \`pages_blocks_hero_full_screen\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_full_screen_parent_id_idx\` ON \`pages_blocks_hero_full_screen\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_full_screen_path_idx\` ON \`pages_blocks_hero_full_screen\` (\`_path\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_hero_full_screen_slug_idx\` ON \`pages_blocks_hero_full_screen\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_full_screen_background_media_idx\` ON \`pages_blocks_hero_full_screen\` (\`background_media_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_content_height_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_variant\` text DEFAULT 'default',
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_icon\` text,
  	\`link_size\` text DEFAULT 'default',
  	\`link_icon_right\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero_content_height\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_content_height_links_order_idx\` ON \`pages_blocks_hero_content_height_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_content_height_links_parent_id_idx\` ON \`pages_blocks_hero_content_height_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_content_height\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bg_variant\` text,
  	\`slug\` text,
  	\`background_media_id\` integer,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_content_height_order_idx\` ON \`pages_blocks_hero_content_height\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_content_height_parent_id_idx\` ON \`pages_blocks_hero_content_height\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_content_height_path_idx\` ON \`pages_blocks_hero_content_height\` (\`_path\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_hero_content_height_slug_idx\` ON \`pages_blocks_hero_content_height\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_content_height_background_media_idx\` ON \`pages_blocks_hero_content_height\` (\`background_media_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_split_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_variant\` text DEFAULT 'default',
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_icon\` text,
  	\`link_size\` text DEFAULT 'default',
  	\`link_icon_right\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero_split\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_links_order_idx\` ON \`pages_blocks_hero_split_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_links_parent_id_idx\` ON \`pages_blocks_hero_split_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_split\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bg_variant\` text,
  	\`slug\` text,
  	\`media_side\` text DEFAULT 'right' NOT NULL,
  	\`aspect\` text DEFAULT 'auto' NOT NULL,
  	\`aspect_ratio\` numeric DEFAULT 1,
  	\`media_id\` integer,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_order_idx\` ON \`pages_blocks_hero_split\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_parent_id_idx\` ON \`pages_blocks_hero_split\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_path_idx\` ON \`pages_blocks_hero_split\` (\`_path\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_hero_split_slug_idx\` ON \`pages_blocks_hero_split\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_split_media_idx\` ON \`pages_blocks_hero_split\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`content\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_accordion\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_items_order_idx\` ON \`pages_blocks_accordion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_items_parent_id_idx\` ON \`pages_blocks_accordion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_accordion_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_variant\` text DEFAULT 'default',
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_icon\` text,
  	\`link_size\` text DEFAULT 'default',
  	\`link_icon_right\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_accordion\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_links_order_idx\` ON \`pages_blocks_accordion_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_links_parent_id_idx\` ON \`pages_blocks_accordion_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bg_variant\` text,
  	\`slug\` text,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_order_idx\` ON \`pages_blocks_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_parent_id_idx\` ON \`pages_blocks_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_path_idx\` ON \`pages_blocks_accordion\` (\`_path\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_accordion_slug_idx\` ON \`pages_blocks_accordion\` (\`slug\`);`)
  await db.run(sql`CREATE TABLE \`blogSlider\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`slug\` text,
  	\`blogs_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`blogs_id\`) REFERENCES \`blogs\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blogSlider_order_idx\` ON \`blogSlider\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blogSlider_parent_id_idx\` ON \`blogSlider\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blogSlider_path_idx\` ON \`blogSlider\` (\`_path\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`blogSlider_slug_idx\` ON \`blogSlider\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`blogSlider_blogs_idx\` ON \`blogSlider\` (\`blogs_id\`);`)
  await db.run(sql`CREATE TABLE \`flexItems_cards_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_variant\` text DEFAULT 'default',
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_icon\` text,
  	\`link_size\` text DEFAULT 'default',
  	\`link_icon_right\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`flexItems_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`flexItems_cards_links_order_idx\` ON \`flexItems_cards_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`flexItems_cards_links_parent_id_idx\` ON \`flexItems_cards_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`flexItems_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`card_header_title\` text,
  	\`card_header_description\` text,
  	\`card_header_right_text\` text,
  	\`card_header_link_type\` text DEFAULT 'reference',
  	\`card_header_link_new_tab\` integer,
  	\`card_header_link_variant\` text DEFAULT 'default',
  	\`card_header_link_url\` text,
  	\`card_header_link_label\` text,
  	\`card_header_link_icon\` text,
  	\`card_header_link_size\` text DEFAULT 'default',
  	\`card_header_link_icon_right\` integer,
  	\`card_overlay_title\` text,
  	\`card_overlay_description\` text,
  	\`card_overlay_link_type\` text DEFAULT 'reference',
  	\`card_overlay_link_new_tab\` integer,
  	\`card_overlay_link_variant\` text DEFAULT 'default',
  	\`card_overlay_link_url\` text,
  	\`card_overlay_link_label\` text,
  	\`card_overlay_link_icon\` text,
  	\`card_overlay_link_size\` text DEFAULT 'default',
  	\`card_overlay_link_icon_right\` integer,
  	\`card_content\` text,
  	\`link_items_align\` text DEFAULT 'start',
  	\`link_items_sizing\` text DEFAULT 'default',
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`flexItems\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`flexItems_cards_order_idx\` ON \`flexItems_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`flexItems_cards_parent_id_idx\` ON \`flexItems_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`flexItems_cards_media_idx\` ON \`flexItems_cards\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`flexItems\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bg_variant\` text,
  	\`slug\` text,
  	\`content\` text,
  	\`card_options_enabled_media\` integer DEFAULT true,
  	\`card_options_enabled_header\` integer DEFAULT true,
  	\`card_options_enabled_header_link\` integer DEFAULT false,
  	\`card_options_enabled_header_right_text\` integer DEFAULT false,
  	\`card_options_enabled_overlay\` integer DEFAULT false,
  	\`card_options_enabled_overlay_link\` integer DEFAULT false,
  	\`card_options_enabled_content\` integer DEFAULT false,
  	\`card_options_enabled_link\` integer DEFAULT false,
  	\`card_options_aspect_ratio\` numeric DEFAULT 1,
  	\`card_options_overlay_position\` text DEFAULT 'bottom',
  	\`card_options_max_columns\` text DEFAULT '3' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`flexItems_order_idx\` ON \`flexItems\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`flexItems_parent_id_idx\` ON \`flexItems\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`flexItems_path_idx\` ON \`flexItems\` (\`_path\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`flexItems_slug_idx\` ON \`flexItems\` (\`slug\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rich_text_with_blocks_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_variant\` text DEFAULT 'default',
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_icon\` text,
  	\`link_size\` text DEFAULT 'default',
  	\`link_icon_right\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_rich_text_with_blocks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_with_blocks_links_order_idx\` ON \`pages_blocks_rich_text_with_blocks_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_with_blocks_links_parent_id_idx\` ON \`pages_blocks_rich_text_with_blocks_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rich_text_with_blocks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bg_variant\` text,
  	\`slug\` text,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_with_blocks_order_idx\` ON \`pages_blocks_rich_text_with_blocks\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_with_blocks_parent_id_idx\` ON \`pages_blocks_rich_text_with_blocks\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_with_blocks_path_idx\` ON \`pages_blocks_rich_text_with_blocks\` (\`_path\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_rich_text_with_blocks_slug_idx\` ON \`pages_blocks_rich_text_with_blocks\` (\`slug\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bg_variant\` text,
  	\`slug\` text,
  	\`content\` text,
  	\`form_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_order_idx\` ON \`pages_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_parent_id_idx\` ON \`pages_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_path_idx\` ON \`pages_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_form_block_slug_idx\` ON \`pages_blocks_form_block\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_form_idx\` ON \`pages_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_posts_id_idx\` ON \`pages_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`short_title\` text NOT NULL,
  	\`short_description\` text NOT NULL,
  	\`content\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_image_idx\` ON \`posts\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_meta_meta_image_idx\` ON \`posts\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`blogs_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`value\` text,
  	\`desc\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blogs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blogs_details_order_idx\` ON \`blogs_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blogs_details_parent_id_idx\` ON \`blogs_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`blogs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text NOT NULL,
  	\`desc\` text NOT NULL,
  	\`location\` text,
  	\`content\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`blogs_image_idx\` ON \`blogs\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`blogs_updated_at_idx\` ON \`blogs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`blogs_created_at_idx\` ON \`blogs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`rich_text\` text,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_country\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`placeholder\` text,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_order_idx\` ON \`forms_blocks_country\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_parent_id_idx\` ON \`forms_blocks_country\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_path_idx\` ON \`forms_blocks_country\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_email\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`placeholder\` text,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_order_idx\` ON \`forms_blocks_email\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_parent_id_idx\` ON \`forms_blocks_email\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_path_idx\` ON \`forms_blocks_email\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_message\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`message\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_order_idx\` ON \`forms_blocks_message\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_parent_id_idx\` ON \`forms_blocks_message\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_path_idx\` ON \`forms_blocks_message\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`placeholder\` text,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_order_idx\` ON \`forms_blocks_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_parent_id_idx\` ON \`forms_blocks_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_path_idx\` ON \`forms_blocks_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_order_idx\` ON \`forms_blocks_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_parent_id_idx\` ON \`forms_blocks_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_state\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`placeholder\` text,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_order_idx\` ON \`forms_blocks_state\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_parent_id_idx\` ON \`forms_blocks_state\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_path_idx\` ON \`forms_blocks_state\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`placeholder\` text,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_order_idx\` ON \`forms_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_parent_id_idx\` ON \`forms_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_path_idx\` ON \`forms_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`placeholder\` text,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_order_idx\` ON \`forms_blocks_textarea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_parent_id_idx\` ON \`forms_blocks_textarea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_path_idx\` ON \`forms_blocks_textarea\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_date\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` text,
  	\`placeholder\` text,
  	\`description\` text,
  	\`disable_past_dates\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_date_order_idx\` ON \`forms_blocks_date\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_date_parent_id_idx\` ON \`forms_blocks_date\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_date_path_idx\` ON \`forms_blocks_date\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_date_time\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` text,
  	\`placeholder\` text,
  	\`description\` text,
  	\`disable_past_dates\` integer DEFAULT true,
  	\`time_interval_minutes\` numeric DEFAULT 30 NOT NULL,
  	\`start_time\` text DEFAULT '00:00' NOT NULL,
  	\`end_time\` text DEFAULT '00:00' NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_date_time_order_idx\` ON \`forms_blocks_date_time\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_date_time_parent_id_idx\` ON \`forms_blocks_date_time\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_date_time_path_idx\` ON \`forms_blocks_date_time\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_phone_enabled_countries\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`forms_blocks_phone\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_phone_enabled_countries_order_idx\` ON \`forms_blocks_phone_enabled_countries\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_phone_enabled_countries_parent_idx\` ON \`forms_blocks_phone_enabled_countries\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_phone\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`default_value\` text,
  	\`width\` numeric,
  	\`description\` text,
  	\`required\` integer,
  	\`placeholder\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_phone_order_idx\` ON \`forms_blocks_phone\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_phone_parent_id_idx\` ON \`forms_blocks_phone\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_phone_path_idx\` ON \`forms_blocks_phone\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_emails_order_idx\` ON \`forms_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_emails_parent_id_idx\` ON \`forms_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`submit_button_label\` text,
  	\`confirmation_type\` text DEFAULT 'message',
  	\`confirmation_message\` text,
  	\`redirect_type\` text DEFAULT 'reference',
  	\`redirect_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_updated_at_idx\` ON \`forms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`forms_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_rels_order_idx\` ON \`forms_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`forms_rels_parent_idx\` ON \`forms_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_rels_path_idx\` ON \`forms_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`forms_rels_pages_id_idx\` ON \`forms_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_order_idx\` ON \`form_submissions_submission_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_parent_id_idx\` ON \`form_submissions_submission_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_form_idx\` ON \`form_submissions\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_updated_at_idx\` ON \`form_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_created_at_idx\` ON \`form_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`blogs_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blogs_id\`) REFERENCES \`blogs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blogs_id_idx\` ON \`payload_locked_documents_rels\` (\`blogs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`navbar_nav_links_link_sub_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navbar_nav_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navbar_nav_links_link_sub_links_order_idx\` ON \`navbar_nav_links_link_sub_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navbar_nav_links_link_sub_links_parent_id_idx\` ON \`navbar_nav_links_link_sub_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navbar_nav_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navbar\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navbar_nav_links_order_idx\` ON \`navbar_nav_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navbar_nav_links_parent_id_idx\` ON \`navbar_nav_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navbar_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_variant\` text DEFAULT 'default',
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_icon\` text,
  	\`link_size\` text DEFAULT 'default',
  	\`link_icon_right\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navbar\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navbar_links_order_idx\` ON \`navbar_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navbar_links_parent_id_idx\` ON \`navbar_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navbar\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`navbar_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`navbar\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navbar_rels_order_idx\` ON \`navbar_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`navbar_rels_parent_idx\` ON \`navbar_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`navbar_rels_path_idx\` ON \`navbar_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`navbar_rels_pages_id_idx\` ON \`navbar_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`navbar_rels_posts_id_idx\` ON \`navbar_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_blocks_rich_text_with_blocks_field\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_blocks_rich_text_with_blocks_field_order_idx\` ON \`footer_blocks_rich_text_with_blocks_field\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_blocks_rich_text_with_blocks_field_parent_id_idx\` ON \`footer_blocks_rich_text_with_blocks_field\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_blocks_rich_text_with_blocks_field_path_idx\` ON \`footer_blocks_rich_text_with_blocks_field\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`footer_blocks_links_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_variant\` text DEFAULT 'default',
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_icon\` text,
  	\`link_size\` text DEFAULT 'default',
  	\`link_icon_right\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_blocks_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_blocks_links_links_order_idx\` ON \`footer_blocks_links_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_blocks_links_links_parent_id_idx\` ON \`footer_blocks_links_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_blocks_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_blocks_links_order_idx\` ON \`footer_blocks_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_blocks_links_parent_id_idx\` ON \`footer_blocks_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_blocks_links_path_idx\` ON \`footer_blocks_links\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`footer_blocks_icon_links_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_variant\` text DEFAULT 'default',
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_icon\` text,
  	\`link_size\` text DEFAULT 'default',
  	\`link_icon_right\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_blocks_icon_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_blocks_icon_links_links_order_idx\` ON \`footer_blocks_icon_links_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_blocks_icon_links_links_parent_id_idx\` ON \`footer_blocks_icon_links_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_blocks_icon_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_blocks_icon_links_order_idx\` ON \`footer_blocks_icon_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_blocks_icon_links_parent_id_idx\` ON \`footer_blocks_icon_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_blocks_icon_links_path_idx\` ON \`footer_blocks_icon_links\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_pages_id_idx\` ON \`footer_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_posts_id_idx\` ON \`footer_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`card_link_label\` text,
  	\`content\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_page_meta_meta_image_idx\` ON \`posts_page\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE TABLE \`site\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`favicon_id\` integer,
  	\`google_verification_code\` text,
  	\`google_tag_manager_id\` text,
  	\`google_analytics_id\` text,
  	\`cookie_consent_banner_enabled\` integer,
  	\`accept_button_label\` text DEFAULT 'Accept All' NOT NULL,
  	\`reject_button_label\` text DEFAULT 'Reject All' NOT NULL,
  	\`cookie_consent_banner_content\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`favicon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_logo_idx\` ON \`site\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`site_favicon_idx\` ON \`site\` (\`favicon_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_full_screen_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_full_screen\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_content_height_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_content_height\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_split_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_split\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_accordion_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_accordion\`;`)
  await db.run(sql`DROP TABLE \`blogSlider\`;`)
  await db.run(sql`DROP TABLE \`flexItems_cards_links\`;`)
  await db.run(sql`DROP TABLE \`flexItems_cards\`;`)
  await db.run(sql`DROP TABLE \`flexItems\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rich_text_with_blocks_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rich_text_with_blocks\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`blogs_details\`;`)
  await db.run(sql`DROP TABLE \`blogs\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_state\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_date\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_date_time\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_phone_enabled_countries\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_phone\`;`)
  await db.run(sql`DROP TABLE \`forms_emails\`;`)
  await db.run(sql`DROP TABLE \`forms\`;`)
  await db.run(sql`DROP TABLE \`forms_rels\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_submission_data\`;`)
  await db.run(sql`DROP TABLE \`form_submissions\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`navbar_nav_links_link_sub_links\`;`)
  await db.run(sql`DROP TABLE \`navbar_nav_links\`;`)
  await db.run(sql`DROP TABLE \`navbar_links\`;`)
  await db.run(sql`DROP TABLE \`navbar\`;`)
  await db.run(sql`DROP TABLE \`navbar_rels\`;`)
  await db.run(sql`DROP TABLE \`footer_blocks_rich_text_with_blocks_field\`;`)
  await db.run(sql`DROP TABLE \`footer_blocks_links_links\`;`)
  await db.run(sql`DROP TABLE \`footer_blocks_links\`;`)
  await db.run(sql`DROP TABLE \`footer_blocks_icon_links_links\`;`)
  await db.run(sql`DROP TABLE \`footer_blocks_icon_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`footer_rels\`;`)
  await db.run(sql`DROP TABLE \`posts_page\`;`)
  await db.run(sql`DROP TABLE \`site\`;`)
}
