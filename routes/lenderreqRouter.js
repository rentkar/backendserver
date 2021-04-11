const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const lenderreq = require('../models/lenderreq');
const lenderreqRouter = express.Router()

lenderreqRouter.use(bodyParser.json())
lenderreqRouter.route('/')
.get((req, res, next)=> {
    lenderreq.find( {} )
     .populate('userId')
    .then((lenderreq) => {
        res.statusCode = '200'
        res.setHeader('Content-Type', 'application/json')
        res.json(lenderreq)
    }, (err) => next(err))
    .catch((err)=> next(err))
})
.post( (req, res, next) => {
    lenderreq.create( req.body )
        
     .then((lenderreq)=>{
         console.log('Lender Request added', lenderreq)
         res.statusCode = 200
         res.setHeader('Content-Type', 'application/json')
         res.json(lenderreq)
     }, (err) => next(err))
     .catch((err) => next(err))
})
.put((req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /lenderreq')
})
.delete((req, res, next) => {
    lenderreq.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
})

lenderreqRouter.route('/:lenderreqId')
.get((req, res, next)=> {
    lenderreq.findById( req.params.lenderreqId )
    .populate('userId products')
    .then((lenderreq) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lenderreq);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /lenderreq/'+ req.params.lenderreqId);
})
.put((req, res, next) =>{
    lenderreq.findByIdAndUpdate(req.params.lenderreqId,{
        $set: req.body
    }, {new: true})
    .then((lenderreq) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(lenderreq)
    },(err)=> next(err))
    .catch((err) => next(err))
})
.delete((req, res, next) => {
    lenderreq.findByIdAndRemove(req.params.lenderreqId)
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = lenderreqRouter