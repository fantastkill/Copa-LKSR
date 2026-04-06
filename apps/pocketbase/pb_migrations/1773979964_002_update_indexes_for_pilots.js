/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pilots");
  collection.indexes.push("CREATE UNIQUE INDEX idx_pilots_slug ON pilots (slug)");
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pilots");
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_pilots_slug"));
  return app.save(collection);
})
