const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    streetName: String,
    streetNumber: String,
    postCode: String,
    city: String
});

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;