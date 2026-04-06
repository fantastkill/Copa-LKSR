/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("sponsors");

  const record0 = new Record(collection);
    record0.set("company_name", "OC COMPANY");
    record0.set("sponsor_type", "founder");
    record0.set("is_active", true);
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
