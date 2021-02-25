const express = require('express')
const router = new express.Router()
const ProductType = require('../models/productTypes')

//Create Product Type
router.post('/productType', async(req, res) => {
    const productType = new ProductType(req.body)
    try {
        await productType.save()
        res.status(201).send(productType)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Read Product Type
router.get('/productType/all', async(req, res) => {
    ProductType.find({}).exec((err, result) => {
        res.send(result)
    })
})
module.exports = router