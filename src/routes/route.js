const router = require('express').Router();
const textModel = require('../models/textModel')

router.post('/addText', async (req,res)=>{
    try {
        if(Object.keys(req.body).length ===0) res.status(400).send({status:false, message:"Write Something"})
        req.body.text = req.body.text.toString();
        const addText = await textModel.create(req.body)
        return res.status(201).send({status:true, data:addText})
    } catch (error) {
       return res.status(500).send({status:false, message:error.message})
    }
})

module.exports = router;