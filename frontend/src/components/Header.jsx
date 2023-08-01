import React from 'react'
import { NavLink, Link } from "react-router-dom"
import { BsSearch } from 'react-icons/bs'

const Header = () => {
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <p className='text-white mb-0'>
                Free Shipping and return for goods over $100
              </p>
            </div>
            <div className="col-6">
              <p className='text-end text-white mb-0'>
                Call: <a className='text-white' href="tel:+254111914040">+254 111 914 040</a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-2">
              <h3 className='mb-0'>
                <Link className='text-white'>Tech Lab</Link>
              </h3>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input type="text" className="form-control" 
                  placeholder="Search product here" aria-label="Search product here" 
                  aria-describedby="basic-addon2" />
                <span className="input-group-text" id="basic-addon2">
                  <BsSearch />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link className='d-flex align-items-center gap-10 text-white'>
                    <img src="images/compare.svg" alt="Compare" />
                    <p className='m-auto'>Compare <br /> products</p>
                  </Link>
                </div>
                <div>
                  <Link className='d-flex align-items-center gap-10 text-white'>
                    <img src="images/wishlist.svg" alt="wishlist" />
                    <p className='m-auto'>Wishlist</p>
                  </Link>
                </div>
                <div>
                  <Link className='d-flex align-items-center gap-10 text-white'>
                    <img src="images/user.svg" alt="user" />
                    <p className='m-auto'>My Account</p>
                  </Link>
                </div>
                <div>
                  <Link className='d-flex align-items-center gap-10 text-white'>
                    <img src="images/cart.svg" alt="cart" />
                    <div className='d-flex flex-column gap-10'>
                      <span className="badge bg-white text-dark">0</span>
                      <p className='m-auto'>$ 500</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header-bottom py-3">
        <div className="container">
          <div className="row m-auto">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                  {/* <img src="/images/menu.svg" alt="menu" /> */}
                    <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex align-items-center gap-10" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/images/menu.svg" alt="menu" />
                      <span className='me-1 d-inline-block'>Shop Categories</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link className="dropdown-item text-white" to="#">Action</Link></li>
                      <li><Link className="dropdown-item text-white" to="#">Another action</Link></li>
                      <li><Link className="dropdown-item text-white" to="#">Something else here</Link></li>
                    </ul>
                  </div>
                </div>
                <div className='menu-links'>
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/store">Our Store</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header