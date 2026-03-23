
const pool    = require('../db');
const express = require('express');
const router  = express.Router();




router.get('/products', async (req, res) => {
    const result = await pool.query( 'SELECT * FROM products')
    res.send(result.rows)
})


module.exports = router