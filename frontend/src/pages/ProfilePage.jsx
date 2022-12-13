import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProfilePage = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails
    // console.log(!user.name)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    // console.log(userInfo)

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }else{
            if (!user.name || success) {
                dispatch({ type: 'USER_UPDATE_PROFILE_RESET' })
                dispatch(getUserDetails())
            } else {
                setName(user.name);
                setUsername(user.username);
                setEmail(user.email);
            }
        }
    }, [dispatch, user])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile({
            'id': user.id,
            'name': name,
            'username':username,
            'email': email,
            'password': password
        }))
    }
    return (
        <Row>
            <Col md={3}>
                <h3>User Profile</h3>
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
                My Orders
            </Col>
        </Row>
    )
}

export default ProfilePage