/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("championship_likes");
  collection.indexes.push("CREATE UNIQUE INDEX idx_championship_likes_unique ON championship_likes (championship_id, visitor_fingerprint)");
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("championship_likes");
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_championship_likes_unique"));
  return app.save(collection);
})
