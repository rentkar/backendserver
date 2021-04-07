const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const orders = require('../models/orders');

const ordersRouter = express.Router()
ordersRouter.use( bodyParser.json() )

ordersRouter.route('/')
.get((req, res, next)=> {
    orders.find( {} )
    .populate('reqId allocatedProductId')

    .then((orders) => {
        res.statusCode = '200'
        res.setHeader('Content-Type', 'application/json')
        res.json(orders)
    }, (err) => next(err))
    .catch((err)=> next(err))
})
.post( (req, res, next) => {
    orders.create( req.body )
    .then((orders)=>{
        console.log('Order Requests added', orders)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(orders)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req, res, next) => {
    res.statusCode = 403
	res.end( 'PUT operation not supported on /orders')
})
.delete((req, res, next) => {
    orders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
})

ordersRouter.route('/:orderId')
.get((req, res, next)=> {
    orders.findById( req.params.orderId )
    .populate('reqId allocatedProductId')
    .then((order) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(order);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /orders/'+ req.params.orderId);
})
.put((req, res, next) =>{
    orders.findByIdAndUpdate(req.params.orderId,{
        $set: req.body
    }, {new: true})
    .then((order) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(order)
    },(err)=> next(err))
    .catch((err) => next(err))
})
.delete((req, res, next) => {
    orders.findByIdAndRemove(req.params.orderId)
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = ordersRouter