const express = require('express');
const Route = express.Router()

const AdminController = require('../controller/adminController');

Route.get('/admin/',AdminController.dashboard)

Route.get('/admin/users',AdminController.Users)

Route.get('/admin/deactiveuser/:id',AdminController.deactiveuser)
Route.get('/admin/activeuser/:id',AdminController.activeuser)

Route.get('/admin/contact',AdminController.contact)

Route.get('/admin/item',AdminController.item)
Route.post('/admin/itemCreate',AdminController.itemCreate)

Route.get('/admin/activeitem/:id',AdminController.activeItem)
Route.get('/admin/deactiveitem/:id',AdminController.deactiveItem)

module.exports=Route;