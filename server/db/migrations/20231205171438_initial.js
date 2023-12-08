const gender = (id, title) => ({ id, title });
const partnerRole = (id, title) => ({ id, title });
const partnershipType = (id, title) => ({ id, title });
const parentRole = (id, title) => ({ id, title });
const eventType = (id, title) => ({ id, title });
const artifactPersonRole = (id, title) => ({ id, title });
const artifactType = (id, title) => ({ id, title });
const artifactSource = (id, title) => ({ id, title });
const artifactLocationType = (id, title) => ({ id, title });
const artifactDateType = (id, title) => ({ id, title });
const assetCollection = (id, title, baseUrl) => ({ id, title, baseUrl });

export const up = (knex) =>
  knex.schema
    // Users
    //
    .createTable('accounts', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    })
    .createTable('api_keys', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('account_id').notNullable();
      table.string('secret').notNullable();

      table.foreign('account_id').references('accounts.id');
    })
    .createTable('users', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    })

    // Look-ups
    //
    .createTable('genders', (table) => {
      table.string('id').primary().notNullable();
      table.string('title').notNullable();
    })
    .createTable('partner_roles', (table) => {
      table.string('id').primary().notNullable();
      table.string('title').notNullable();
    })
    .createTable('partnership_types', (table) => {
      table.string('id').primary().notNullable();
      table.string('title').notNullable();
    })
    .createTable('parent_roles', (table) => {
      table.string('id').primary().notNullable();
      table.string('title').notNullable();
    })
    .createTable('event_types', (table) => {
      table.string('id').primary().notNullable();
      table.string('title').notNullable();
    })
    .createTable('artifact_people_roles', (table) => {
      table.string('id').primary().notNullable();
      table.string('title').notNullable();
    })
    .createTable('artifact_types', (table) => {
      table.string('id').primary();
      table.string('title').notNullable();
    })
    .createTable('artifact_sources', (table) => {
      table.string('id').primary();
      table.string('title').notNullable();
    })
    .createTable('artifact_location_types', (table) => {
      table.string('id').primary().notNullable();
      table.string('title').notNullable();
    })
    .createTable('people_date_types', (table) => {
      table.string('id').primary().notNullable();
      table.string('title').notNullable();
    })
    .createTable('artifact_date_types', (table) => {
      table.string('id').primary().notNullable();
      table.string('title').notNullable();
    })
    .createTable('asset_collections', (table) => {
      table.string('id').primary().notNullable();
      table.string('title').notNullable();
      table.string('base_url').notNullable();
    })

    // Family
    //
    .createTable('people', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('first_name');
      table.string('middle_names');
      table.string('last_name');
      table.string('gender_id').notNullable();
      table.uuid('creator_id').notNullable();

      table.foreign('gender_id').references('genders.id');
      table.foreign('creator_id').references('users.id');
    })
    .createTable('partnerships', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('title').notNullable();
      table.string('type_id').notNullable();
      table.uuid('creator_id').notNullable();

      table.foreign('type_id').references('partnership_types.id');
      table.foreign('creator_id').references('users.id');
    })
    .createTable('partners', (table) => {
      table.uuid('partnership_id').notNullable();
      table.uuid('person_id').notNullable();
      table.string('role_id').notNullable();

      table.foreign('partnership_id').references('partnerships.id');
      table.foreign('person_id').references('people.id');
      table.foreign('role_id').references('partner_roles.id');
    })
    .createTable('parents', (table) => {
      table.uuid('parent_id').notNullable();
      table.uuid('child_id').notNullable();
      table.string('role_id').notNullable();

      table.foreign('parent_id').references('people.id');
      table.foreign('child_id').references('people.id');
      table.foreign('role_id').references('parent_roles.id');
    })

    // Locations
    //
    .createTable('locations', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('value').notNullable();
    })

    // Events
    //
    .createTable('events', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('title').notNullable();
      table.string('type_id').notNullable();

      table.foreign('type_id').references('event_types.id');
    })

    // Artifacts
    //
    .createTable('artifacts', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.text('type_id').notNullable();
      table.text('source_id').notNullable();
      table.uuid('creator_id').notNullable();

      table.foreign('creator_id').references('users.id');
      table.foreign('type_id').references('artifact_types.id');
      table.foreign('source_id').references('artifact_sources.id');
    })
    .createTable('artifact_people', (table) => {
      table.uuid('artifact_id').notNullable();
      table.uuid('person_id').notNullable();
      table.string('role_id').notNullable();
      table.uuid('creator_id').notNullable();

      table.foreign('artifact_id').references('artifacts.id');
      table.foreign('person_id').references('people.id');
      table.foreign('role_id').references('artifact_people_roles.id');
    })
    .createTable('artifact_locations', (table) => {
      table.uuid('artifact_id').notNullable();
      table.uuid('location_id').notNullable();
      table.string('type_id').notNullable();
      table.uuid('creator_id').notNullable();

      table.foreign('artifact_id').references('artifacts.id');
      table.foreign('location_id').references('locations.id');
      table.foreign('type_id').references('artifact_location_types.id');
    })
    .createTable('artifact_events', (table) => {
      table.uuid('artifact_id').notNullable();
      table.uuid('event_id').notNullable();

      table.foreign('artifact_id').references('artifacts.id');
      table.foreign('event_id').references('events.id');
    })

    // Assets
    //
    .createTable('assets', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('filename').notNullable();
      table.string('mimetype').notNullable();
      table.string('collection_id').notNullable();
      table.uuid('artifact_id').notNullable();
      table.uuid('creator_id').notNullable();

      table.foreign('collection_id').references('asset_collections.id');
      table.foreign('artifact_id').references('artifacts.id');
      table.foreign('creator_id').references('users.id');
    })

    // Dates
    //
    .createTable('people_dates', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('person_id').notNullable();
      table.string('type_id').notNullable();
      table.string('value').notNullable();
      table.uuid('creator_id').notNullable();

      table.foreign('person_id').references('people.id');
      table.foreign('type_id').references('people_date_types.id');
      table.foreign('creator_id').references('users.id');
    })
    .createTable('event_dates', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('event_id').notNullable();
      table.string('type_id').notNullable();
      table.string('value').notNullable();
      table.uuid('creator_id').notNullable();

      table.foreign('event_id').references('events.id');
      table.foreign('type_id').references('event_date_types.id');
      table.foreign('creator_id').references('users.id');
    })
    .createTable('artifact_dates', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('artifact_id').notNullable();
      table.string('type_id').notNullable();
      table.string('value').notNullable();
      table.uuid('creator_id').notNullable();

      table.foreign('artifact_id').references('artifacts.id');
      table.foreign('type_id').references('artifact_date_types.id');
      table.foreign('creator_id').references('users.id');
    })

    .then(() =>
      knex('artifact_types').insert([
        artifactType('birth-certificate', 'Birth Certificate'),
        artifactType('marriage-registration', 'Marriage Registration'),
        artifactType('death-certificate', 'Death Certificate'),
        artifactType('letter', 'Letter'),
        artifactType('postcard', 'Postcard'),
        artifactType('qsl', 'QSL Card'),
      ]),
    )
    .then(() =>
      knex('artifact_sources').insert([
        artifactSource('original', 'Original'),
        artifactSource('photocopy', 'Photocopy'),
        artifactSource('print', 'Print Reproduction'),
        artifactSource('sketch', 'Sketch'),
        artifactSource('transcript', 'Transcript'),
      ]),
    )
    .then(() =>
      knex('artifact_location_types').insert([
        artifactLocationType('address', 'Address'),
        artifactLocationType('return-address', 'Return Address'),
        artifactLocationType('residence', 'Residence'),
      ]),
    )
    .then(() =>
      knex('artifact_people_roles').insert([
        artifactPersonRole('recipient', 'Recipient'),
        artifactPersonRole('sender', 'Sender'),
        artifactPersonRole('author', 'Author'),
      ]),
    )
    .then(() => knex('artifact_date_types').insert([artifactDateType('postmark', 'Postmark'), artifactDateType('qso', 'QSO')]))
    .then(() =>
      knex('event_types').insert([
        eventType('residence', 'Residence'),
        eventType('birth', 'Birth'),
        eventType('death', 'Death'),
        eventType('burial', 'Burial'),
        eventType('marriage', 'Marriage'),
      ]),
    )
    .then(() =>
      knex('genders').insert([gender('male', 'Male'), gender('female', 'Female'), gender('non-binary', 'Non-binary'), gender('unknown', 'Unknown')]),
    )
    .then(() =>
      knex('partner_roles').insert([
        partnerRole('husband', 'Husband'),
        partnerRole('wife', 'Wife'),
        partnerRole('spouse', 'Spouse'),
        partnerRole('partner', 'Partner'),
      ]),
    )
    .then(() =>
      knex('partnership_types').insert([
        partnershipType('marriage', 'Marriage'),
        partnershipType('civil-union', 'Civil Union'),
        partnershipType('unmarried', 'Unmarried'),
        partnershipType('unknown', 'Unknown'),
      ]),
    )
    .then(() =>
      knex('parent_roles').insert([
        parentRole('biological', 'Biological'),
        parentRole('adoptive', 'Adoptive'),
        parentRole('step', 'Step'),
        parentRole('other', 'Other'),
      ]),
    )
    .then(() => knex('asset_collections').insert([assetCollection('main', 'Main', 'http://localhost/api/assets')]));

