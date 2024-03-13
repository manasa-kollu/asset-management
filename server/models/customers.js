const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    CustomerName: { type: String, required: [true, 'Customer Name is required'] },
    ContactNumber: { type: Number, unique: [true, 'Contact Number should be unique'], required: [true, 'Contact Number is required'] },
    Email: { type: String, unique: [true, 'Email should be unique'], required: [true, 'Email Id is required'] },
    Address: { type: String },
    LaptopName: { type: String },
    LaptopBrand: { type: String },
    LaptopModel: { type: String },
    ActiveStatus: { type: String },
    LaptopQty: { type: Number },
    CreatedAt: { type: String },
    UpdatedAt: { type: String },
});

const CustomerModel = mongoose.model("customers", UserSchema)
module.exports = CustomerModel;