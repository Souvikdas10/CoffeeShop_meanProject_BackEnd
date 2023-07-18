const UserModel = require('../model/user');
const ContactModel = require('../model/contact');
const itemModel = require('../model/coffeeItem');
const path=require('path');
const { log } = require('console');


exports.dashboard = (req, res) => {
    UserModel.find().then(result => {
        ContactModel.find().then(result1 => {
            itemModel.find().then(result2=>{
                res.render('admin/dashboard', {
                    title: 'Admin || Dashboard',
                    Users: result,
                    contact: result1,
                    item:result2
                })
            })
        })
    })
}

exports.Users = (req, res) => {
    UserModel.find().then(result => {
        // console.log("all user:",result);
        res.render('admin/users', {
            title: 'Users',
            displayData: result
        })
    })
}



exports.activeuser = (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndUpdate(id, { status: true }).then(result => {
        console.log(result, "Deactived Users");
        res.redirect('/admin/users')
    }).catch(err => {
        console.log(err);
    })
}
exports.deactiveuser = (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndUpdate(id, { status: false }).then(result => {
        console.log(result, "Deactived Users");
        res.redirect('/admin/users')
    }).catch(err => {
        console.log(err);
    })
}


exports.contact = (req, res) => {
    ContactModel.find().then(result => {
        res.render('admin/contact', {
            title: 'Contact Page',
            displayData: result
        })
    })
}

exports.item = (req, res) => {
    itemModel.find().then(result => {
    // console.log("all items:",result);
        res.render('admin/item', {
            title: 'Item Page',
            displayData: result
        })
    })
}

exports.itemCreate = (req, res) => {
    // const image = req.file
    itemModel({
        itemName: req.body.itemName,
        // image: image.path,
        image:req.file.filename,
        itemDetails: req.body.itemDetails,
        price: req.body.price
    }).save().then(result => {
        console.log(result);
        console.log("Item added successfull..")

        res.redirect('/admin/item')
    }).catch(err => {
        console.log(err);
        console.log('error',"item not added ..")
        res.redirect('/admin/item')

    })
}

exports.activeItem = (req, res) => {
    const id = req.params.id
    itemModel.findByIdAndUpdate(id, { status: true }).then(result => {
        console.log(result, "Deactived Users");
        res.redirect('/admin/item')
    }).catch(err => {
        console.log(err);
    })
}

exports.deactiveItem = (req, res) => {
    const id = req.params.id
    itemModel.findByIdAndUpdate(id, { status: false }).then(result => {
        console.log(result, "Deactived Users");
        res.redirect('/admin/item')
    }).catch(err => {
        console.log(err);
    })
}
