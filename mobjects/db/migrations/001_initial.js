// import { readSql } from './support';

const mobject = (id, path) => ({ id, path });
const tag = (mobject_id, tag) => ({ mobject_id, tag });
const attribute = (mobject_id, attribute_name, attribute_value) => ({
  mobject_id,
  attribute_name,
  attribute_value,
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

    .createTable('mobjects', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('key').notNullable();
      table.timestamps(true, true);

      table.unique(['key']);
    })
    .createTable('files', (table) => {
      table.string('hash').primary();
      table.timestamps(true, true);

      table.unique(['mobject_id', 'hash']);
    })
    .createTable('mobject_files', (table) => {
      table.uuid('mobject_id').notNullable();
      table.string('file_hash').notNullable();

      table.foreign('mobject_id').references('mobjects.id');
      table.foreign('file_hash').references('files.hash');
    })
    .createTable('tags', (table) => {
      table.uuid('mobject_id').notNullable();
      table.string('tag').notNullable();
      table.timestamps(true, true);

      table.foreign('mobject_id').references('mobjects.id');
      table.unique(['mobject_id', 'tag']);
    })
    .createTable('attributes', (table) => {
      table.uuid('mobject_id').notNullable();
      table.string('attribute_name').notNullable();
      table.string('attribute_value').notNullable();
      table.timestamps(true, true);

      table.foreign('mobject_id').references('mobjects.id');
      table.unique(['mobject_id', 'attribute_name']);
    });

export const down = (knex) =>
  knex.schema
    .dropTableIfExists('attributes')
    .dropTableIfExists('tags')
    .dropTableIfExists('mobjects')
    .dropTableIfExists('api_keys')
    .dropTableIfExists('users');
