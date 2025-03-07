/*
<ai_context>
Exports the database schema for the app.
</ai_context>
*/

export * from "./articles-schema"
export * from "./profiles-schema"
export * from "./sources-schema"
export * from "./todos-schema"
export * from "./scrape-metadata-schema"

import { articlesTable } from "./articles-schema"
import { sourcesTable } from "./sources-schema"

export const articles = articlesTable
export const sources = sourcesTable
