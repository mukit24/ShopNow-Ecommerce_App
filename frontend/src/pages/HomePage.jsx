import React, { useEffect } from 'react'
import { Row, Col, Alert} from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useLocation } from 'react-router-dom'
import ShowCase from '../components/ShowCase'

const Home = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList
    const location = useLocation()
    const keyword = location.search
    const keywordValue = keyword.split('=')[1]

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <div>
            {!keyword ? <ShowCase /> :
                (
                    products.length !== 0 ? (
                        <Alert variant='success' className='text-center fs-6 fw-bold'>Searched For: {keywordValue}</Alert>
                    ): (
                        <Alert variant='danger' className='text-center fs-6 fw-bold'>Sorry! We can't find product {keywordValue} in our shop</Alert>
                    )
                )}
            <h2>Latest Products</h2>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : <Row>
                        {products.map(product => (
                            <Col key={product.id} sm={12} md={6} lg={3}className='g-3'><Product product={product} /></Col>
                        ))}
                    </Row>
            }

        </div>
    )
}

export default Home