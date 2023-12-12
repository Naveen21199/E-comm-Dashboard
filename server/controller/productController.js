const productModel = require("../models/productModel")

const addProductController = async (req, res) => {
    let product = productModel(req.body)
    let result = await product.save()
    res.send(result)
}

const getProductsController = async (req, res) => {
    let products = await productModel.find()
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({
            result: "No Product found"
        })
    }
}
const deleteProductController = async (req, res) => {
    const result = await productModel.deleteOne({ _id: req.params.id })
    res.send(result)
}

const getProductController = async (req, res) => {
    let result = await productModel.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({
            results: "No Record Found",
        })
    }


}
const updateProductController = async (req, res) => {
    let result = await productModel.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
}

const searchController = async (req, res) => {
    let result = await productModel.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
        ]
    })
    res.send(result)
}
module.exports = { addProductController, getProductsController, deleteProductController, updateProductController, getProductController, searchController }