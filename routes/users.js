var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser')
var Users = require('../models/user');

router.use(bodyParser.json());


/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup', (req, res, next) => {
  User.findOne({username: req.body.username})
  .then((user) => {
    if (user != null) {
      var err = new Error('User ' + req.body.username + ' already exists!')
      err.status = 403;
      next(err)
    }
    else{
      return User.create({    //to do : make changes to overwrite default values
        username: req.body.username,
        password: req.body.password
      })
    }
  })
  .then((user) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({status: 'Registration Successful!', user: user})
  }, (err) => next(err))
  .catch((err) => next(err))
})

router.post('/login', (req, res, next) => {
  if(!req.session.user){
    var authHeader = req.headers.authorization
  
    if(!authHeader){
      var err = new Error('You are not authenticated!')
      res.setHeader('WWW-Authenticate', 'Basic')
      err.status = 401
      return next(err)
    }
  
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
    var username = auth[0];
    var password = auth[1];

    User.findOne({username: username})
    .then((user) => {

    if (user === null){
    var err = new Error ('User ' + username + ' does not exist!')
    err.status = 403  
    return next(err) //authorized
    } else if(user.password !== password){
      var err = new Error('Your password is incorrect!')
      err.status = 403
      return next(err)
    }
  else if (user.username === username && user.password === password) {
    req.session.user = 'authenticated'
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('You are authenticated!')
  }
})
.catch((err) => next(err))
}
else {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('You are already authenticated!')
}
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy()
    res.clearCookie('session-id')
    res.redirect('/')
  }
  else {
    var err = new Error('You are not logged in!');
    next(err)
  }
})

/*

router.route('/login/UserProfile')
.get((req, res, next)=> {
    UserProfile.findById(req.params.UserProfile)
    .then((UserProfile) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(UserProfile);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /users/login/UserProfile');
})
.put((req, res, next) =>{
    UserProfile.findByIdAndUpdate(req.params.UserProfile, {
        $set: req.body
    }, {new: true})
    .then((UserProfile) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(UserProfile)
    },(err)=> next(err))
    .catch((err) => next(err))
})
.delete((req, res, next) => {
    UserProfile.findByIdAndRemove(req.params.UserProfile)
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})
*/


router.route( '/' )
.get((req, res, next)=> {
    Users.find({})
    .then((users) => {
        res.statusCode = '200'
        res.setHeader('Content-Type', 'application/json')
        res.json(users)
    }, (err) => next(err))
    .catch((err)=> next(err))
})
.post( (req, res, next) => {
  Users.create( req.body )
     .then((users)=>{
         console.log('Users added', users)
         res.statusCode = 200
         res.setHeader('Content-Type', 'application/json')
         res.json(users)
     }, (err) => next(err))
     .catch((err) => next(err))
})
.put((req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /users')
})
.delete((req, res, next) => {
    Users.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
})

router.route('/:userId')
.get((req, res, next)=> {
  Users.findById( req.params.userId )
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /users/'+ req.params.userId);
})
.put((req, res, next) =>{
    Users.findByIdAndUpdate(req.params.userId,{
        $set: req.body
    }, {new: true})
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json') 
        res.json(user)
    },(err)=> next(err))
    .catch((err) => next(err))
})
.delete((req, res, next) => {
    
  Users.findByIdAndRemove( req.params.userId )
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = router
