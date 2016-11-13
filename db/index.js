'use strict';

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://uqgmyjpymchurc:XFhOhcBIv_b2D72DuBfY-_20aM@ec2-54-221-229-37.compute-1.amazonaws.com:5432/d8ospjs1ib3qre?ssl=true'
});

module.exports = knex
