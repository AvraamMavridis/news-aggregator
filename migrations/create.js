'use strict';

let knex = require('../db');

console.info('Create Table If Not Exist');
knex.schema.createTableIfNotExists('articles', function (table) {
  table.uuid('id').primary();
  table.string('title');
  table.text('summary');
  table.string('link');
  table.string('source');
  table.timestamp('created_at').defaultTo(knex.fn.now());
}).then(function(){
  console.info('Teardown connection');
  knex.destroy()
})
