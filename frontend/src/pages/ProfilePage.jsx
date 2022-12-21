import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getMyOrders } from '../actions/orderAction'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProfilePage = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails
    // console.log(!user.name)

    const myOrders = useSelector(state => state.myOrders)
    const { orders } = myOrders

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    // console.log(userInfo)

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user.name || success) {
                dispatch({ type: 'USER_UPDATE_PROFILE_RESET' })
                dispatch(getUserDetails())
                dispatch(getMyOrders())
            } else {
                setName(user.name);
                setUsername(user.username);
                setEmail(user.email);
            }
        }
        if(!orders){
            navigate('/')
        }
    }, [dispatch, user, navigate, success, userInfo, orders])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile({
            'id': user.id,
            'name': name,
            'username': username,
            'email': email,
            'password': password
        }))
    }
    return (
        <Row>
            <Col md={3}>
                <h3 className='mb-4'>User Profile</h3>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="nameP">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter Full name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="usernameP">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="emailP">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="passwordP">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="dark" className='w-100' type="submit">
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h3 className='mb-4'>My Orders</h3>
                <Table responsive striped variant='light'>
                    <thead>
                        <tr>
                            <th>ORDER NO.</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PIAD</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map((order,index) => (
                            <tr key={order.id}>
                                <td>{index+1}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>৳ {order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10): <i className='fas fa-times text-danger'></i>}</td>
                                <td>{order.isDelivered? order.deliveredAt.substring(0,10): <i className='fas fa-times text-danger'></i>}</td>
                                <td>
                                    <LinkContainer to={`/order/${order.id}`}>
                                    <Button variant='success' className='btn-sm w-100'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            </Col>
        </Row>
    )
}

export default ProfilePage