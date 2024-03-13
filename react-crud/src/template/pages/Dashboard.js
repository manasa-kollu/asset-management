import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    return (
        <>
            <div className="container-fluid">
                {/* <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active"><a href="#">Dashboard</a></li>
                    </ol>
                </nav> */}
                <div className="mt-4">
                    <h3>Dashboard</h3>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-3 col-md-6  p-3">
                        <div className="rounded shadow  text-center border">
                            <div className="d-block p-3">
                                <i className="fa fa-laptop fa-lg text-primary d-inline-block" style={{ fontSize: '40px', lineHeight: '1' }}></i>
                                <h1 className=' mt-3 mb-0'>12</h1></div>
                            <h4 className='mb-0 py-2 pb-3 border-top  text-primary'>Total Laptops</h4>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6  p-3">
                        <div className="rounded shadow  text-center border">
                            <div className="d-block p-3">
                                <i className="fa fa-laptop fa-lg text-primary d-inline-block" style={{ fontSize: '40px', lineHeight: '1' }}></i>
                                <h1 className=' mt-3 mb-0'>12</h1></div>
                            <h4 className='mb-0 py-2 pb-3 border-top  text-primary'>Assigned Laptop</h4>

                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6  p-3">
                        <div className="rounded shadow  text-center border">
                            <div className="d-block p-3">
                                <i className="fa fa-user fa-lg text-primary d-inline-block" style={{ fontSize: '40px', lineHeight: '1' }}></i>
                                <h1 className=' mt-3 mb-0'>12</h1></div>
                            <h4 className='mb-0 py-2 pb-3 border-top  text-primary'>Pending to Assign</h4>

                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6  p-3">
                        <div className="rounded shadow  text-center border">
                            <div className="d-block p-3">
                                <i className="fa fa-users fa-lg text-primary d-inline-block" style={{ fontSize: '40px', lineHeight: '1' }}></i>
                                <h1 className=' mt-3 mb-0'>12</h1></div>
                            <h4 className='mb-0 py-2 pb-3 border-top  text-primary'>Total Customers</h4>

                        </div>
                    </div>


                </div>
            </div >
        </>
    )
}