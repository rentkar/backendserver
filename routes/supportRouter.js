const express = require( 'express' );
const bodyParser = require( 'body-parser' )
const mongoose = require( 'mongoose' )
const Support = require( '../models/support' )

const supportRouter = express.Router()

supportRouter.route( '/' )
	.get((req, res, next)=> {
        Support.find( {} )
        .populate('userId orderId')
    .then((support) => {
        res.statusCode = '200'
        res.setHeader('Content-Type', 'application/json')
        res.json(support)
    }, (err) => next(err))
    .catch((err)=> next(err))
})
.post( (req, res, next) => {
     Support.create(req.body)
     .then((support)=>{
         console.log('Support Req added', support)
         res.statusCode = 200
         res.setHeader('Content-Type', 'application/json')
         res.json(support)
     }, (err) => next(err))
     .catch((err) => next(err))
})
.put((req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /support')
})
.delete((req, res, next) => {
    Support.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
})

supportRouter.route('/:supportId')
.get((req, res, next)=> {
    Support.findById( req.params.supportId )
    .populate('userId orderId')
    .then((support) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(support);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Support/'+ req.params.supportId);
})
.put((req, res, next) =>{
    Support.findByIdAndUpdate(req.params.supportId,{
        $set: req.body
    }, {new: true})
    .then((support) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(support)
    },(err)=> next(err))
    .catch((err) => next(err))
})
.delete((req, res, next) => {
    Support.findByIdAndRemove(req.params.supportId)
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = supportRouter