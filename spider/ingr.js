'use strict';

const cheerio = require('cheerio');
const db = require('../db');
var md5 = require('md5');
const _ = require('lodash');

module.exports = function scrap( body )
{
  console.info('SCRAP START')
  let $ = cheerio.load(body);
  let articles = $('#in-column-main .section3 a');
  articles = articles.map((i, el) => {
    let link = $(el).attr('href');
    let title = $(el).text()

    return  {
      id: md5(title + 'www.in.gr'),
      title: title,
      link: link,
      source: 'www.in.gr'
    }
  }).toArray();

  let ids = articles.map(article => article.id);

  let insertedIDs = db.select('id').from('articles')
      .whereIn('id', ids)
      .map(row => row.id)
      .then((insertedIDs) => {
        insertedIDs = insertedIDs.map(id => id.replace(/-/g,''))
        let articlesToInsert = articles.filter( article => !_.includes(insertedIDs, article.id))
        return db.batchInsert('articles', articlesToInsert)
            .returning('id');
      })
      .then((data)=>{
        console.info('SCRAP ENDED')
        console.log(data)
      })
      .catch(console.error)
}
