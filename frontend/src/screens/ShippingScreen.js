import React, {useState} from 'react'


import {Button, Row, Col, Form} from 'react-bootstrap'

import {useDispatch,  useSelector} from 'react-redux'

import FormContainer from '../components/FormContainer'

import {saveShippingAddress} from '../actions/cartActions'

import CheckoutSteps from '../components/CheckoutSteps'

import { Helmet } from 'react-helmet'

const ShippingScreen = ({history}) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const{shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <>
        <Helmet>
            <title>
                Shipping
            </title>
        </Helmet>
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit = {submitHandler}>
                <Form.Group controlId = "address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type ="address" placeholder = "Enter address" value ={address} onChange ={(e)=> setAddress(e.target.value)} required></Form.Control>
                </Form.Group>

                <Form.Group controlId = "city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type ="city" placeholder = "Enter city" value ={city} onChange ={(e)=> setCity(e.target.value)} required></Form.Control>
                </Form.Group>


                <Form.Group controlId = "postalCode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type ="postalCode" placeholder = "Enter zip code" value ={postalCode} onChange ={(e)=> setPostalCode(e.target.value)} required></Form.Control>
                </Form.Group>


                <Form.Group controlId = "country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type ="country" placeholder = "Enter country" value ={country} onChange ={(e)=> setCountry(e.target.value)} required></Form.Control>
                </Form.Group>


                <Button type ="submit" variant = "primary">Continue</Button>
            </Form>
            
        </FormContainer>
        </>
    )
}

export default ShippingScreen
