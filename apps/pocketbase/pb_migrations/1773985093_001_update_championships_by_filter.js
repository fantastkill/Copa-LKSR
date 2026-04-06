/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  let records;
  try {
    records = app.findRecordsByFilter("championships", "title='ETAPA 2'");
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("No records found, skipping");
      return;
    }
    throw e;
  }
  
  for (const record of records) {
    record.set("event_date", "2026-02-28");
    record.set("event_time", "12:00");
    record.set("location", "Rua Domingo de Moraes 2564 \u2013 Shopping Metro Santa Cruz, Piso G4 \u2013 Vila Mariana, S\u00e3o Paulo \u2013 SP, 04036-100");
    try {
      app.save(record);
    } catch (e) {
      if (e.message.includes("Value must be unique")) {
        console.log("Record with unique value already exists, skipping");
      } else {
        throw e;
      }
    }
  }
}, (app) => {
  // Rollback: original values not stored, manual restore needed
})
