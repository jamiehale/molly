import { readSql } from './support';

const gender = (id, title) => ({ id, title });
const partnerRole = (id, title) => ({ id, title });
const partnershipType = (id, title) => ({ id, title });
const parentRole = (id, title) => ({ id, title });
const eventType = (id, title) => ({ id, title });
const eventPersonRole = (id, title) => ({ id, title });
const artifactPersonRole = (id, title) => ({ id, title });
const artifactType = (id, title) => ({ id, title });
const artifactSource = (id, title) => ({ id, title });
const artifactLocationType = (id, title) => ({ id, title });
const artifactDateType = (id, title) => ({ id, title });
const assetCollection = (id, title, baseUrl) => ({
  id,
  title,
  base_url: baseUrl,
});

export const up = (knex) =>
  knex.schema
    // Users
    //
    .createTable('users', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    })
    .createTable('api_keys', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('user_id').notNullable();
      table.string('secret').notNullable();

      table.foreign('user_id').references('users.id');

      table.unique('secret');
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
    .createTable('event_person_roles', (table) => {
      table.string('id').primary().notNullable();
      table.string('title').notNullable();
    })
    .createTable('artifact_person_roles', (table) => {
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
    .createTable('person_date_types', (table) => {
      table.string('id').primary().notNullable();
      table.string('title').notNullable();
    })
    .createTable('artifact_date_types', (table) => {
      table.string('id').primary().notNullable();
      table.string('title').notNullable();
    })

    // Family
    //
    .createTable('people', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('given_names');
      table.string('surname');
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
    .createTable('parent_children', (table) => {
      table.uuid('parent_id').notNullable();
      table.uuid('child_id').notNullable();
      table.string('parent_role_id').notNullable();

      table.unique(['parent_id', 'child_id']);
      table.foreign('parent_id').references('people.id');
      table.foreign('child_id').references('people.id');
      table.foreign('parent_role_id').references('parent_roles.id');
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
      table.string('date_value').nullable();
      table.uuid('location_id').nullable();

      table.foreign('type_id').references('event_types.id');
      table.foreign('location_id').references('locations.id');
    })
    .createTable('event_people', (table) => {
      table.uuid('event_id').notNullable();
      table.uuid('person_id').notNullable();
      table.string('role_id').notNullable();

      table.foreign('event_id').references('events.id');
      table.foreign('person_id').references('people.id');
      table.foreign('role_id').references('event_person_roles.id');
    })

    // Artifacts
    //
    .createTable('collections', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('title').notNullable();
      table.string('short_name').notNullable();
      table.text('description');
      table.uuid('creator_id').notNullable();

      table.unique('short_name');
      table.foreign('creator_id').references('users.id');
    })
    .createTable('artifacts', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('title').notNullable();
      table.text('description');
      table.string('type_id').notNullable();
      table.string('source_id').notNullable();
      table.uuid('collection_id').notNullable();
      table.uuid('creator_id').notNullable();

      table.foreign('type_id').references('artifact_types.id');
      table.foreign('source_id').references('artifact_sources.id');
      table.foreign('collection_id').references('collections.id');
      table.foreign('creator_id').references('users.id');
    })
    .createTable('people_artifacts', (table) => {
      table.uuid('person_id').notNullable();
      table.uuid('artifact_id').notNullable();
      table.string('role_id').notNullable();
      table.uuid('creator_id').notNullable();

      table.foreign('person_id').references('people.id');
      table.foreign('artifact_id').references('artifacts.id');
      table.foreign('role_id').references('artifact_person_roles.id');
    })
    .createTable('location_artifacts', (table) => {
      table.uuid('location_id').notNullable();
      table.uuid('artifact_id').notNullable();
      table.string('type_id').notNullable();
      table.uuid('creator_id').notNullable();

      table.foreign('location_id').references('locations.id');
      table.foreign('artifact_id').references('artifacts.id');
      table.foreign('type_id').references('artifact_location_types.id');
    })
    .createTable('event_artifacts', (table) => {
      table.uuid('event_id').notNullable();
      table.uuid('artifact_id').notNullable();

      table.foreign('event_id').references('events.id');
      table.foreign('artifact_id').references('artifacts.id');
    })

    // Assets
    //
    .createTable('vaults', (table) => {
      table.string('id').primary().notNullable();
      table.string('title').notNullable();
      table.text('description');
      table.string('base_url').notNullable();
    })
    .createTable('assets', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('filename').notNullable();
      table.string('mimetype').notNullable();
      table.string('vault_id').notNullable();
      table.uuid('artifact_id').notNullable();
      table.uuid('creator_id').notNullable();

      table.foreign('vault_id').references('vaults.id');
      table.foreign('artifact_id').references('artifacts.id');
      table.foreign('creator_id').references('users.id');
    })

    // Dates
    //
    .createTable('person_dates', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('person_id').notNullable();
      table.string('type_id').notNullable();
      table.string('value').notNullable();
      table.uuid('creator_id').notNullable();

      table.foreign('person_id').references('people.id');
      table.foreign('type_id').references('person_date_types.id');
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

    .then(() => knex.raw(readSql('001/children.sql')))
    .then(() => knex.raw(readSql('001/parents.sql')))
    .then(() => knex.raw(readSql('001/person-details.sql')))
    .then(() => knex.raw(readSql('001/event-details.sql')))
    .then(() => knex.raw(readSql('001/event-person-details.sql')))
    .then(() => knex.raw(readSql('001/event-artifact-details.sql')))

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
      knex('artifact_person_roles').insert([
        artifactPersonRole('recipient', 'Recipient'),
        artifactPersonRole('sender', 'Sender'),
        artifactPersonRole('author', 'Author'),
      ]),
    )
    .then(() =>
      knex('artifact_date_types').insert([
        artifactDateType('postmark', 'Postmark'),
        artifactDateType('qso', 'QSO'),
      ]),
    )
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
      knex('event_person_roles').insert([
        eventPersonRole('primary', 'Primary'),
        eventPersonRole('attendee', 'Attendee'),
        eventPersonRole('resident', 'Resident'),
        eventPersonRole('bride', 'Bride'),
        eventPersonRole('groom', 'Groom'),
        eventPersonRole('mother', 'Mother'),
        eventPersonRole('father', 'Father'),
      ]),
    )
    .then(() =>
      knex('genders').insert([
        gender('male', 'Male'),
        gender('female', 'Female'),
        gender('non-binary', 'Non-binary'),
        gender('unknown', 'Unknown'),
      ]),
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
    .then(() =>
      knex('vaults').insert([
        assetCollection('main', 'Main', 'http://localhost/api/assets'),
      ]),
    )
    .then(() =>
      knex('users')
        .insert({})
        .returning('id')
        .then((records) => records[0])
        .then((record) => record.id)
        .then((userId) =>
          knex('api_keys').insert({ user_id: userId, secret: '12345' }),
        ),
    );

export const down = (knex) =>
  knex.schema
    .dropViewIfExists('event_artifact_details')
    .dropViewIfExists('event_person_details')
    .dropViewIfExists('event_details')
    .dropViewIfExists('person_details')
    .dropViewIfExists('parents')
    .dropViewIfExists('children')
    .dropTableIfExists('artifact_dates')
    .dropTableIfExists('person_dates')
    .dropTableIfExists('assets')
    .dropTableIfExists('vaults')
    .dropTableIfExists('event_artifacts')
    .dropTableIfExists('location_artifacts')
    .dropTableIfExists('people_artifacts')
    .dropTableIfExists('artifacts')
    .dropTableIfExists('collections')
    .dropTableIfExists('event_people')
    .dropTableIfExists('events')
    .dropTableIfExists('locations')
    .dropTableIfExists('parent_children')
    .dropTableIfExists('partners')
    .dropTableIfExists('partnerships')
    .dropTableIfExists('people')
    .dropTableIfExists('artifact_date_types')
    .dropTableIfExists('person_date_types')
    .dropTableIfExists('artifact_location_types')
    .dropTableIfExists('artifact_sources')
    .dropTableIfExists('artifact_types')
    .dropTableIfExists('artifact_person_roles')
    .dropTableIfExists('event_person_roles')
    .dropTableIfExists('event_types')
    .dropTableIfExists('parent_roles')
    .dropTableIfExists('partnership_types')
    .dropTableIfExists('partner_roles')
    .dropTableIfExists('genders')
    .dropTableIfExists('api_keys')
    .dropTableIfExists('users');
