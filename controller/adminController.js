const UserModel = require('../model/user');
const ContactModel = require('../model/contact');
const itemModel = require('../model/coffeeItem');
const path=require('path');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')


exports.login = (req, res) => {
    res.render('./admin/login', {
        title: "admin || login",
        // message: req.flash('message'),

    })
}

exports.logincreate = (req, res) => {
    UserModel.findOne({
        email: req.body.email
    }, (err, data) => {
        if (data) {
            if (data.isAdmin == true) {
                const haspassword = data.password
                if (bcrypt.compareSync(req.body.password, haspassword)) {
                    const token = jwt.sign({
                        id: data._id,
                        name: data.name,
                        pic: data.image
                    }, 'coffeeshop@2023', { expiresIn: '1h' })
                    res.cookie('AdminToken', token)
                    if (req.body.rememberme) {
                        res.cookie('email', req.body.email)
                        res.cookie('password', req.body.password)
                    }
                    console.log(data);
                    res.redirect('/admin/dashboard')
                } else {
                    console.log("Incorrect password");
                    res.redirect('/admin/')
                }
            } else {
                req.flash('message', "You are not an Admin")
                res.redirect('/admin/')
            }

        } else {
            console.log("Incorrect email");
            res.redirect('/admin/')
        }
    })
}


exports.adminauth = (req, res, next) => {
    if (!req.admin) {
        console.log(req.admin,"aaa");
        next();
    } else {
        console.log(req.admin,"bbb");
        // req.flash('message', "can not access this page ..please login first")
        console.log("can not access this page ..please login first")
        res.redirect('/admin/')
    }
}


exports.logout = (req, res) => {
    res.clearCookie('AdminToken')
    res.redirect('/admin/')
}



exports.dashboard = (req, res) => {
    UserModel.find().then(result => {
        ContactModel.find().then(result1 => {
            itemModel.find().then(result2=>{
                res.render('admin/dashboard', {
                    title: 'Admin || Dashboard',
                    data:req.admin,
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
