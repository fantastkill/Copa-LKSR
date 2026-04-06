/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pilots");

  const record0 = new Record(collection);
    record0.set("full_name", "Luis Ferrari");
    record0.set("display_name", "LF");
    record0.set("kart_number", 7);
    record0.set("status", "approved");
    record0.set("category", "categoria_1");
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
    record1.set("display_name", "VA");
    record1.set("kart_number", 12);
    record1.set("status", "approved");
    record1.set("category", "categoria_1");
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
    record2.set("display_name", "LP");
    record2.set("kart_number", 19);
    record2.set("status", "approved");
    record2.set("category", "categoria_1");
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
    record3.set("display_name", "MB");
    record3.set("kart_number", 14);
    record3.set("status", "approved");
    record3.set("category", "categoria_1");
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
    record4.set("display_name", "D");
    record4.set("kart_number", 3);
    record4.set("status", "approved");
    record4.set("category", "categoria_1");
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
    record5.set("display_name", "VR");
    record5.set("kart_number", 17);
    record5.set("status", "approved");
    record5.set("category", "categoria_1");
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
    record6.set("display_name", "DF");
    record6.set("kart_number", 1);
    record6.set("status", "approved");
    record6.set("category", "categoria_1");
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
    record7.set("display_name", "J");
    record7.set("kart_number", 5);
    record7.set("status", "approved");
    record7.set("category", "categoria_1");
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
    record8.set("full_name", "Jo\u00e3o Gabriel");
    record8.set("display_name", "JG");
    record8.set("kart_number", 7);
    record8.set("status", "approved");
    record8.set("category", "categoria_2");
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
    record9.set("full_name", "L\u00e9o Braga");
    record9.set("display_name", "LB");
    record9.set("kart_number", 5);
    record9.set("status", "approved");
    record9.set("category", "categoria_2");
  try {
    app.save(record9);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record10 = new Record(collection);
    record10.set("full_name", "Lucas Sodr\u00e9");
    record10.set("display_name", "LS");
    record10.set("kart_number", 17);
    record10.set("status", "approved");
    record10.set("category", "categoria_2");
  try {
    app.save(record10);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record11 = new Record(collection);
    record11.set("full_name", "Diogo Polisel");
    record11.set("display_name", "DP");
    record11.set("kart_number", 19);
    record11.set("status", "approved");
    record11.set("category", "categoria_2");
  try {
    app.save(record11);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record12 = new Record(collection);
    record12.set("full_name", "Renan");
    record12.set("display_name", "R");
    record12.set("kart_number", 3);
    record12.set("status", "approved");
    record12.set("category", "categoria_2");
  try {
    app.save(record12);
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
