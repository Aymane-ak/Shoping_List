
const pool    = require('../db');
const express = require('express');
const router  = express.Router();

router.get('/', async (req, res) => {
    const result = await pool.query( 'SELECT * FROM products')
    res.json(result.rows)
})

module.exports = router