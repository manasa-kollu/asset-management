const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const LaptopModel = require('./models/laptops');
const CustomerModel = require('./models/customers');

const app = express();
app.use(cors());
app.use(express.json());




require('dotenv').config();
const connectToMongDb = async () => {
    mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, });
}
connectToMongDb();


// Laptop crud start
app.get('/', (req, res) => {
    LaptopModel.find({}).then(result => res.json(result)).catch(err => res.json(err))
})

app.get('/getLaptops/:id', (req, res) => {
    const id = req.params.id;
    LaptopModel.findById({ _id: id }).then(users => res.json(users)).catch(err => res.json(err))
})
app.put('/UpdateLaptops/:id', (req, res) => {
    const id = req.params.id;
    LaptopModel.findByIdAndUpdate({ _id: id }, { LaptopBrand: req.body.LaptopBrand, Product: req.body.Product, Processor: req.body.Processor, Ram: req.body.Ram, Storage: req.body.Storage, Model: req.body.Model, Serial: req.body.Serial, ActiveStatus: req.body.ActiveStatus, Qty: req.body.Qty, CreatedAt: req.body.CreatedAt, UpdatedAt: req.body.UpdatedAt, }).then(users => res.json(users)).catch(err => res.json(err))
})
app.delete('/deleteLaptops/:id', (req, res) => {
    const id = req.params.id;
    LaptopModel.findByIdAndDelete({ _id: id }).then(users => res.json(users)).catch(err => res.json(err))
})
app.post('/checkDuplicateLaptop', (req, res) => {
    LaptopModel.find({ LaptopBrand: req.body.LaptopBrand, Model: req.body.Model }).then(result => res.json(result)).catch(err => res.json(err));
})
app.post('/createLaptop', (req, res) => {
    LaptopModel.create(req.body).then(user => res.json(user)).catch(err => res.json(err))
})

// customer crud start
app.get('/getCustomers/:id', (req, res) => {
    const id = req.params.id;
    CustomerModel.findById({ _id: id }).then(result => res.json(result)).catch(err => res.json(err))
})
app.post('/CreateCustomer', (req, res) => {
    CustomerModel.create(req.body).then(result => res.json(result)).catch(err => res.json(err))
})
app.get('/getCustomers', (req, res) => {
    CustomerModel.find({}).then(result => res.json(result)).catch(err => res.json(err))
})
app.delete('/deleteCustomers/:id', (req, res) => {
    const id = req.params.id;
    CustomerModel.findByIdAndDelete({ _id: id }).then(result => res.json(result)).catch(err => res.json(err))
})
app.put('/UpdateCustomers/:id', (req, res) => {
    const id = req.params.id;
    CustomerModel.findByIdAndUpdate({ _id: id }, { CustomerName: req.body.CustomerName, ContactNumber: req.body.ContactNumber, Email: req.body.Email, Address: req.body.Address, LaptopName: req.body.LaptopName, LaptopBrand: req.body.LaptopBrand, LaptopModel: req.body.LaptopModel, ActiveStatus: req.body.ActiveStatus, LaptopQty: req.body.LaptopQty, CreatedAt: req.body.CreatedAt, UpdatedAt: req.body.UpdatedAt }).then(users => res.json(users)).catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log('Server is running');
})
