/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("championships");

  const record0 = new Record(collection);
    record0.set("title", "Championship 2024 - Round 1");
    record0.set("event_date", "2024-03-15");
    record0.set("event_time", "14:00");
    record0.set("location", "Kart\u00f3dromo Internacional");
    record0.set("status", "upcoming");
    record0.set("description", "First round of the 2024 championship season");
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

  const record1 = new Record(collection);
    record1.set("title", "Championship 2024 - Round 2");
    record1.set("event_date", "2024-04-19");
    record1.set("event_time", "15:00");
    record1.set("location", "Kart\u00f3dromo Sul");
    record1.set("status", "upcoming");
    record1.set("description", "Second round of the 2024 championship season");
    record1.set("is_featured", false);
    record1.set("display_order", 2);
  try {
    app.save(record1);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record2 = new Record(collection);
    record2.set("title", "Championship 2024 - Round 3");
    record2.set("event_date", "2024-05-24");
    record2.set("event_time", "14:30");
    record2.set("location", "Kart\u00f3dromo Norte");
    record2.set("status", "upcoming");
    record2.set("description", "Third round of the 2024 championship season");
    record2.set("is_featured", false);
    record2.set("display_order", 3);
  try {
    app.save(record2);
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
