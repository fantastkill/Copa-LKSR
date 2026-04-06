/// <reference path="../pb_data/types.d.ts" />

onRecordCreate((e) => {
  const category = (e.record.get('category') || '').toString().trim();
  const rawEmail = (e.record.get('email') || '').toString().trim().toLowerCase();

  if (rawEmail) {
    const existingEmail = $app.findFirstRecordByData('pilot_registrations', 'email', rawEmail);
    if (existingEmail) {
      throw new BadRequestError('Email already registered');
    }
    e.record.set('email', rawEmail);
  }

  if (category) {
    const categoryCount = $app.findRecordsByFilter(
      'pilot_registrations',
      "category = '" + category + "'",
      { limit: 51 }
    );

    if (categoryCount && categoryCount.length >= 50) {
      throw new BadRequestError('Maximum 50 pilots per category reached');
    }
  }

  e.next();
}, 'pilot_registrations');
