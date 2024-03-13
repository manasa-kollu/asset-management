import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

export default function CreateCustomer() {
    const [CustomerName, setCustomerName] = useState('');
    const [ContactNumber, setContactNumber] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [LaptopName, setLaptopName] = useState('');
    const [LaptopBrand, setLaptopBrand] = useState('');
    const [LaptopModel, setLaptopModel] = useState('');
    const [ActiveStatus, setActiveStatus] = useState('Active');
    const [LaptopQty, setLaptopQty] = useState('');

    const [CreatedAt, setCreatedAt] = useState('');
    const [UpdatedAt, setUpdatedAt] = useState('');
    const [result, setResult] = useState();
    const [result2, setResult2] = useState();
    const [Laptops, setLaptops] = useState([{}]);
    // console.log(Laptops);



    const createdDate = new Date().getDate().toString() + '-' + (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString() + ' ' + new Date().getHours().toString() + ':' + new Date().getMinutes().toString() + ':' + new Date().getSeconds().toString();
    useEffect(() => {
        setCreatedAt(createdDate);
        setLaptops([{}]);
        axios.get('http://localhost:3001')
            .then(result => {
                if (result.data[0]) {
                    setLaptops(result.data)
                }
                else if (result.data[0] == undefined) {
                    setLaptops([{}])
                }
                else {
                    setResult2('error')
                }
            })
            .catch(err => setResult2('error'));

    }, [])
    function check(resultcheck) {
        if (resultcheck == 'success') {
            $('.ms-2.spinner-border').hide();
            $('.create-customer .success').removeClass('d-none');
        }
        else if (resultcheck == 'error') {
            $('.ms-2.spinner-border').hide();
            $('.create-customer .unsuccess').removeClass('d-none');
        }
    }

    const submit = (e) => {
        $('.ms-2.spinner-border').show();
        $('.create-customer .success').addClass('d-none');
        $('.create-customer .unsuccess').addClass('d-none');
        setResult('');
        e.preventDefault();
        axios.post('http://localhost:3001/CreateCustomer', { CustomerName, ContactNumber, Email, Address, LaptopName, LaptopBrand, LaptopModel, ActiveStatus, LaptopQty, CreatedAt, UpdatedAt })
            .then(result => {
                if (result.data.code === 11000) {
                    if (result.data.keyPattern.Email == 1) {
                        setResult('Email');
                    }
                    else if (result.data.keyPattern.ContactNumber == 1) {
                        setResult('Contact Number');
                    }
                    check('error');
                }
                else if (result.data._id) { check('success') }
                else {
                    check('error')
                }

            })
            .catch(err => check('error'))
    }


    return (
        <>
            <div className="container-fluid create-customer">
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Customer</li>
                    </ol>
                </nav>
                <form onSubmit={submit} className="mt-5 mb-5">

                    <h3 className="mb-3">Add Customer</h3>

                    <h5 className="success text-success d-none">Form submitted successfully!</h5>
                    <h5 className="unsuccess text-danger d-none">Form was not submitted, please try again!</h5>
                    <div className={`alert alert-danger fade ${result ? 'd-block show' : 'd-none hide'}`} role="alert">
                        Please check <strong> {result}</strong> can not be repeated, Please try again!
                    </div>
                    <div className={`alert alert-danger fade ${result2 == 'error' ? 'd-block show' : 'd-none hide'}`} role="alert">
                        Error while fetching <strong> Laptop data</strong>!
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleCustomer" className="form-label " style={{ fontWeight: '600' }}>Customer Name </label>
                            <input type="text" onInput={(e) => setCustomerName(e.target.value)} className="form-control" id="exampleCustomer" required />
                        </div>
                        <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleContact" className="form-label " style={{ fontWeight: '600' }}>Contact No </label>
                            <input type="number" onInput={(e) => setContactNumber(e.target.value)} className="form-control" id="exampleContact" required />
                        </div>
                        <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleEmail" className="form-label " style={{ fontWeight: '600' }}>Email  </label>
                            <input type="email" onInput={(e) => setEmail(e.target.value)} className="form-control" id="exampleEmail" required />
                        </div>
                        <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleAddress" className="form-label " style={{ fontWeight: '600' }}>Address </label>
                            <input type="text" onInput={(e) => setAddress(e.target.value)} className="form-control" id="exampleAddress" />
                        </div>

                        <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleActive" className="form-label " style={{ fontWeight: '600' }}>Is Active?</label>
                            {/* <input type="text" onInput={(e) => setBrand(e.target.value)} className="form-control" id="exampleInputname"   /> */}
                            <select className="form-control" defaultValue={ActiveStatus} id="exampleActive" onInput={(e) => setActiveStatus(e.target.value)} >
                                <option value="Active" >Active</option>
                                <option value="Inactive" >Inactive</option>
                            </select>
                        </div>
                        {/* <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleInputname" className="form-label " style={{fontWeight:'600'}}>Created By</label>
                            <input type="text" onInput={(e) => setBrand(e.target.value)} className="form-control" id="exampleInputname"   />
                        </div> */}


                        {/* <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleInputname" className="form-label " style={{fontWeight:'600'}}>Created By</label>
                            <input type="text" onInput={(e) => setBrand(e.target.value)} className="form-control" id="exampleInputname"   />
                        </div> */}
                        <h3 className={`${Laptops[0].LaptopBrand ? 'd-block' : 'd-none'}  mt-4`}>Assign Laptop</h3>
                        <div className={`${Laptops[0].LaptopBrand ? 'd-block' : 'd-none'}col-lg-3 col-md-3 col-6 p-2`}>
                            <label htmlFor="exampLaptopBrand" className="form-label " style={{ fontWeight: '600' }}>Laptop Brand</label>
                            { }
                            <select className="form-control" defaultValue="" id="exampLaptopBrand" onInput={(e) => setLaptopBrand(e.target.value)} >
                                <option value="" disabled>Select</option>
                                {Laptops.map((laptop, key) => {
                                    return (
                                        <option key={key} value={laptop.LaptopBrand}>{laptop.LaptopBrand}</option>
                                    )
                                })}

                            </select>
                        </div>
                        <div className={`${Laptops[0].LaptopBrand ? 'd-block' : 'd-none'}col-lg-3 col-md-3 col-6 p-2`}>
                            <label htmlFor="exampLaptopName" className="form-label " style={{ fontWeight: '600' }}>Laptop Name</label>
                            <select className="form-control" defaultValue="" id="exampLaptopName" onInput={(e) => setLaptopName(e.target.value)} >
                                <option value="" disabled>Select</option>
                                {Laptops.map((laptop, key) => {
                                    return (
                                        <option key={key} value={laptop.Product}>{laptop.Product}</option>
                                    )
                                })}

                            </select>
                        </div>
                        <div className={`${Laptops[0].LaptopBrand ? 'd-block' : 'd-none'}col-lg-3 col-md-3 col-6 p-2`}>
                            <label htmlFor="exampLaptopModel" className="form-label " style={{ fontWeight: '600' }}>Laptop Model</label>
                            <select className="form-control" defaultValue="" id="exampLaptopModel" onInput={(e) => setLaptopModel(e.target.value)} >
                                <option value="" disabled>Select</option>
                                {Laptops.map((laptop, key) => {
                                    return (
                                        <option key={key} value={laptop.Model}>{laptop.Model}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className={`${Laptops[0].LaptopBrand ? 'd-block' : 'd-none'}col-lg-3 col-md-3 col-6 p-2`}>
                            <label htmlFor="exampleLaptopQty" className="form-label " style={{ fontWeight: '600' }}>Laptop Qty </label>
                            <input type="number" onInput={(e) => setLaptopQty(e.target.value)} className="form-control" id="exampleLaptopQty" />
                        </div>
                        <div className="col-12 p-0 pt-3">
                            <button type="submit" className="btn btn-primary m-2"><span style={{ verticalAlign: 'middle' }}>SUBMIT</span> <div style={{ display: 'none', verticalAlign: 'middle', width: '20px', height: '20px' }} className="ms-2 spinner-border" role="status">
                            </div></button>
                            <Link to="/CustomerInventories" className="btn btn-secondary m-2" type="button">Go Back</Link>
                        </div>

                    </div>




                </form>
            </div>

        </>
    );
}