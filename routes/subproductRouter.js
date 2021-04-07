const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const SubProducts = require('../models/subproducts');
const subproductRouter = express.Router()

subproductRouter.use(bodyParser.json())
// for all subproducts
subproductRouter.route('/')
.get((req, res, next)=> {
    SubProducts.find( {} )
    .populate('lenderId productId orderId')
    .then((subproducts) => {
        res.statusCode = '200'
        res.setHeader('Content-Type', 'application/json')
        res.json(subproducts)
    }, (err) => next(err))
    .catch((err)=> next(err))
})
.post( (req, res, next) => {
     SubProducts.create(req.body)
     .then((subproduct)=>{
         console.log('SubProducts added', subproduct)
         res.statusCode = 200
         res.setHeader('Content-Type', 'application/json')
         res.json(subproduct)
     }, (err) => next(err))
     .catch((err) => next(err))
})
.put((req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /subproducts')
})
.delete((req, res, next) => {
    SubProducts.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
})

subproductRouter.route('/:subproductId')
.get((req, res, next)=> {
    SubProducts.findById( req.params.subproductId )
    .populate('lenderId productId orderId')
    .then((subproduct) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(subproduct);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /subproducts/'+ req.params.subproductId);
})
.put((req, res, next) =>{
    SubProducts.findByIdAndUpdate(req.params.subproductId,{
        $set: req.body
    }, {new: true})
    .then((subproduct) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(subproduct)
    },(err)=> next(err))
    .catch((err) => next(err))
})
.delete((req, res, next) => {
    SubProducts.findByIdAndRemove(req.params.subproductId)
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = subproductRouter