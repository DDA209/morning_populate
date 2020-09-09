const mongoose = require('mongoose');

// Une façon
// const Schema = mongoose.Schema;

// const Schema = Schema({
//     firstName: String,
//     surname: String,
//     adress: {
//         type: ObjectId,
//         ref: 'Address'
//     }
// });

// ou
const schema = new mongoose.Schema({
    firstName: String,
    surname: String,
    address: {
        type: mongoose.Types.ObjectId,
        ref: 'Address'
    }
});

const model = mongoose.model('Student', schema);

module.exports = model;