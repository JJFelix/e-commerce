import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
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
                    <h4>Supercharged for Pros</h4>
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
    </>
  )
}

export default Home