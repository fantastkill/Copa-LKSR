/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pilot_registrations");
  collection.indexes.push("CREATE UNIQUE INDEX idx_pilot_registrations_email ON pilot_registrations (email)");
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pilot_registrations");
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_pilot_registrations_email"));
  return app.save(collection);
})
