exports.up = function(knex) {
  return knex.schema
    .createTable('accounts', function(table) {
      table.increments('id').primary();
      table.string('lightfunnels_account_id').notNullable();
      table.string('email').notNullable().unique();
      table.string('lightfunnels_token').notNullable();
      table.timestamps(true, true);
    })
    .createTable('aliexpress_connections', function(table) {
      table.increments('id').primary();
      table.integer('account_id').unsigned().references('id').inTable('accounts').onDelete('CASCADE');
      table.string('access_token').notNullable();
      table.string('refresh_token').notNullable();
      table.datetime('token_expires_at').notNullable();
      table.string('currency').nullable();
      table.string('language').nullable();
      table.timestamps(true, true);
      
      // Add unique index on account_id to ensure one connection per account
      table.unique(['account_id']);
    });   
    
};


exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('aliexpress_connections')
    .dropTableIfExists('account');
};
