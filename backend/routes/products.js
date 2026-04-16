const pool    = require('../db');
const express = require('express');
const router  = express.Router();


router.get("/all", async(req,res) => {
  const result = await pool.query('SELECT * FROM products')

  if(result.rowCount === 0){

    return res.json({ error : 'No Data'})
  }
  else {
    return res.json(result.rows)
  }
   
})


router.get("/",async(req,res)=> {    

    if ( !req.query.name) {

        return res.status(400).json( {error  : " BAD REQUEST : MISSING PRODUCT NAME"} )
    }       
    try { 
        
        const query = await pool.query( 'SELECT * FROM products WHERE name ILIKE $1' , [`%${req.query.name}%`])
        if ( query.rowCount > 0){

            return res.json(query.rows)
        }

        const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${req.query.name}&search_simple=1&action=process&json=1&page_size=10`

        let data = null 

        for (let i=0; i<5 ; i++) {

            try {
                    const response = await fetch(url, {
                        headers: {
                            "Accept"       : "application/json",
                            "Content-Type" : "application/json",
                            "User-Agent"   : "Mozilla/5.0"
                            }
                    })
                    const text = await response.text()
                    if (!response.ok) continue
                    if (text.trim().startsWith('<')) continue
                    data =  JSON.parse(text)
                    break 
            }
            catch(e) {

            }
        }

        if(!data) {
            return  res.json([])
        }               
        
        // Pour etre utilisable en dehors du try catch !!     
            
        if(!data.products || !Array.isArray(data.products)){

            return res.json([])
        }

            // const response = await fetch (`https://world.openfoodfacts.net/api/v2/search?search_terms=${req.query.name}&json=true&page_size=10`)   
            const dattaSimplified = data.products.map( product =>(  {
                
                name         : product.product_name,
                image_url    : product.image_front_url,
                barcode      : product.code,
                brand        : product.brands,
                calories     : product.nutriments?.["energy-kcal"],
                product_size : product.product_quantity,
                nutriscore   : product.nutrition_grade_fr
            }))
            return res.json(dattaSimplified)        
            
    }
    catch ( error ){
        return res.status(500).json({error : error.message })
    } 
})


router.post('/', async(req,res) => {
    if( !req.body.name || !req.body.image_url || !req.body.barcode || !req.body.brand || !req.body.calories || !req.body.product_size 
        || !req.body.nutriscore) {

        return res.status(400).json({ error : 'MISSING PARAMETERS complete body'})
    }
    try {
            const response =  await pool.query ( 'INSERT INTO products (name,image_url,barcode,brand,calories,product_size,nutriscore)' + 
                ' VALUES ( $1, $2, $3,$4, $5, $6, $7 ) RETURNING * ' , 
                    [   req.body.name,
                        req.body.image_url,
                        req.body.barcode,
                        req.body.brand,
                        req.body.calories,
                        req.body.product_size,
                        req.body.nutriscore
                    ])
                    
            return res.status(201).json(response.rows[0])
    }
    catch(error) {

            return res.status(500).json( { error : error.message})
    }   
})

module.exports = router