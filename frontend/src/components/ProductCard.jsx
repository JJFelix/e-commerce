import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'

const ProductCard = () => {
  return (
    <div className='col-3'>
      <Link className="product-card position-relative">
        <div className="product-image">
          <img src="images/watch-03.jpg" className='img-fluid' alt="product image" />
          <img src="images/watch-04.jpg" className='img-fluid' alt="product image" />
        </div>
        <div className="product-details">
          <h6 className="brand">Apple</h6>
          <h5 className="product-title">Product Title</h5>
          <ReactStars
            count={5}
            onChange=""
            size={24}
            isHalf={true}
            value={4.5}
            edit={false}
            activeColor="#ffd700"
          />
          <p className="price">$100</p>
        </div>

        <div className="action-bar position-absolute">
          <div className='d-flex flex-column gap-15'>
            <Link><img src="images/view.svg" alt="view" /></Link>
            <Link><img src="images/add-cart.svg" alt="add-to-cart" /></Link>
            <Link><img src="images/wish.svg" alt="add-to-wishlist" /></Link>
            <Link><img src="images/prodcompare.svg" alt="compare" /></Link>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard