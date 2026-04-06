/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pilot_registrations");
  const field = collection.fields.getByName("kart_number");
  field.required = true;
  field.min = 1;
  field.max = 99;
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pilot_registrations");
  const field = collection.fields.getByName("kart_number");
  field.required = true;
  field.min = None;
  field.max = None;
  return app.save(collection);
})
