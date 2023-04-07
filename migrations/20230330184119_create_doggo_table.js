exports.up = function(knex) {
    return knex.schema.createTable('doggos', (table) => {
        table.uuid('id').primary();
        table
            .uuid('user_id')
            .references('users.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.string('name').notNullable();
        table.string('breed').notNullable();
        table.string('bio').notNullable();
        table.string('profile_picture').notNullable();
        table.integer('age').notNullable();
      });
    };


exports.down = function(knex) {
    return knex.schema.dropTable('doggos');
};
