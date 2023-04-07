exports.up = function(knex) {
    return knex.schema.createTable('posts', (table) => {
        table.uuid('id').primary();
        table
        .uuid('doggo_id')
        .references('doggos.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        table.string('title').notNullable();
        table.string('story').notNullable();
        table.string('image').notNullable();
        table.string('emoticon').notNullable();

      });
    };


exports.down = function(knex) {
    return knex.schema.dropTable('posts');
};
