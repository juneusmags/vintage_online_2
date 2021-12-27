import React, {useState} from 'react'


import {Button, Row, Col, Form} from 'react-bootstrap'

import {useDispatch,  useSelector} from 'react-redux'

import FormContainer from '../components/FormContainer'

import {savePaymentMethod} from '../actions/cartActions'

import CheckoutSteps from '../components/CheckoutSteps'

import { CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstansts'

import { Helmet } from 'react-helmet'

const PaymentScreen = ({history}) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const{shippingAddress} = cart

    if(!shippingAddress){
        history.push("/shipping")
    }

    const [paymentMethod, setPaymentMethod] = useState("PayPal")

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <>
        <Helmet>
            <title>
                Checkout
            </title>
        </Helmet>
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit = {submitHandler}>
                <Form.Group>
                    <Form.Label as ="legend">Select Method</Form.Label>
                    <Col>
                    <Form.Check type = "radio" label = "Paypal or Credit Card" id = "Paypal" name = "paymentMethod" value = "PayPal" checked onChange = {(e)=> setPaymentMethod(e.target.value)}></Form.Check>
                </Col>
                </Form.Group>

                
                <Button type ="submit" variant = "primary">Continue</Button>
            </Form>
            
        </FormContainer>
        </>
    )
    }

export default PaymentScreen
