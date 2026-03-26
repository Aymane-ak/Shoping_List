
const pool    = require('../db');
const express = require('express');
const router  = express.Router();

router.get('/:idList', async (req, res) => {
    const result = await pool.query( 'SELECT * FROM products where list_id = $1', [req.params.id])
    res.json(result.rows)
})

router.post('/lists/:idList/product',async (req,res) => {


    if(! req.params.idList){
        return res.status(400).json({ error : "Id non fourni"} )
    }
    try {
        const result = await pool.query('INSERT INTO products (name,description,price,list_id) VALUES ($1,$2,$3,$4)', [req.body.name,
        req.body.description,req.body.price,req.params.idList])
        res.json(result.rows);

    }
    catch(error) {

        res.status(500).json( {error : error.message} )
    }
})


/* 
    APPEL API EXTERNE 
*/

router.get("/",async(req,res)=> {    

    if ( !req.query.name) {

        return res.status(400).json( {error  : " No product name"} )
    }
    try {
        const response = await fetch (`https://world.openfoodfacts.net/api/v2/search?search_terms=${req.query.name}&json=true&page_size=10`)
        const data     = await response.json()        
        const dattaSimplified = data.products.map( product =>(  {
            name         : product.product_name,
            image_url    : product.image_front_url,
            barcode      : product.id,
            brand        : product.brands,
            calories     : product.nutriments?.["energy-kcal"],
            product_size : product.product_quantity,
            nutriscore   : product.nutrition_grade_fr
        }))
        console.log("Résultat de la requête :", dattaSimplified)
        res.json(dattaSimplified)
        
    }
    catch ( error ){
        return res.status(500).json({error : error.message })
    }
    
})


module.exports = router