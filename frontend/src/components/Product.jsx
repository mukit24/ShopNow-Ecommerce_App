import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product.id}`} className='text-decoration-none text-dark'>
                <Card.Img variant="top" src={product.image} alt='product' />
                <Card.Body>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                    <Card.Text as="div">
                        <div className="my-3">
                        <Rating value={product.rating} text={` ${product.numReviews} reviews`} color={'gold'} />
                        </div>
                    </Card.Text>
                    <Card.Text as="h4">
                     ৳ {product.price}
                    </Card.Text>
                </Card.Body>
            </Link>
        </Card>
    )
}

export default Product