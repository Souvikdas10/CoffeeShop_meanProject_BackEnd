const express = require('express');
const Route = express.Router()
const multer = require('multer');
const path = require('path')
const ApiController = require('../controller/ApiController')


// Route.use('/upload', express.static(path.join(__dirname, 'upload')))

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'upload')
//     }, filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.includes("png") ||
//         file.mimetype.includes("jpg") ||
//         file.mimetype.includes("jpeg")) {
//         cb(null, true)
//     }
//     else {
//         cb(null, false)
//     }
// }
// Route.use(multer({
//     storage: fileStorage, fileFilter: fileFilter, limits: {
//         fieldSize: 1024 * 1024 * 5
//     }
// }).single('image'))


//============users Reg and Login===========
Route.post('/reg', ApiController.addUser)
Route.post('/login', ApiController.login)

//============Get Users===========
Route.get('/getUsers',ApiController.getUsers)
Route.get('/getItem',ApiController.item)

//============Contact===========
Route.post('/contact',ApiController.contact)



module.exports = Route;