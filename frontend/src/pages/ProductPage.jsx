import React from 'react'
import { Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import Rating from '../components/Rating'
import products from '../products'

const ProductPage = () => {
    const params = useParams();
    const product = products.find((p) => p._id === params.id)

    return (
        <div>
            <Link to='/' className='btn btn-secondary btn-sm my-3'><i className='fas fa-arrow-left'></i> Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>

                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>{product.name}</h4>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'gold'} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price:  ৳ {product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>৳ {product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button'
                                    className='w-100 btn-dark'
                                    disabled={product.countInStock === 0}>
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductPage