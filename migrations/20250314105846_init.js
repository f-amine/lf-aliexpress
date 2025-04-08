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
    })
    .createTable('products', function(table) {
      table.increments('id').primary();
      table.integer('account_id').unsigned().references('id').inTable('accounts').onDelete('CASCADE');
      table.string('title').notNullable();
      table.text('description').nullable();
      table.decimal('price', 10, 2).notNullable();
      table.decimal('sale_price', 10, 2).nullable();
      table.string('image_url').nullable();
      table.string('aliexpress_item_id').nullable();
      table.string('aliexpress_url').nullable();
      table.string('supplier').nullable();
      table.string('shipping').nullable();
      table.string('orders').nullable();
      table.decimal('rating', 3, 1).nullable();
      table.enum('status', ['active', 'draft', 'archived']).defaultTo('draft');
      table.timestamps(true, true);
      
      // Add index on account_id for faster queries
      table.index('account_id');
      table.index('status');
    });   
    
};


exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('products')
    .dropTableIfExists('aliexpress_connections')
    .dropTableIfExists('account');
};
