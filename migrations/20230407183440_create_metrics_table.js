exports.up = function(knex) {
    return knex.schema.createTable('metrics', (table) => {
        table.uuid('id').primary();
        table
        .uuid('doggo_id')
        .references('doggos.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        table.integer('main').notNullable();
        table.integer('walk').notNullable();
        table.integer('belly_rub').notNullable();
        table.integer('treat').notNullable();
        table.integer('stretch').notNullable();
        table.integer('dog_park').notNullable();
        table.integer('trick').notNullable();
      });
    };


exports.down = function(knex) {
    return knex.schema.dropTable('metrics');
};
