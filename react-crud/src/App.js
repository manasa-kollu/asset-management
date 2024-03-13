import Footer from './template/Footer';
import Header from './template/Header';
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Outlet, useLocation, Link } from 'react-router-dom';

function App() {
  const pathname = useLocation().pathname;
  const [toggleSidebar, settoggleSidebar] = useState('inactive');

  const toggleSidebarclick = () => {
    if (toggleSidebar == 'inactive') {
      settoggleSidebar('active');
    }
    else {
      settoggleSidebar('inactive');
    }
  }
  return (
    <>
      <section>
        <div className={"container-fluid px-0 " + toggleSidebar}>
          <div className="row mx-0 flex-nowrap" >
            <div className="col-lg-2 col-md-3  d-md-block px-0  bg-light border-end " >
              <div className="d-block d-md-none text-end p-2" onClick={toggleSidebarclick}><i className="fa fa-close fa-lg "></i></div>
              <div className="d-block p-3 pt-0 ">
                <a href="/" className="sidebar-logo d-block py-3 pt-md-3 pt-0  mb-3 text-decoration-none  text-center " style={{ position: 'sticky', top: '0px', background: '#f8f9fa' }}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZP9ZvG-R7dRMbH02pwRJddDS70295mDTmTqwmB8OW&amp;s" />
                </a>
                <ul className="nav nav-pills flex-column mb-auto " >
                  <li className="nav-item "><Link to="/" className={`${pathname === '/' ? "active" : "link-dark"} nav-link  border-bottom`} aria-current="page"><i className="fa fa-angle-right me-2"></i>Dashboard</Link></li>
                  <li><Link to="/LaptopInventories" className={`${pathname === '/LaptopInventories' ? "active" : "link-dark"} nav-link  border-bottom`}><i className="fa fa-angle-right me-2"></i>Laptop Inventories</Link></li>
                  <li><Link to="/CreateLaptops" className={`${pathname === '/CreateLaptops' ? "active" : "link-dark"} nav-link  border-bottom`}><i className="fa fa-angle-right me-2"></i>Add Laptop</Link></li>
                  <li><Link to="/CustomerInventories" className={`${pathname === '/CustomerInventories' ? "active" : "link-dark"} nav-link  border-bottom`}><i className="fa fa-angle-right me-2"></i>Customer Inventories</Link></li>
                  <li><Link to="/CreateCustomer" className={`${pathname === '/CreateCustomer' ? "active" : "link-dark"} nav-link  border-bottom`}><i className="fa fa-angle-right me-2"></i>Add Customer</Link></li>
                  <li><a href="#" className="nav-link link-dark border-bottom"><i className="fa fa-angle-right me-2"></i>Change Password</a></li>

                </ul></div>
            </div>
            <div className="col px-0 d-flex align-content-between flex-wrap offset-lg-2 offset-md-3">
              <Header toggleSidebarvalue={toggleSidebarclick} />

              <Footer />

            </div>

          </div>
        </div>
      </section >

    </>
  );



}

export default App;
