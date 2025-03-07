-- Make color required and remove icon
ALTER TABLE sources
ALTER COLUMN color SET NOT NULL;

ALTER TABLE sources
DROP COLUMN icon; 