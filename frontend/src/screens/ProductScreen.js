import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'

import { listProducts, listProductsDetails, createProductReview } from '../actions/productActions'


import Loader from '../components/Loader'
import Message from '../components/Message'

import Rating from '../components/Rating'
import { productDetailsReducer } from '../reducers/productReducers'

import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { Form } from 'react-bootstrap'


import { Helmet } from 'react-helmet'






const ProductScreen = ({history, match}) => {

   
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    
    
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const productCreateReview = useSelector(state => state.productCreateReview)
    const {error: errorReview, success : successReview} = productCreateReview

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment,
        }))
    }

      const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    useEffect(()=>{
        if(successReview){
            alert('Review has been submitted!')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        dispatch(listProductsDetails(match.params.id))
    }, [dispatch, match, successReview])


  

    
    

    
    
    return (
        <>
           <Helmet>
                <title>{product.name}</title>
            </Helmet> 
            <Link className = "btn btn-light my-3" to ="/">Go Back</Link>

            {loading ? <Loader/> : error ? <Message variant = 'danger'>{error}</Message> : (
            <>
            
            <Row>
                <Col md = {6}>
                    <Image src = {product.image} alt = {product.name} fluid/>
                </Col>
                <Col md= {3} sm = {5}>
                    <ListGroup variant = "flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating  value = {product.rating} text = {`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price : ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description : {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md = {3}>
                    <Card>
                        <ListGroup variant = "flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price :
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status :
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                    </Col>
                                </Row>
                            </ListGroup.Item>


                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control as = "select" value = {qty} onChange = {(e) =>
                                            setQty(e.target.value)}>

                                            {[...Array(product.countInStock).keys()].map((x) =>(
                                                <option key = {x+1} value = {x+1}>{x+1}</option>
                                            ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}



                            <ListGroup.Item>
                                <Button className = "col-12" type = "button" disabled = {product.countInStock === 0} onClick = {addToCartHandler}>Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md = {6}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Message>No Reviews yet! Be the first one to review this item!</Message>}
                    <ListGroup variatn = "flush">
                        {product.reviews.map(review => (
                            <ListGroup.Item key ={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value = {review.rating}/>
                                <p>{review.createdAt.substring(0,10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a Review!</h2>
                            {errorReview && <Message variant = "danger">{errorReview}</Message>}
                            {userInfo ? (
                                <Form onSubmit = {submitHandler}>
                                    <Form.Group controlId = "rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as = "select" value = {rating} onChange = {(e)=> setRating(e.target.value)}>
                                            <option value= "">Select...</option>
                                            <option value= "1">1 - Poor</option>
                                            <option value= "2">2 - Fair</option>
                                            <option value= "3">3 - Good</option>
                                            <option value= "4">4 - Very Good</option>
                                            <option value= "5">5 - Excellent</option>
                                            
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId= "comment">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as = "textarea" row = "3" value = {comment} onChange = {(e)=> setComment(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Button type = "submit" vaiant = "primary">Submit Review!</Button>
                                </Form>
                            ) : <Message variant = "danger">Please <Link to = "/login">login</Link> to write a review</Message>}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            </>

            )}
            
        </>
    )
}

export default ProductScreen
