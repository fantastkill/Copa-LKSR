/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pilots");

  const record0 = new Record(collection);
    record0.set("full_name", "Luis Ferrari");
    record0.set("display_name", "Luis Ferrari");
    record0.set("kart_number", 7);
    record0.set("best_lap", "00:22.456");
    record0.set("final_position", 1);
    record0.set("podium_position", "1");
    record0.set("status", "approved");
    record0.set("slug", "luis-ferrari");
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
    record1.set("full_name", "Victor Antonio");
    record1.set("display_name", "Victor Antonio");
    record1.set("kart_number", 12);
    record1.set("best_lap", "00:22.507");
    record1.set("final_position", 2);
    record1.set("podium_position", "2");
    record1.set("status", "approved");
    record1.set("slug", "victor-antonio");
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
    record2.set("full_name", "Lucas Policarpo");
    record2.set("display_name", "Lucas Policarpo");
    record2.set("kart_number", 19);
    record2.set("best_lap", "00:22.417");
    record2.set("final_position", 3);
    record2.set("podium_position", "3");
    record2.set("status", "approved");
    record2.set("slug", "lucas-policarpo");
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
    record3.set("full_name", "Matheus Belisario");
    record3.set("display_name", "Matheus Belisario");
    record3.set("kart_number", 14);
    record3.set("best_lap", "00:22.859");
    record3.set("final_position", 4);
    record3.set("status", "approved");
    record3.set("slug", "matheus-belisario");
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
    record4.set("full_name", "Deyvis");
    record4.set("display_name", "Deyvis");
    record4.set("kart_number", 3);
    record4.set("best_lap", "00:24.049");
    record4.set("final_position", 5);
    record4.set("status", "approved");
    record4.set("slug", "deyvis");
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
    record5.set("full_name", "Vinicius Rodrigues");
    record5.set("display_name", "Vinicius Rodrigues");
    record5.set("kart_number", 17);
    record5.set("best_lap", "00:24.399");
    record5.set("final_position", 6);
    record5.set("status", "approved");
    record5.set("slug", "vinicius-rodrigues");
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
    record6.set("full_name", "Diego Ferrari");
    record6.set("display_name", "Diego Ferrari");
    record6.set("kart_number", 1);
    record6.set("best_lap", "00:25.864");
    record6.set("podium_position", "nc");
    record6.set("status", "approved");
    record6.set("slug", "diego-ferrari");
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
    record7.set("full_name", "Jo\u00e3o");
    record7.set("display_name", "Jo\u00e3o");
    record7.set("kart_number", 5);
    record7.set("best_lap", "00:24.182");
    record7.set("podium_position", "nc");
    record7.set("status", "approved");
    record7.set("slug", "joao");
  try {
    app.save(record7);
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
