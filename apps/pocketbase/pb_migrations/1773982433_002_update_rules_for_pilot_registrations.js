/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pilot_registrations");
  collection.listRule = "@request.auth.collectionName = 'admins'";
  collection.createRule = "";
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pilot_registrations");
  collection.createRule = "";
  collection.listRule = "@request.auth.collectionName = 'admins'";
  return app.save(collection);
})
