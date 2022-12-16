import React, { useEffect } from 'react'
import { Carousel, Image, Badge, Row, Col, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listTopProducts } from '../actions/productActions'
import Loader from './Loader'
import Message from './Message'


const ShowCase = () => {
    const disptach = useDispatch()

    const topProducts = useSelector(state => state.productTopRated)
    const { laoding, products, error } = topProducts

    useEffect(() => {
        disptach(listTopProducts());

    }, [disptach])

    return (
        laoding ? (
            <Loader />)
            : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    <Col md={6} className='py-4'>
                    <h1>Get Your Order On <span className='text-success'>ShopNow</span></h1>
                    <p className='text-muted lead'>We have a collection of variety of items. You can find anything from our shop. So vist our product and order your desirable one.</p>
                    <p className='lead fw-bold text-success'><i className='fas fa-user-check me-2'></i>Easy to Use and Explore</p>
                    <p className='lead fw-bold text-success'><i className='fas fa-shopping-cart me-2'></i>Variety Collection Of Products</p>
                    <p className='lead fw-bold text-success'><i className='far fa-money-bill-alt me-2'></i>Various Payment System</p>
                    <p className='lead fw-bold text-success'><i className='fas fa-shipping-fast me-2'></i>Fast Delivery Time</p>
                    </Col>
                    <Col md={6}>
                        <Carousel fade pause='hover' variant='dark' className='mb-4'>
                            {products.map((product) => (
                                <Carousel.Item key={product.id} interval={2000}>
                                    <Link to={`/product/${product.id}`}>
                                        <Image src={product.image} fluid />
                                        <Carousel.Caption>
                                            <h3><Badge bg='primary'>{product.name}</Badge></h3>
                                            <h4><Badge bg='danger'>Price: ৳ {product.price} Taka</Badge></h4>
                                        </Carousel.Caption>
                                    </Link>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>

                </Row>

            )

    )
}
export default ShowCase