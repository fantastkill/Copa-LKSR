/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pilot_comments");

  const record0 = new Record(collection);
    const record0_pilot_idLookup = app.findFirstRecordByFilter("pilots", "slug='luis-ferrari'");
    if (!record0_pilot_idLookup) { throw new Error("Lookup failed for pilot_id: no record in 'pilots' matching \"slug='luis-ferrari'\""); }
    record0.set("pilot_id", record0_pilot_idLookup.id);
    record0.set("author_name", "Fan 1");
    record0.set("comment_text", "Voando nessa etapa! \ud83d\udc4f");
    record0.set("status", "approved");
    record0.set("visitor_fingerprint", "fp_001");
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
    const record1_pilot_idLookup = app.findFirstRecordByFilter("pilots", "slug='luis-ferrari'");
    if (!record1_pilot_idLookup) { throw new Error("Lookup failed for pilot_id: no record in 'pilots' matching \"slug='luis-ferrari'\""); }
    record1.set("pilot_id", record1_pilot_idLookup.id);
    record1.set("author_name", "Fan 2");
    record1.set("comment_text", "Na torcida sempre!");
    record1.set("status", "approved");
    record1.set("visitor_fingerprint", "fp_002");
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
    const record2_pilot_idLookup = app.findFirstRecordByFilter("pilots", "slug='luis-ferrari'");
    if (!record2_pilot_idLookup) { throw new Error("Lookup failed for pilot_id: no record in 'pilots' matching \"slug='luis-ferrari'\""); }
    record2.set("pilot_id", record2_pilot_idLookup.id);
    record2.set("author_name", "Fan 3");
    record2.set("comment_text", "Orgulho da fam\u00edlia!");
    record2.set("status", "approved");
    record2.set("visitor_fingerprint", "fp_003");
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
    const record3_pilot_idLookup = app.findFirstRecordByFilter("pilots", "slug='victor-antonio'");
    if (!record3_pilot_idLookup) { throw new Error("Lookup failed for pilot_id: no record in 'pilots' matching \"slug='victor-antonio'\""); }
    record3.set("pilot_id", record3_pilot_idLookup.id);
    record3.set("author_name", "Fan 4");
    record3.set("comment_text", "Mandou muito bem hoje!");
    record3.set("status", "approved");
    record3.set("visitor_fingerprint", "fp_004");
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
    const record4_pilot_idLookup = app.findFirstRecordByFilter("pilots", "slug='victor-antonio'");
    if (!record4_pilot_idLookup) { throw new Error("Lookup failed for pilot_id: no record in 'pilots' matching \"slug='victor-antonio'\""); }
    record4.set("pilot_id", record4_pilot_idLookup.id);
    record4.set("author_name", "Fan 5");
    record4.set("comment_text", "Pra cima na pr\u00f3xima corrida! \ud83c\udfc1");
    record4.set("status", "approved");
    record4.set("visitor_fingerprint", "fp_005");
  try {
    app.save(record4);
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