export const down = (knex) =>
  knex.schema
    .dropTableIfExists('artifact_dates')
    .dropTableIfExists('event_dates')
    .dropTableIfExists('people_dates')
    .dropTableIfExists('assets')
    .dropTableIfExists('artifact_events')
    .dropTableIfExists('artifact_locations')
    .dropTableIfExists('artifact_people')
    .dropTableIfExists('artifacts')
    .dropTableIfExists('events')
    .dropTableIfExists('locations')
    .dropTableIfExists('parents')
    .dropTableIfExists('partners')
    .dropTableIfExists('partnerships')
    .dropTableIfExists('people')
    .dropTableIfExists('asset_collections')
    .dropTableIfExists('artifact_date_types')
    .dropTableIfExists('people_date_types')
    .dropTableIfExists('artifact_location_types')
    .dropTableIfExists('artifact_sources')
    .dropTableIfExists('artifact_types')
    .dropTableIfExists('artifact_people_roles')
    .dropTableIfExists('event_types')
    .dropTableIfExists('parent_roles')
    .dropTableIfExists('partnership_types')
    .dropTableIfExists('partner_roles')
    .dropTableIfExists('genders')
    .dropTableIfExists('users')
    .dropTableIfExists('api_keys')
    .dropTableIfExists('accounts');