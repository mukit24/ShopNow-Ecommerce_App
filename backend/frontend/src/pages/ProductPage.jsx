import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, ListGroup, Image, Form } from 'react-bootstrap'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { createProductReview, detailsProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductPage = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productDetails)
    const { error, product, loading } = productList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.createReview)
    const {success, error: errorProductReview} = productReviewCreate

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    useEffect(() => {
        if(success){
            dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' })
            setRating(0)
            setComment('')
        }
        dispatch(detailsProduct(params.id))
    }, [dispatch, params,success])

    const navigate = useNavigate();

    const addCartHandler = () => {
        console.log('clicked')
        navigate(`/cart/${params.id}?qty=${qty}`)
    }

    const addReviewHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            params.id, {
            rating,
            comment
        }
        ))
    }

    return (
        <div>
            <Link to='/' className='btn btn-secondary btn-sm my-3'><i className='fas fa-arrow-left'></i> Go Back</Link>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <>
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
                                                                        <option value={x + 1} key={x + 1}>{x + 1}</option>
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
                            <Row className='py-4'>
                                <Col md={6}>
                                    <h4>Reviews</h4>
                                    <ListGroup variant='flush'>
                                        {product.reviews.length === 0 ? (
                                            <Message variant='primary'>No Reviews Yet</Message>
                                        ) : (
                                            product.reviews.map((review, index) => (
                                                <ListGroup.Item className='text-secondary' key={index}>
                                                    <strong>{review.name}</strong>
                                                    <Rating value={review.rating} color='gold' />
                                                    <p className='mb-1'>{review.createdAt.substring(0, 10)}</p>
                                                    <p>{review.comment}</p>

                                                </ListGroup.Item>
                                            ))
                                        )}
                                        <ListGroup.Item>
                                            <h5>Write a review</h5>
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                            {userInfo ? (
                                                <Form onSubmit={addReviewHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            required
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Review</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='3'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        type='submit'
                                                        variant='success'
                                                        className='mt-2'
                                                    >
                                                        Submit
                                                    </Button>

                                                </Form>
                                            ) : (
                                                <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                            )}
                                        </ListGroup.Item>


                                    </ListGroup>
                                </Col>
                            </Row>
                        </>
                    )}
        </div>
    )
}

export default ProductPage