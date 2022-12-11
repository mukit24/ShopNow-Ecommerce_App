import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams, Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartactions'
import Message from '../components/Message'

const CartPage = () => {
    const location = useLocation()
    const params = useParams()
    const dispatch = useDispatch()

    const productId = params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const cartItems = useSelector(state => state.cart.cartItems)
    console.log(cartItems)

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    return (
        <Row>
            <Col md={8}>
                <h1 className='mb-3'>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>Your Card Is Empty <Link to='/'> Go Back</Link></Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product_id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={2}>
                                        ${item.price}
                                    </Col>

                                    <Col md={3}>
                                        <Form.Select aria-label="Default select example"
                                            value={item.qty}
                                            onChange={e => dispatch(addToCart(item.product_id,Number(e.target.value)))}>
                                            {
                                                [...Array(item.countInStock).keys()].map(x => (
                                                    <option value={x + 1} key={x + 1}>{x + 1}</option>
                                                ))
                                            }
                                        </Form.Select>

                                    </Col>

                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='danger'
                                            onClick={() => removeFromCartHandler(item.product_id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
            <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h4>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>

                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='w-100 btn-success'
                            disabled={cartItems.length === 0}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartPage