const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const orderreq = require('../models/orderreq');

const orderreqRouter = express.Router()

orderreqRouter.use( bodyParser.json() )

orderreqRouter.route('/')
.get((req, res, next)=> {
    orderreq.find( {} )
    .populate('productId userId')
    .then((orderreq) => {
        res.statusCode = '200'
        res.setHeader('Content-Type', 'application/json')
        res.json(orderreq)
    }, (err) => next(err))
    .catch((err)=> next(err))
})
.post( (req, res, next) => {
    orderreq.create( req.body )
    .then((orderreq)=>{
        console.log('Order Requests added', orderreq)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(orderreq)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req, res, next) => {
    res.statusCode = 403
	res.end( 'PUT operation not supported on /orderreq')
})
.delete((req, res, next) => {
    orderreq.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
})

orderreqRouter.route('/:orderreqId')
.get((req, res, next)=> {
    orderreq.findById( req.params.orderreqId )
    .populate('productId userId')
    .then((orderreq) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(orderreq);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /orderreq/'+ req.params.orderreqId);
})
.put((req, res, next) =>{
    orderreq.findByIdAndUpdate(req.params.orderreqId,{
        $set: req.body
    }, {new: true})
    .then((orderreq) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(orderreq)
    },(err)=> next(err))
    .catch((err) => next(err))
})
.delete((req, res, next) => {
    orderreq.findByIdAndRemove(req.params.orderreqId)
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = orderreqRouter