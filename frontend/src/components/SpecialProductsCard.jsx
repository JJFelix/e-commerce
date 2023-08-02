import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'
const SpecialProductsCard = () => {
  return (
    <div className='col-4'>
        <div className="special-product-card mb-3">
            <div className="d-flex flex-column align-items-center justify-content-between">
                <div className='special-product-image'>
                    <img src="images/laptop.jpg" className='img-fluid' alt="laptop" />
                </div>
                <div className='special-product-content'>
                    <h5 className="brand">Apple</h5>
                    <h6 className="title">Special Product title</h6>
                    <ReactStars
                        count={5}
                        onChange=""
                        size={24}
                        isHalf={true}
                        value={4.8}
                        edit={false}
                        activeColor="#ffd700"
                    />
                    <p className="price">
                        <strike>$200</strike>&nbsp;
                        <span className="red-p">$100</span>
                    </p>
                    <div className="discount-till d-flex align-items-center gap-10 mb-2">
                        <p className='mb-0 days'>
                            <b>5 </b>days
                        </p>
                        <div className='d-flex gap-10 align-items-center'>
                            <span className='badge rounded-circle text-center p-2 bg-danger'>1</span>:
                            <span className='badge rounded-circle text-center p-2 bg-danger'>1</span>:
                            <span className='badge rounded-circle text-center p-2 bg-danger'>1</span>
                        </div>
                    </div>
                    <div className="product-count mt-3">
                        <p>Products: 5</p>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <Link to='' className='button mt-3'>Add To Cart</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SpecialProductsCard