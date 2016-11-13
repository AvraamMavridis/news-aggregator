let knex = require('../db');

console.info('Drop Table');
knex.schema.dropTable('articles')
           .then(() => {
             console.log('dropped');
             process.exit();
            })
           .catch((error) =>{
               console.error(error);
               process.exit();
            })
