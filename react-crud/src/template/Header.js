import React from 'react';
import Dashboard from './pages/Dashboard';
import CreateLaptops from './pages/CreateLaptops';
import UpdateLaptops from './pages/UpdateLaptops'
import LaptopInventory from './pages/LaptopInventories';
import CreateCustomer from './pages/CreateCustomers';
import UpdateCustomers from './pages/UpdateCustomers';
import CustomerInventory from './pages/CustomerInventories';

import NoPage from './pages/Nopage';
import { Routes, Route } from 'react-router-dom';

export default function Header(props) {
    return (<div className="w-100">
        <header className="w-100">
            <nav className="navbar navbar-expand-md bg-dark py-3">
                <div className="container-fluid">
                    <i className="fa-solid fa-bars fa-lg ms-2 text-white cursor-pointer" onClick={props.toggleSidebarvalue}></i>
                    <i className="fa fa-chevron-circle-right fa-lg ms-2 text-white d-none cursor-pointer" onClick={props.toggleSidebarvalue}></i>
                    <a href="/" className="d-block d-md-none" style={{ position: 'sticky', top: '0px', background: '#f8f9fa' }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZP9ZvG-R7dRMbH02pwRJddDS70295mDTmTqwmB8OW&amp;s" style={{ maxWidth: '100px', height: 'auto' }} />
                    </a>
                    <div className="dropdown pe-2">
                        <a href="#" style={{ color: '#ffffff' }} className="d-flex align-items-center   text-white text-decoration-none dropdown-toggle position-relative" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa fa-user-circle fa-lg me-2 "></i>
                            <strong >Admin</strong>
                        </a>
                        <ul className="dropdown-menu text-small shadow  " style={{ left: 'unset', right: '0px' }} aria-labelledby="dropdownUser2">
                            <li><a className="dropdown-item" href="#">Logout </a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header >
        <main className="p-3 w-100">
            <Routes>
                <Route path="/">
                    <Route index element={<Dashboard />} />
                    <Route path="/CreateLaptops" element={<CreateLaptops />} />
                    <Route path="/UpdateLaptops/:id" element={<UpdateLaptops />} />
                    <Route path="/LaptopInventories" element={<LaptopInventory />} />
                    <Route path="/CreateCustomer" element={<CreateCustomer />} />
                    <Route path="/UpdateCustomers/:id" element={<UpdateCustomers />} />
                    <Route path="/CustomerInventories" element={<CustomerInventory />} />
                    <Route path="*" element={<NoPage />} />

                </Route>
            </Routes>

        </main>
    </div>
    )
}