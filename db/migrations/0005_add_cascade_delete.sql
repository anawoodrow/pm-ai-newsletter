-- Drop existing foreign key if it exists
DO $$ BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'articles_source_fkey'
    ) THEN
        ALTER TABLE articles DROP CONSTRAINT articles_source_fkey;
    END IF;
END $$;

-- Add new foreign key with cascade delete
ALTER TABLE articles
ADD CONSTRAINT articles_source_fkey
FOREIGN KEY (source)
REFERENCES sources(slug)
ON DELETE CASCADE; 