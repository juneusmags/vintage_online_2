import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import express from 'express'


//@desc         CREATE NEW ORDER
//@route        POST /api/orders
//@access       PRIVATE
const addOrderItems = asyncHandler(async (req, res) =>{
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body

    if(orderItems && orderItems.length === 0 ){
        res.status(400)
        throw new Error("No items ordered!")
        return
    }
    else{
        const order = new Order({
             orderItems, user : req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})



//@desc         GET ORDER BY ID
//@route        GET /api/orders/:id
//@access       PRIVATE
const getOrderById = asyncHandler(async (req, res) =>{
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json(order)
    }
    else{
        res.status(404)
        throw new Error("Order not Found!")
    }
})


//@desc         UPDATE ORDER TO PAID
//@route        GET /api/orders/:id/pay
//@access       PRIVATE
const updateOrderToPaid = asyncHandler(async (req, res) =>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time : req.body.update_time,
            email_address : req.body.payer.email_address
        }


        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }
    else{
        res.status(404)
        throw new Error("Order not Found!")
    }
})


//@desc         GET USER ORDERS
//@route        GET /api/orders/myorders
//@access       PRIVATE
const getMyOrders = asyncHandler(async (req, res) =>{
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
    
})


//@desc         GET ALL ORDERS
//@route        GET /api/orders
//@access       PRIVATE ADMIN
const getOrders = asyncHandler(async (req, res) =>{
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
    
})


//@desc         UPDATE ORDER TO DELIVERED
//@route        GET /api/orders/:id/deliver
//@access       PRIVATE
const updateOrderToDelivered = asyncHandler(async (req, res) =>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }
    else{
        res.status(404)
        throw new Error("Order not Found!")
    }
})



export {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered}