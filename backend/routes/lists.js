const pool    = require('../db')
const express = require('express')
const router  = express.Router()



router.get('/', async (req, res) => {   
    try {
        const result = await pool.query( 'SELECT * FROM lists')
        return res.json(result.rows)
    }
    catch (error) {
        return res.status(500).json({error : error.message})
    }    
})

router.post('/', async (req, res) => {
    if(! req.body.name){
        return res.status(400).json({ error : 'No complete body'})
    }

    try {
        const result = await pool.query( 'INSERT INTO lists (name) VALUES ($1) RETURNING * ' ,[req.body.name])
        return res.status(201).json(result.rows[0])
    }
    catch(error) {
        return res.status(500).json({error : error.message })
    }  
})

router.delete('/:id',async(req,res) => {

    if(!req.params.id) {
        return res.status(400).json( {error : 'No complete body'})    
    }
    try {
        const result = await pool.query('DELETE FROM lists WHERE id = $1',[req.params.id])
        if(result.rowCount === 0 ) {
            return res.status(404).json({error : 'NOT FOUND '})
        }

        return res.status(200).json({ message: 'Liste supprimée' })
    }
    catch (error) {
        return res.status(500).json({ error : error.message})
    }
    
})

module.exports = router