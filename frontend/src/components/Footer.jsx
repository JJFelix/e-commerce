import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link } from "react-router-dom"
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from 'react-icons/bs'

const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-itmes-center">
                <img src="/images/newsletter.png" alt="newsletter" />
                <h3 className='mb-0 text-white'>Sign Up for newsletter</h3>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input type="text" className="form-control" 
                  placeholder="Enter your email <abc@example.com>" aria-label="Sign Up for newsletter" 
                  aria-describedby="basic-addon2" />
                <span className="input-group-text" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div className='footer-links d-flex flex-column'>
                <address className='text-white fs-6'>
                  12th Kimathi Street,  <br />
                  Industrial Area <br />                  
                  40273 - 00100 <br />
                  Nairobi, Kenya
                </address>
                <a className="text-white mt-2 d-block mb-2" href="tel:+254111914040">Phone: +254111914040</a>
                <a className="text-white mt-2 d-block mb-2" href="mailto:techlab@ecommerce.com">Email: techlab@ecommerce.com</a>
              </div>
              <div className='social_icons d-flex align-items-center gap-30 mt-4'>
                <a href=""><BsGithub className='text-white fs-4' /></a>
                <a href=""><BsInstagram className='text-white fs-4' /></a>
                <a href=""><BsYoutube className='text-white fs-4' /></a>
                <a href=""><BsLinkedin className='text-white fs-4' /></a>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Privacy Policy</Link>
                <Link className='text-white py-2 mb-1'>Refund Policy</Link>
                <Link className='text-white py-2 mb-1'>Shipping Policy</Link>
                <Link className='text-white py-2 mb-1'>Terms and Conditions</Link>
                <Link className='text-white py-2 mb-1'>Blogs</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Acount</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>About us</Link>
                <Link className='text-white py-2 mb-1'>FAQ</Link>
                <Link className='text-white py-2 mb-1'>Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Laptops</Link>
                <Link className='text-white py-2 mb-1'>Headphones</Link>
                <Link className='text-white py-2 mb-1'>Tablets</Link>
                <Link className='text-white py-2 mb-1'>Watches</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">&copy;{ new Date().getFullYear() }. Developed by FM_TechLab</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer