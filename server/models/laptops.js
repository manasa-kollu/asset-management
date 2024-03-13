const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    LaptopBrand: { type: String, required: [true, 'Laptop brand is required'] },
    Product: { type: String },
    Processor: { type: String },
    Ram: { type: String },
    Storage: { type: String },
    Model: { type: String, required: [true, 'Laptop Model is required'] },
    Serial: { type: String },
    ActiveStatus: { type: String },
    Qty: { type: Number },
    CreatedAt: { type: String },
    UpdatedAt: { type: String },


});

const LaptopModal = mongoose.model("laptops", UserSchema)
module.exports = LaptopModal;