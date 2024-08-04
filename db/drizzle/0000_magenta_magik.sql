CREATE TABLE IF NOT EXISTS "business_cards" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(255),
	"title" varchar(255),
	"company" varchar(255),
	"phone" varchar(255),
	"mobile" varchar(255),
	"email" varchar(255),
	"pokemon_id" integer,
	"pokemon_name" varchar(255),
	"pokemon_sprite_url" varchar(255),
	"notes" text,
	"image_url" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"clerk_user_id" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "business_cards" ADD CONSTRAINT "business_cards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
