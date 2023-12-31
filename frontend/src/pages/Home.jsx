import React from 'react'
import { Link } from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import BlogCard from '../components/BlogCard.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SpecialProductsCard from '../components/SpecialProductsCard.jsx'
import PopularProductsCard from '../components/PopularProductsCard.jsx'

const Home = () => {
  return (
    <>
      <section className="home-wrapper-2 p-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="section-heading mb-">
                Services
              </div>
              <div className="services d-flex align-items-center justify-content-between">
                <div className='d-flex align-items-center gap-10'>
                  <img src="images/service.png" alt="services" />
                  <div>
                    <h6>Free Shipping</h6>
                    <p className='mb-0'>For all orders over $100</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-10'>
                  <img src="images/service-02.png" alt="services" />
                  <div>
                    <h6>Daily Offers</h6>
                    <p className='mb-0'>Save up to 25% off</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-10'>
                  <img src="images/service-03.png" alt="services" />
                  <div>
                    <h6>24/7 Support</h6>
                    <p className='mb-0'>Shop with an expert</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-10'>
                  <img src="images/service-04.png" alt="services" />
                  <div>
                    <h6>Affordable Prices</h6>
                    <p className='mb-0'>Get Factory Default Prices</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-10'>
                  <img src="images/service-05.png" alt="services" />
                  <div>
                    <h6>Secure Payments</h6>
                    <p className='mb-0'>100% Protected Payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-wrapper-1 py-5">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative">
                <img src="images/main-banner-1.jpg"className='img-fluid rounded-2' alt="main-banner" />
                <div className="main-banner-content position-absolute">
                  <h4>Supercharged for Pros</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>From $999.00 or $41.62/mo</p>
                  <Link className='button'>BUY NOW</Link>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="small-banner position-relative mb-2">
                  <img src="images/catbanner-01.jpg"className='img-fluid rounded-2' alt="main-banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>Best sale</h4>
                    <h5>iPad S13+ Pro</h5>
                    <p>From $999.00 <br />  $41.62/mo</p>
                  </div>
                </div>
                <div className="small-banner position-relative mb-2">
                  <img src="images/catbanner-02.jpg"className='img-fluid rounded-2' alt="main-banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>Hot Sale</h4>
                    <h5>iPad S13+ Pro</h5>
                    <p>From $999.00 <br />  $41.62/mo</p>
                  </div>
                </div>
                <div className="small-banner position-relative mb-2">
                  <img src="images/catbanner-03.jpg"className='img-fluid rounded-2' alt="main-banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>new arrival</h4>
                    <h5>Buy iPad Air</h5>
                    <p>From $999.00 <br />  $41.62/mo</p>
                  </div>
                </div>
                <div className="small-banner position-relative mb-2">
                  <img src="images/catbanner-04.jpg"className='img-fluid rounded-2' alt="main-banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>new arrival</h4>
                    <h5>Buy iPad Air</h5>
                    <p>From $999.00 <br />  $41.62/mo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      

      <section className="home-wrapper-2 py-5">
        <div className="container">
          <div className="col-12">
              <div className="section-heading mb-">
                Categories
              </div>
            <div className="categories d-flex flex-wrap justify-content-between align-items-center gap-30">
              <div className='d-flex gap-10 align-items-center'>
                <div>
                  <h6>Cameras</h6>
                  <p>10 items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>

              <div className='d-flex gap-10 align-items-center'>
                <div>
                  <h6>Smart TVs</h6>
                  <p>10 items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>

              <div className='d-flex gap-10 align-items-center'>
                <div>
                  <h6>Headphones</h6>
                  <p>10 items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>

              <div className='d-flex gap-10 align-items-center'>
                <div>
                  <h6>Music</h6>
                  <p>10 items</p>
                </div>
                <img src="images/speaker.jpg" alt="camera" />
              </div>

              <div className='d-flex gap-10 align-items-center'>
                <div>
                  <h6>Cameras</h6>
                  <p>10 items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>

              <div className='d-flex gap-10 align-items-center'>
                <div>
                  <h6>Smart TVs</h6>
                  <p>10 items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>

              <div className='d-flex gap-10 align-items-center'>
                <div>
                  <h6>Headphones</h6>
                  <p>10 items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>

              <div className='d-flex gap-10 align-items-center'>
                <div>
                  <h6>Music</h6>
                  <p>10 items</p>
                </div>
                <img src="images/speaker.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='featured-collection-wrapper py-5 home-wrapper-2'>
        <div className="container">
        <div className="col-12">
              <div className="section-heading mb-">
                Featured Collection
              </div>
            </div>
          <div className="row">
            
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>

      <section className="special-products-wrapper py-5 home-wrapper-2">
        <div className="container">
          <div className="col-12">
            <div className="section-heading mb-">
              Special Products
            </div>
          </div>
          <div className="row">
            <SpecialProductsCard /> 
            <SpecialProductsCard />
            <SpecialProductsCard />   
            <SpecialProductsCard /> 
            <SpecialProductsCard />
            <SpecialProductsCard />          
          </div>
        </div>
      </section>

      <section className="popular-products-wrapper py-5 home-wrapper-2">
        <div className="container">
          <div className="row">
          <div className="col-12">
            <div className="section-heading mb-">
              Popular Products
            </div>
          </div>
          <div className="row">
            <PopularProductsCard />
            <PopularProductsCard />
            <PopularProductsCard />
            <PopularProductsCard />
          </div>
          </div>
        </div>
      </section>

      <section className='blog-wrapper py-5 home-wrapper-2'>
        <div className="container">
          <div className="col-12">
              <div className="section-heading mb-">
                Our latest news
              </div>
            </div>
          <div className="row">
            
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </section>

      <section className="marquee-wrapper py-5">
        <div className="container-xxl">
          <div className="col-12">
              <div className="section-heading mb-">
                Featured Brands
              </div>
            </div>
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className='d-flex '>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-01.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-02.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-03.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-04.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-05.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-06.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-07.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-08.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Home