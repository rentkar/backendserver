const express = require( 'express' );
const bodyParser = require( 'body-parser' )
const mongoose = require( 'mongoose' )
const data = require( '../models/data' )


const dataRouter = express.Router()

dataRouter.route( '/' )
	.get((req, res, next)=> {
    data.find({})
    .then((data) => {
        res.statusCode = '200'
        res.setHeader('Content-Type', 'application/json')
        res.json(data)
    }, (err) => next(err))
    .catch((err)=> next(err))
})
.post( (req, res, next) => {
     data.create(req.body)
     .then((data)=>{
         console.log('data Req added', data)
         res.statusCode = 200
         res.setHeader('Content-Type', 'application/json')
         res.json(data)
     }, (err) => next(err))
     .catch((err) => next(err))
})
.put((req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not dataed on /data')
})
.delete((req, res, next) => {
    data.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
})
dataRouter.route('/:dataId')
.get((req, res, next)=> {
    data.findById(req.params.dataId)
    .then((data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not dataed on /data/'+ req.params.dataId);
})
.put((req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT operation not dataed on /data/'+ req.params.dataId);
})
.delete((req, res, next) => {
    data.findByIdAndRemove(req.params.dataId)
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = dataRouter