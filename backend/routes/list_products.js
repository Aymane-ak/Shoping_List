const pool    = require('../db');
const express = require('express');
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {

    if (!req.params.list_id){

        return res.status(400).json({error : 'BAD REQUEST : MISSING ID '})
    }
    try {

        const result = await pool.query( 'SELECT p.name, p.image_url, p.brand, p.calories,  p.nutriscore, p.product_size,' +
                            ' lp.id, lp.bought, lp.quantity FROM list_products lp JOIN products p ON p.id = lp.product_id WHERE lp.list_id = $1',
                        [req.params.list_id])
        return res.json(result.rows)
    }
    catch (error){
        return res.status(500).json({error : error.message})
    }
    
})

router.post('/', async( req,res) => {
    try {
        // 1. Récupérer le produit via son barcode (identifiant externe)
        const productQuery = await pool.query('SELECT id FROM products where barcode = $1 ', [req.body.barcode])
            // Si le produit n'existe pas en base → erreur fonctionnelle
        if(productQuery.rowCount === 0 ) {
            return res.status(404).json({error : 'PRODUCT NOT FOUND' })
        }
        // Construction de l'id à partir du resultat de la requette précédentt 
        const productId    = productQuery.rows[0].id
        // 2. Vérifier si le produit est déjà dans la liste
        // TODO: remplacer cette vérification par une contrainte UNIQUE en base (list_id, product_id)
        // et gérer l'erreur 23505 côté backend
        const checkQuery = await pool.query('SELECT 1 FROM list_products WHERE list_id = $1 AND product_id = $2' , [req.params.list_id,productId])

        if (checkQuery.rowCount > 0 ) {

            return res.status(400).json({error : 'PRODUCT ALREADY IN THE LIST'})
        }
        const result = await pool.query('INSERT INTO list_products (list_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING * ', [req.params.list_id, productId ,req.body.quantity])
        return res.status(201).json(result.rows[0])
    }
    catch (error) { 
        res.status(500).json({ error : error.message})
    }     
} )


router.put('/:id', async (req,res) => {
    if( !req.body.bought || !req.body.quantity ){

        return res.status(404).json({error : 'BAD REQUEST '})
    }
    try {
            const result = await pool.query('UPDATE list_products SET bought = $1 , quantity = $2 WHERE id = $3 RETURNING * ', 
                [req.body.bought,req.body.quantity, req.params.id])
            return res.json(result.rows[0])
    }
    catch (error){
            return res.status(500).json({error : error.message})
    }    
}) 


router.delete('/:id', async (req,res)=> {

    if(!req.params.id){

        return res.status(400).json('MISSING ID')
    }
    try {
            const  response = await pool.query('DELETE FROM list_products WHERE product_id = $1 AND list_id = $2', [req.params.id, req.params.list_id])
            if(response.rowCount===0){

                return res.status(404).json({error : 'NOT FOUND'})
            }
            return res.status(200).json({ message: 'Produit supprimé de la liste' })
    }
    catch (error) {
        return res.status(500).json({ error : error .message})
    } 
})

module.exports = router