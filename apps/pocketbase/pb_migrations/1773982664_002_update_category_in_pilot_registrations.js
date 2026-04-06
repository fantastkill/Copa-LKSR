/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pilot_registrations");
  const field = collection.fields.getByName("category");
  field.required = true;
  field.values = ["Categoria 1", "Categoria 2"];
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pilot_registrations");
  const field = collection.fields.getByName("category");
  field.required = true;
  field.values = ["Categoria 1", "Categoria 2"];
  return app.save(collection);
})
