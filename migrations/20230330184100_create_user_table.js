//const { v4: uuid } = require('uuid');


exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.uuid('id').primary();
        table.string('username').notNullable();
        table.string('password').notNullable();
      });
    };


exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
