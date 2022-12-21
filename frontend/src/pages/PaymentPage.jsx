import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartactions'
import CheckoutSteps from '../components/CheckOutSteps'
import FormContainer from '../components/FormContainer'

const PaymentPage = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [paymentMethod, setpaymentMethod] = useState('Bkash')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    console.log(paymentMethod)
    const handleSubmit = e =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <>
        <CheckoutSteps step1 step2 step3 />
        <FormContainer>
            <h4>Select Payment Method</h4>
            <Form onSubmit={handleSubmit} className='text-secondary'>
                <Form.Check
                    type='radio'
                    id='Bkash'
                    label='Bkash'
                    value='Bkash'
                    checked={paymentMethod === 'Bkash'}
                    onChange={e => setpaymentMethod(e.target.value)}
                />
                <Form.Check
                    type='radio'
                    id='Rocket'
                    label='Rocket'
                    value='Rocket'
                    checked={paymentMethod === 'Rocket'}
                    onChange={e => setpaymentMethod(e.target.value)}
                />
                <Form.Check
                    type='radio'
                    id='Nagad'
                    label='Nagad'
                    value='Nagad'
                    checked={paymentMethod === 'Nagad'}
                    onChange={e => setpaymentMethod(e.target.value)}
                />
                <Form.Check
                    type='radio'
                    id='Credit Card'
                    label='Credit Card'
                    value='Credit Card'
                    checked={paymentMethod === 'Credit Card'}
                    onChange={e => setpaymentMethod(e.target.value)}
                />
                <Button className='mt-4' type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
        </>
        
    )
}

export default PaymentPage