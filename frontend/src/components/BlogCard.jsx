import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = () => {
  return (
    <div className="col-3">
        <div className="blog-card">
            {/* <div className="card-image"> */}
                <img src="images/blog-1.jpg" className='img-fluid' alt="blog" />
            {/* </div> */}
            <div className="blog-content">
                <p className='date text-center'>12 October, 2022</p>
                <h5 className="title">Best Shopping experience</h5>
                <p className="description">Shopping can be a challenging 
                thing for most people who are not used to the intricacies of shopping.</p>
                <Link to="" className='button'>Read More</Link>
            </div>
        </div>
    </div>
  )
}

export default BlogCard