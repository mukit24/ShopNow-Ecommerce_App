import React, { useEffect } from 'react'
import { Image, Button, Row, Col, ListGroup, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getOrderDetails, updateOrderToPay } from '../actions/orderAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

export const OrderPage = () => {
    const dispatch = useDispatch()
    const params = useParams()

    const orderID = Number(params.id);

    const orderDetails = useSelector(state => state.orderDetails)
    const { error, order, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { successPay, loadingPay } = orderPay

    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    useEffect(() => {
        if (!order || orderID !== order.id || successPay) {
            dispatch({type: 'ORDER_PAY_RESET'})
            dispatch(getOrderDetails(orderID))
        }
    }, [order, dispatch, orderID, successPay])

    const handlePay = (e) => {
        e.preventDefault();
        dispatch(updateOrderToPay(orderID));
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <Row>
                <Col md={8}>
                    <h2>Order:</h2>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <p className="text-secondary mb-1"><strong>Username: </strong>{order.user.username}</p>
                            <p className="text-secondary mb-1"><strong>Email: </strong>{order.user.email}</p>
                            <p className='text-secondary'><strong>Shipping Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}  {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ):(
                                <Message variant='warning'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Payment</h3>
                            <p className='text-secondary'><strong>Payment Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ):(
                                <Message variant='warning'>Not Paid</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {order.orderItems.length === 0 ? (
                                <Message variant='info'>No items in the order</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} fluid />
                                                </Col>
                                                <Col>
                                                    <Link className='text-decoration-none' to={`/product/${item.product_id}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4} className='text-secondary'>
                                                    {item.qty} X ৳{item.price} = ৳ {(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}

                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>৳{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>৳{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>৳{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>৳{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {loadingPay && (
                                    <Loader />
                                )}
                                {order.isPaid === false ? (
                                    <Button onClick={handlePay} type='button' variant='success' className='w-100'><i className='far fa-money-bill-alt me-2'></i>Pay With {order.paymentMethod}</Button>
                                ):(
                                    <Message variant='success'>Order Is Paid</Message>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
