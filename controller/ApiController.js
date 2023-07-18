const UserModel = require('../model/user');
const itemModel = require('../model/coffeeItem');
const ContactModel = require('../model/contact');
const bcryptjs = require('bcryptjs');
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");




//====================================Users Registation======================================================

const SecurePassword = async (password) => {
    try {
        const HashPassword = await bcryptjs.hash(password, 10);
        return HashPassword;
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.addUser = async (req, res) => {
    try {
        const Passwordhash = await SecurePassword(req.body.password)
        // const image=req.file;
        const user = await new UserModel({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            // image:image.path,
            image: req.file.filename,
            password: Passwordhash,
        })
        const duplicateEmail = await UserModel.findOne({ email: req.body.email })
        if (duplicateEmail) {
            res.status(400).json({ success: false, message: "email already exist" });
        } else {
            const result = await user.save()
            res.status(200).json({ success: true, msg: "User Registered Successfully", data: result, status: 200 })
        }
    } catch (error) {
        console.log(error);
        res.status(201).json({ success: false, msg: "User Not Registered" })
    }
}

//====================================Users Login===========================================================

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const Users = await UserModel.findOne({ email })
        if (Users && (await bcryptjs.compare(password, Users.password))) {
            return res.status(200).json({ success: true, msg: "Login......", 'user': Users, status: true })
        }
    } catch (error) {
        res.status(201).json({ success: false, msg: "User not Login" })

    }
}

//====================================Get Users==========================================================

exports.getUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        res.status(200).json({ success: true, msg: "Users fetch Successfully", data: users, status: true })
    } catch (error) {
        res.status(201).json({ success: false, msg: "Users Not fetch" })

    }
}
//====================================Contact============================================================
exports.contact = async (req, res) => {
    try {
        const phone = await new ContactModel({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            message: req.body.message
        })
        const contactresult = await phone.save()
        res.status(200).json({ success: true, msg: "Item Added Successfully", data: contactresult, status: 200 })
    } catch (error) {
        res.status(201).json({ success: false, msg: "Item Not Added" })

    }
}
//====================================Get Item============================================================

exports.item = async (req, res) => {
    try {

        const item = await itemModel.find()
        res.status(200).json({ success: true, msg: "Item fetch Successfully", data: item })
    } catch (error) {
        res.status(201).json({ success: false, msg: "Item Not fetch" })

    }
}

