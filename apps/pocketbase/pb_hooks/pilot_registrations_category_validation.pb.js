/// <reference path="../pb_data/types.d.ts" />

// Validation is centralized in pilot_registrations_validation.pb.js.
onRecordCreate((e) => {
  e.next();
}, 'pilot_registrations');
