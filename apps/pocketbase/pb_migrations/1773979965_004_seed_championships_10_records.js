/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("championships");

  const record0 = new Record(collection);
    record0.set("title", "Etapa 1");
    record0.set("event_date", "2026-02-28");
    record0.set("event_time", "14:00");
    record0.set("status", "finished");
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
    record1.set("title", "Etapa 2");
    record1.set("event_date", "2026-03-28");
    record1.set("event_time", "12:00");
    record1.set("status", "upcoming");
    record1.set("is_featured", true);
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
    record2.set("title", "Etapa 3");
    record2.set("event_date", "2026-04-18");
    record2.set("event_time", "12:00");
    record2.set("status", "upcoming");
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
    record3.set("title", "Etapa 4");
    record3.set("event_date", "2026-05-22");
    record3.set("event_time", "12:00");
    record3.set("status", "upcoming");
  try {
    app.save(record3);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record4 = new Record(collection);
    record4.set("title", "Etapa 5");
    record4.set("event_date", "2026-06-27");
    record4.set("event_time", "12:00");
    record4.set("status", "upcoming");
  try {
    app.save(record4);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record5 = new Record(collection);
    record5.set("title", "Etapa 6");
    record5.set("event_date", "2026-07-18");
    record5.set("event_time", "12:00");
    record5.set("status", "upcoming");
  try {
    app.save(record5);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record6 = new Record(collection);
    record6.set("title", "Etapa 7");
    record6.set("event_date", "2026-08-29");
    record6.set("event_time", "12:00");
    record6.set("status", "upcoming");
  try {
    app.save(record6);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record7 = new Record(collection);
    record7.set("title", "Etapa 8");
    record7.set("event_date", "2026-09-19");
    record7.set("event_time", "12:00");
    record7.set("status", "upcoming");
  try {
    app.save(record7);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record8 = new Record(collection);
    record8.set("title", "Etapa 9");
    record8.set("event_date", "2026-10-31");
    record8.set("event_time", "12:00");
    record8.set("status", "upcoming");
  try {
    app.save(record8);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record9 = new Record(collection);
    record9.set("title", "Etapa 10");
    record9.set("event_date", "2026-11-28");
    record9.set("event_time", "12:00");
    record9.set("status", "upcoming");
  try {
    app.save(record9);
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
