const dotenv = require('dotenv');
dotenv.config()


const {Pool} = require('pg');

const pool = new Pool ({
        host     : process.env.DB_HOST,
        database : process.env.DB_NAME,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        port     : process.env.DB_PORT
});
module.exports = pool;


/* Connection test 
pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('Erreur connexion BDD :', err)
  else console.log('BDD connectée :', res.rows[0])
}) 

*/