DO $$ BEGIN
    CREATE TYPE "source" AS ENUM ('cutlefish', 'oneknightinproduct', 'producttalk', 'mindtheproduct', 'hils', 'productcompass', 'superhuman');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "articles" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "title" text NOT NULL,
    "url" text NOT NULL UNIQUE,
    "description" text,
    "source" source NOT NULL,
    "image_url" text,
    "published_at" timestamp NOT NULL,
    "score" integer NOT NULL DEFAULT 0,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "article_history" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "article_id" uuid NOT NULL REFERENCES "articles"("id") ON DELETE CASCADE,
    "displayed_at" timestamp NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "scrape_metadata" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "last_scrape_at" timestamp NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "articles_score_published_at_idx" ON "articles"("score" DESC, "published_at" DESC);
CREATE INDEX IF NOT EXISTS "article_history_displayed_at_idx" ON "article_history"("displayed_at");
CREATE INDEX IF NOT EXISTS "scrape_metadata_last_scrape_at_idx" ON "scrape_metadata"("last_scrape_at" DESC); 