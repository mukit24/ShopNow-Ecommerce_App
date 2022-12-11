import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, ListGroup, Image, Form } from 'react-bootstrap'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductPage = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productDetails)
    const { error, product, loading } = productList

    const [qty, setQty] = useState(1)

    useEffect(() => {
        dispatch(detailsProduct(params.id))
    }, [dispatch, params])

    const navigate = useNavigate();

    const addCartHandler = () =>{
        console.log('clicked')
        navigate(`/cart/${params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-secondary btn-sm my-3'><i className='fas fa-arrow-left'></i> Go Back</Link>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
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
                                        {product.countInStock && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Select aria-label="Default select example"
                                                        value={qty}
                                                        onChange={e => setQty(e.target.value)}>
                                                            {
                                                                [...Array(product.countInStock).keys()].map(x => (
                                                                    <option value={x+1} key={x+1}>{x+1}</option>
                                                                ))
                                                            }
                                                        </Form.Select>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                        <ListGroup.Item>
                                            <Button
                                                onClick={addCartHandler}
                                                type='button'
                                                className='w-100 btn-dark'
                                                disabled={product.countInStock === 0}>
                                                Add to Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    )}
        </div>
    )
}

export default ProductPage