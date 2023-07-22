const express = require('express');
const Route = express.Router()
// const multer = require('multer');
const path = require('path')
// const jwt=require('jsonwebtoken')
const ApiController = require('../controller/ApiController')
// const auth = require('../middleware/userAuth')


//============users Reg and Login===========
Route.post('/reg', ApiController.addUser)
Route.post('/login', ApiController.login)

//============Get Users===========
Route.get('/getUsers',ApiController.getUsers)
Route.get('/getItem',ApiController.item)
Route.get('/single/:id',ApiController.single)


//============Contact===========
Route.post('/contact',ApiController.contact)

// Route.get('/test',ApiController.auth,ApiController.test);


module.exports = Route;