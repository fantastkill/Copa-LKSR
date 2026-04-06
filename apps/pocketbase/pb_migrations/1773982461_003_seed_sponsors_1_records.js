/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("sponsors");

  const record0 = new Record(collection);
    record0.set("company_name", "Santa Cruz Kart");
    record0.set("address", "Santa Cruz do Rio Pardo, SP");
    record0.set("phone", "(14) 3372-1234");
    record0.set("website_url", "https://www.santacruzkarting.com.br");
    record0.set("hours", "Seg-Dom: 09:00 - 18:00");
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
