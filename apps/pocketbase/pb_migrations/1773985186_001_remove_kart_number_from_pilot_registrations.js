/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pilot_registrations");
  collection.fields.removeByName("kart_number");
  return app.save(collection);
}, (app) => {

  const collection = app.findCollectionByNameOrId("pilot_registrations");
  collection.fields.add(new NumberField({
    name: "kart_number",
    required: true,
    min: 1,
    max: 99
  }));
  return app.save(collection);
})
