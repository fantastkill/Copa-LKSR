/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pilots");

  const record0 = new Record(collection);
    record0.set("full_name", "Luis Ferrari");
    record0.set("display_name", "Luis Ferrari");
    record0.set("kart_number", 1);
    record0.set("category", "Categoria 1");
    record0.set("status", "approved");
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
    record1.set("kart_number", 2);
    record1.set("category", "Categoria 1");
    record1.set("status", "approved");
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
    record2.set("kart_number", 3);
    record2.set("category", "Categoria 1");
    record2.set("status", "approved");
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
    record3.set("kart_number", 4);
    record3.set("category", "Categoria 1");
    record3.set("status", "approved");
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
    record4.set("kart_number", 5);
    record4.set("category", "Categoria 1");
    record4.set("status", "approved");
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
    record5.set("kart_number", 6);
    record5.set("category", "Categoria 1");
    record5.set("status", "approved");
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
    record6.set("kart_number", 7);
    record6.set("category", "Categoria 1");
    record6.set("status", "approved");
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
    record7.set("kart_number", 8);
    record7.set("category", "Categoria 1");
    record7.set("status", "approved");
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
    record8.set("display_name", "Jo\u00e3o Gabriel");
    record8.set("kart_number", 9);
    record8.set("category", "Categoria 2");
    record8.set("status", "approved");
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
    record9.set("display_name", "L\u00e9o Braga");
    record9.set("kart_number", 10);
    record9.set("category", "Categoria 2");
    record9.set("status", "approved");
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
    record10.set("display_name", "Lucas Sodr\u00e9");
    record10.set("kart_number", 11);
    record10.set("category", "Categoria 2");
    record10.set("status", "approved");
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
    record11.set("display_name", "Diogo Polisel");
    record11.set("kart_number", 12);
    record11.set("category", "Categoria 2");
    record11.set("status", "approved");
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
    record12.set("display_name", "Renan");
    record12.set("kart_number", 13);
    record12.set("category", "Categoria 2");
    record12.set("status", "approved");
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
