const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AddSchema = new Schema({
    customer_id: {
        type: String,
        required: true
    },
    item_id: {
        type: String,
        required: true
    },
    quenty: {
        type: Number,
        required: true
    },
    // image: {
    //     type: String,
    //     required: true
    // },
   
})
const AddModel = new mongoose.model('Add',AddSchema);
module.exports = AddModel;