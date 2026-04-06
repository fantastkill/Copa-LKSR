/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pilot_comments");
  collection.listRule = "status = 'approved'";
  collection.viewRule = "status = 'approved'";
  collection.createRule = "";
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pilot_comments");
  collection.createRule = "";
  collection.listRule = "status = 'approved'";
  collection.viewRule = "status = 'approved'";
  return app.save(collection);
})
