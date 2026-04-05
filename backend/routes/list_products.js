const pool    = require('../db');
const express = require('express');
const router  = express.Router();

// router.get('/:idList', async (req, res) => {
//     const result = await pool.query( 'SELECT * FROM products where list_id = $1', [req.params.id])
//     res.json(result.rows)
// })

// router.post('/lists/:list_id/products',async (req,res) => {

    
//     if(! req.params.list_id){
//         return res.status(400).json({ error : "Id non fourni"} )
//     }
//     try {
//         const result = await pool.query('INSERT INTO products (name,description,price,list_id,image_url,barcode,brand,calories,product_size,nutriscore)' + 
//              'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
             
//              [  req.body.name, 
//                 req.body.description, 
//                 req.body.price, 
//                 req.params.idList, 
//                 req.body.image_url, 
//                 req.body.barcode, 
//                 req.body.brand, 
//                 req.body.calories, 
//                 req.body.product_size, 
//                 req.body.nutriscore
//              ])

//         res.json(result.rows[0]);

//     }
//     catch(error) {

//         res.status(500).json( {error : error.message} )
//     }
// })