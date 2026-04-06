/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("championships");

  const record0 = new Record(collection);
    record0.set("title", "ETAPA 1 - GP INTERLAGOS");
    record0.set("event_date", "2026-04-15");
    record0.set("event_time", "14:00");
    record0.set("location", "S\u00e3o Paulo, SP");
    record0.set("status", "upcoming");
    record0.set("description", "Primeira etapa do campeonato");
    record0.set("is_featured", false);
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
    record1.set("title", "ETAPA 2 - GP GRANJA VIANA");
    record1.set("event_date", "2026-05-20");
    record1.set("event_time", "09:00");
    record1.set("location", "Cotia, SP");
    record1.set("status", "upcoming");
    record1.set("description", "Segunda etapa do campeonato");
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
    record2.set("title", "ETAPA 3 - GP ALDEIA");
    record2.set("event_date", "2026-06-10");
    record2.set("event_time", "10:00");
    record2.set("location", "Barueri, SP");
    record2.set("status", "upcoming");
    record2.set("description", "Terceira etapa do campeonato");
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

  const record3 = new Record(collection);
    record3.set("title", "ETAPA 4 - GP NOVA ODESSA");
    record3.set("event_date", "2026-07-05");
    record3.set("event_time", "15:00");
    record3.set("location", "Nova Odessa, SP");
    record3.set("status", "upcoming");
    record3.set("description", "Quarta etapa do campeonato");
    record3.set("is_featured", false);
    record3.set("display_order", 4);
  try {
    app.save(record3);
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
