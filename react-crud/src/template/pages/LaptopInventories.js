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

export default function LaptopInventory() {
    const [users, setUsers] = useState([{}]);
    const [result, setResult] = useState();
    const [result2, setResult2] = useState();

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => setUsers(result.data))
            .catch(err => setResult('error'))
        //initialize datatable
        // $(document).ready(function () {
        setTimeout(function () {
            $('#example').DataTable();
        }, 1000);
        // });

    }, [result2])

    function deleteLaptop(id) {
        const deleteStatus = window.confirm('Are you sure want to delete?');
        if (deleteStatus) {
            axios.delete('http://localhost:3001/deleteLaptops/' + id)
                .then(result => {
                    if (result.data._id) { setResult2('success'); }
                    else { alert('Could not delete, Please try again!') }
                })
                .catch(err => { console.log(err); alert('Could not delete, Please try again!') })
        }

    }
    return (
        <>
            <div className="container-fluid">
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Laptop Inventories</li>
                    </ol>
                </nav>
                <div className="mt-5">

                    <h3>Laptop Inventories</h3>
                    <div className={`alert alert-danger fade ${result == 'error' ? 'd-block show' : 'd-none hide'}`} role="alert">
                        Error while loading data,<strong> Please try again!</strong>
                    </div>
                    <div className={`alert alert-success fade ${result2 == 'success' ? 'd-block show' : 'd-none hide'}`} role="alert">
                        Record deleted <strong> successfully</strong>.
                    </div>
                    <div className="text-end">
                        <Link to="/CreateLaptops" className="btn btn-success mb-4"><i className="fa fa-plus me-2 bg-transparent text-white"></i>Add Laptop</Link>
                    </div>
                    <div className="table-responsive my-3">
                        <table className="table table-bordered table-hover  text-nowrap  d-block overflow-auto w-100 border border-1 mt-4" style={{ borderCollapse: 'collapse' }} id="example">
                            <thead className='text-uppercase' >
                                <tr>
                                    <th className="p-3 bg-light">Laptop Brand</th>
                                    <th className="p-3 bg-light">Product</th>
                                    <th className="p-3 bg-light">Processor</th>
                                    <th className="p-3 bg-light">Ram</th>
                                    <th className="p-3 bg-light">Storage</th>
                                    <th className="p-3 bg-light">Model</th>
                                    <th className="p-3 bg-light">Serial</th>
                                    <th className="p-3 bg-light">Active Status</th>
                                    <th className="p-3 bg-light">Qty</th>
                                    <th className="p-3 bg-light">Create At</th>
                                    <th className="p-3 bg-light">Update At</th>
                                    <th className="p-3 bg-light w-25 position-sticky end-0">Action</th>
                                </tr>
                            </thead>
                            <tbody style={{ verticalAlign: 'middle' }}>
                                {
                                    users.map((user, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{user.LaptopBrand}</td>
                                                <td>{user.Product}</td>

                                                <td>{user.Processor}</td>
                                                <td>{user.Ram}</td>
                                                <td>{user.Storage}</td>

                                                <td>{user.Model}</td>
                                                <td>{user.Serial}</td>
                                                <td>{user.ActiveStatus}</td>

                                                <td>{user.Qty}</td>
                                                <td>{user.CreatedAt}</td>

                                                <td>{user.UpdatedAt}</td>


                                                <td className='position-sticky end-0'><Link to={`/UpdateLaptops/${user._id}`} className="btn btn-info mx-2 text-white">Edit</Link>
                                                    <button onClick={() => deleteLaptop(user._id)} className="btn btn-danger mx-2 text-white">Delete</button></td>

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