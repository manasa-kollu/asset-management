import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import axios from 'axios';

export default function CustomerInventory() {
    const [customers, setCustomers] = useState([{}]);
    const [result, setResult] = useState();
    const [result2, setResult2] = useState();

    useEffect(() => {
        axios.get('http://localhost:3001/getCustomers')
            .then(result => setCustomers(result.data))
            .catch(err => setResult('error'))
        //initialize datatable
        setTimeout(function () {
            // updatetable();
            $('#example').DataTable();
        }, 300);
    }, [result2])
    // function updatetable() {
    //     // Filter event handler
    //     var table = $('#example').DataTable();

    //     $(table.table().container()).on('keyup', 'thead input', function () {
    //         table
    //             .column($(this).data('index'))
    //             .search(this.value)
    //             .draw();
    //     });
    // }
    function deleteLaptop(id) {
        setResult2();
        const deleteStatus = window.confirm('Are you sure want to delete this record?');
        if (deleteStatus) {

            axios.delete('http://localhost:3001/deleteCustomers/' + id)
                .then(result => {
                    if (result.data._id) { setResult2('success'); }
                    else { alert('Could not delete this record, Please try again!') }
                })
                .catch(err => { console.log(err); alert('Could not delete this record, Please try again!') })
        }

    }
    return (
        <>
            <div className="container-fluid">
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Customer Details</li>
                    </ol>
                </nav>
                <div className="mt-5">

                    <h3>Customer Details</h3>
                    <div className={`alert alert-danger fade ${result == 'error' ? 'd-block show' : 'd-none hide'}`} role="alert">
                        Error while loading data,<strong> Please try again!</strong>
                    </div>
                    <div className={`alert alert-success fade ${result2 == 'success' ? 'd-block show' : 'd-none hide'}`} role="alert">
                        Record deleted <strong> successfully</strong>.
                    </div>
                    <div className="text-end">
                        <Link to="/CreateCustomer" className="btn btn-success mb-4"><i className="fa fa-plus me-2 bg-transparent text-white"></i>Add Customer</Link>
                    </div>
                    <div className="table-responsive my-3">
                        <table className="table table-bordered table-hover text-nowrap d-block overflow-auto w-100 border border-1 mt-4" style={{ borderCollapse: 'collapse' }} id="example">
                            <thead className='text-uppercase' >
                                {/* <tr>
                                    <th ><input type="text" placeholder="Customer Name" data-index="0" /></th>
                                    <th><input type="text" placeholder="Contact Number" data-index="1" /></th>
                                    <th><input type="text" placeholder="Email" data-index="2" /></th>
                                    <th ><input type="text" placeholder="Address" data-index="3" /></th>
                                    <th ><input type="text" placeholder="Laptop Name" data-index="4" /></th>
                                    <th><input type="text" placeholder="Laptop Brand" data-index="5" /></th>
                                    <th><input type="text" placeholder="Laptop Model" data-index="6" /></th>
                                    <th><input type="text" placeholder="Laptop Qty" data-index="7" /></th>
                                    <th><input type="text" placeholder="Status" data-index="8" /></th>
                                    <th><input type="text" placeholder="Create At" data-index="9" /></th>
                                    <th><input type="text" placeholder="Update At" data-index="10" /></th>
                                    <th></th>

                                </tr> */}
                                <tr>
                                    <th className="p-3 bg-light">Customer Name</th>
                                    <th className="p-3 bg-light">Contact Number</th>
                                    <th className="p-3 bg-light">Email</th>
                                    <th className="p-3 bg-light">Address</th>
                                    <th className="p-3 bg-light">Laptop Name</th>
                                    <th className="p-3 bg-light">Laptop Brand</th>
                                    <th className="p-3 bg-light">Laptop Model</th>
                                    <th className="p-3 bg-light">Laptop Qty</th>
                                    <th className="p-3 bg-light">Status</th>
                                    <th className="p-3 bg-light">Create At</th>
                                    <th className="p-3 bg-light">Update At</th>
                                    <th className="p-3 bg-light w-25 position-sticky end-0">Action</th>
                                </tr>
                            </thead>
                            <tbody style={{ verticalAlign: 'middle' }}>
                                {
                                    customers.map((customer, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{customer.CustomerName}</td>
                                                <td>{customer.ContactNumber}</td>
                                                <td>{customer.Email}</td>
                                                <td>{customer.Address}</td>
                                                <td>{customer.LaptopName}</td>
                                                <td>{customer.LaptopBrand}</td>
                                                <td>{customer.LaptopModel}</td>
                                                <td>{customer.LaptopQty}</td>
                                                <td>{customer.ActiveStatus}</td>
                                                <td>{customer.CreatedAt}</td>
                                                <td>{customer.UpdatedAt}</td>
                                                <td className='position-sticky end-0'><Link to={`/UpdateCustomers/${customer._id}`} className="btn btn-info mx-2 text-white">Edit</Link>
                                                    <button onClick={() => deleteLaptop(customer._id)} className="btn btn-danger mx-2 text-white">Delete</button></td>

                                            </tr>)

                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    )

}