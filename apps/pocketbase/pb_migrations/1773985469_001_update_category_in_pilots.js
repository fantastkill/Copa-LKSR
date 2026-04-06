/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pilots");
  const field = collection.fields.getByName("category");
  field.values = ["PRO", "LIGHT"];
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pilots");
  const field = collection.fields.getByName("category");
  field.values = ["Categoria 1", "Categoria 2"];
  return app.save(collection);
})
