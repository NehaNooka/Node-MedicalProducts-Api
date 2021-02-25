const express = require('express')
const router = new express.Router()
const Product = require('../models/products')

//Add Product
router.post("/products", async (req, res) => {
    const product = new Product(req.body)

    try {
        await product.save()
        res.status(201).send({ product })
    } catch (e) {
        res.status(400).send(e.message)
    }
})
//Read all Products
router.get("/products/all", async (req, res) => {
    Product.find({}).exec((err, result) => {
        res.send(result)
    })
})
// Read Product by id
router.get("/products/:id", async (req, res) => {
    Product.findById(req.params.id).exec((err, result) => {
        if (err) {
            res.send(err)
        }

        res.send(result)
    })
})
//Update a product

router.patch('/products/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates =  ["type","price","productName"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const result = await Product.findOne({ _id: req.params.id })

        updates.forEach((update) => result[update] = req.body[update])

        //by this middleware will be executed
        await result.save()

        if (!result) {
            return res.status(404).send()
        }

        res.send(result)
    } catch (e) {
        console.log(e);
        res.status(400).send()
    }
})

//Delete a product
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id })

        if (!product) {
            return res.status(404).send()
        }

        res.send(product)
    } catch (e) {
        res.status(500).send(e)
    }
})
module.exports = router