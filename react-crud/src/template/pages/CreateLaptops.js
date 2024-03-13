import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

export default function Create() {
    const [LaptopBrand, setLaptopBrand] = useState('');
    const [Product, setProduct] = useState('');
    const [Processor, setProcessor] = useState('');
    const [Ram, setRam] = useState('');
    const [Storage, setStorage] = useState('');
    const [Model, setModel] = useState('');
    const [Serial, setSerial] = useState('');
    const [ActiveStatus, setActiveStatus] = useState('Active');
    const [Qty, setQty] = useState('');
    const [CreatedAt, setCreatedAt] = useState('');
    const [UpdatedAt, setUpdatedAt] = useState('');
    const [result, setResult] = useState();
    const createdDate = new Date().getDate().toString() + '-' + (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString() + ' ' + new Date().getHours().toString() + ':' + new Date().getMinutes().toString() + ':' + new Date().getSeconds().toString();
    useEffect(() => {
        setCreatedAt(createdDate);
    }, [])
    function check(resultcheck) {
        setResult(resultcheck);
        if (resultcheck == 'success') {
            $('.ms-2.spinner-border').hide();
            $('.create-laptop .success').removeClass('d-none');
        }
        else if (resultcheck == 'error') {
            $('.ms-2.spinner-border').hide();
            $('.create-laptop .unsuccess').removeClass('d-none');
        }
    }

    const submit = (e) => {
        $('.ms-2.spinner-border').show();
        $('.create-laptop .success').addClass('d-none');
        $('.create-laptop .unsuccess').addClass('d-none')
        e.preventDefault();
        axios.post('http://localhost:3001/checkDuplicateLaptop', { LaptopBrand, Model })
            .then(result => { (result.data[0] == undefined || result.data[0].LaptopBrand) ? submitAfterCheck(result) : check('error') })
            .catch(err => (err ? check('error') : check('success')))
    }
    const submitAfterCheck = (checkDuplicateResult) => {
        if (checkDuplicateResult.data[0]) {

            const check1 = checkDuplicateResult.data.filter(check => { return (check.LaptopBrand == LaptopBrand && check.Model == Model) });
            if (check1) {
                alert('Laptop Brand: ' + LaptopBrand + " and Model: " + Model + " record exist already.");
                check('error');
            }

            else {
                submitAfterCheck2();
            }
        }
        else if (checkDuplicateResult.data[0] == undefined) {
            submitAfterCheck2();
        }

    }

    const submitAfterCheck2 = () => {
        axios.post('http://localhost:3001/createLaptop', { LaptopBrand, Product, Processor, Ram, Storage, Model, Serial, ActiveStatus, Qty, CreatedAt, UpdatedAt })
            .then(result => { (result.data._id ? check('success') : check('error')) })
            .catch(err => (err ? check('error') : check('success')))
    }

    return (
        <>
            <div className="container-fluid create-laptop">
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Laptop</li>
                    </ol>
                </nav>
                <form onSubmit={submit} className="mt-5 mb-5">

                    <h3 className="mb-4">Add Laptops</h3>

                    <h5 className="success text-success d-none">Form submitted successfully!</h5>
                    <h5 className="unsuccess text-danger d-none">Form was not submitted, please try again!</h5>
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleBrand" className="form-label " style={{ fontWeight: '600' }}>Laptop Brand </label>
                            <input type="text" onInput={(e) => setLaptopBrand(e.target.value)} className="form-control" id="exampleBrand" aria-describedby="emailHelp" required />
                        </div>
                        <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleproductname" className="form-label " style={{ fontWeight: '600' }}>Product Name </label>
                            <input type="text" onInput={(e) => setProduct(e.target.value)} className="form-control" id="exampleproductname" aria-describedby="emailHelp" />
                        </div>
                        <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleProcessor" className="form-label " style={{ fontWeight: '600' }}>Processor </label>
                            <input type="text" onInput={(e) => setProcessor(e.target.value)} className="form-control" id="exampleProcessor" aria-describedby="emailHelp" />
                        </div>
                        <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleRam" className="form-label " style={{ fontWeight: '600' }}>RAM </label>
                            <input type="text" onInput={(e) => setRam(e.target.value)} className="form-control" id="exampleRam" aria-describedby="emailHelp" />
                        </div>
                        <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleStorage" className="form-label " style={{ fontWeight: '600' }}>Storage(HDD/SSD) </label>
                            <input type="text" onInput={(e) => setStorage(e.target.value)} className="form-control" id="exampleStorage" aria-describedby="emailHelp" />
                        </div>
                        <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleModel" className="form-label " style={{ fontWeight: '600' }}>Model No</label>
                            <input type="text" onInput={(e) => setModel(e.target.value)} className="form-control" id="exampleModel" aria-describedby="emailHelp" required />
                        </div>
                        <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleSerial" className="form-label " style={{ fontWeight: '600' }}>Serial No</label>
                            <input type="text" onInput={(e) => setSerial(e.target.value)} className="form-control" id="exampleSerial" aria-describedby="emailHelp" />
                        </div>
                        <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleActive" className="form-label " style={{ fontWeight: '600' }}>Is Active?</label>
                            {/* <input type="text" onInput={(e) => setBrand(e.target.value)} className="form-control" id="exampleInputname" aria-describedby="emailHelp"  /> */}
                            <select className="form-control" defaultValue={ActiveStatus} id="exampleActive" onInput={(e) => setActiveStatus(e.target.value)} >
                                <option value="Active" >Active</option>
                                <option value="Inactive" >Inactive</option>
                            </select>
                        </div>
                        {/* <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleInputname" className="form-label " style={{fontWeight:'600'}}>Created By</label>
                            <input type="text" onInput={(e) => setBrand(e.target.value)} className="form-control" id="exampleInputname" aria-describedby="emailHelp"  />
                        </div> */}
                        <div className="col-lg-3 col-md-3 col-6 p-2">
                            <label htmlFor="exampleQTY" className="form-label " style={{ fontWeight: '600' }}>Quantity</label>
                            <input type="number" onInput={(e) => setQty(e.target.value)} className="form-control" id="exampleQTY" aria-describedby="emailHelp" />
                        </div>


                        <div className="col-12 p-0 pt-3">
                            <button type="submit" className="btn btn-primary m-2"><span style={{ verticalAlign: 'middle' }}>SUBMIT</span> <div style={{ display: 'none', verticalAlign: 'middle', width: '20px', height: '20px' }} className="ms-2 spinner-border" role="status">
                            </div></button>
                            <Link to="/LaptopInventories" className="btn btn-secondary m-2" type="button">Go Back</Link>
                        </div>

                    </div>




                </form>
            </div>

        </>
    );
}