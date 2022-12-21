import React, {useEffect, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { userLogin } from '../actions/userAction'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'


const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    console.log(redirect)
    const userLoginState = useSelector(state => state.userLogin)
    const {loading, userInfo, error} = userLoginState

    useEffect(()=>{
        if(userInfo){
            navigate(`/${redirect}`)
        }
    },[userInfo,navigate,redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userLogin(username,password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="success" type="submit">
                    Sign In
                </Button>
            </Form>
            <h6 className='py-3'>New Customer?  <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></h6>
        </FormContainer>
    )
}

export default LoginPage