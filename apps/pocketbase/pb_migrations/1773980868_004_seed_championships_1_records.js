/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("championships");

  const record0 = new Record(collection);
    record0.set("title", "Campeonato 2024");
    record0.set("event_date", "2024-01-15");
    record0.set("event_time", "14:00");
    record0.set("location", "Kart\u00f3dromo Local");
    record0.set("status", "upcoming");
    record0.set("description", "Campeonato de Kart 2024");
    record0.set("is_featured", true);
    record0.set("display_order", 1);
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})
