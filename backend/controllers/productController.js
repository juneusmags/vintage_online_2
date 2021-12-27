import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import express from 'express'


//@desc         FETCH ALL PRODUCTS
//@route        GET /api/products
//@access       PUBLIC
const getProducts = asyncHandler(async (req, res) =>{

    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
    name : {
        $regex: req.query.keyword,
        $options: 'i'
    }
} : {}

    const count =await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
    
    
    res.json({products, page, pages:Math.ceil(count/pageSize)})
})



//@desc         FETCH ONE PRODUCTS
//@route        GET /api/products/:id
//@access       PUBLIC
const getProductById = asyncHandler(async (req, res) =>{

    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }
    else{
        res.status(404).json({message: 'Product not found'})
    }
})



//@desc         DELETE ONE PRODUCTS
//@route        DELETE /api/products/:id
//@access       PRVATE/ADMIN
const deleteProduct = asyncHandler(async (req, res) =>{

    const product = await Product.findById(req.params.id)
    if(product){
        await product.remove()
        res.json({message: "Product has been deleted!"})
    }
    else{
        res.status(404).json({message: 'Product not found'})
    }
})



//@desc         CREATE ONE PRODUCTS
//@route        POST /api/products/:id
//@access       PRVATE/ADMIN
const createProduct = asyncHandler(async (req, res) =>{

    const product = new Product({
        name: 'Enter name of product',
        price: 0,
        user : req.user._id,
        image : ' ',
        brand: 'Enter brand',
        category : 'Enter category',
        countInStock : 0,
        numReviews: 0,
        description: 'Enter description'

    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
    
})


//@desc         UPDATE ONE PRODUCTS
//@route        PUT /api/products/:id
//@access       PRVATE/ADMIN
const updateProduct = asyncHandler(async (req, res) =>{

    const {name, price, description, image, brand, category, countInStock} = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name,
        product.price = price,
        product.description = description,
        product.image = image,
        product.brand = brand,
        product.category = category,
        product.countInStock = countInStock
    }
    else{
        res.status(404)
        throw new Error("Product not found!")
    }

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
    
})





//@desc         CREATE NEW REVIEW
//@route        POST /api/products/:id/review
//@access       PRVATE
const createReview = asyncHandler(async (req, res) =>{

    const {rating, comment} = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error("Product already reviewed!")
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length


        product.rating = product.reviews.reduce((acc,item) => item.rating + acc, 0)/product.reviews.length

        await product.save()
        res.status(201).json({message: 'Review has been added!'})
    
    }

    
    else{
        res.status(404)
        throw new Error("Product not found!")
    }

    
})




//@desc         GET TOP PRODUCTS
//@route        POST /api/products/:id/review
//@access       PRVATE
const getTopProducts = asyncHandler(async (req, res) =>{

    

    const products = await Product.find({}).sort({rating: -1}).limit(4)

    res.json(products)    
})



export {getProducts, getProductById, deleteProduct, createProduct, createReview, updateProduct, getTopProducts}