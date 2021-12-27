import {createStore, combineReducers, applyMiddleware} from 'redux'

import thunk from 'redux-thunk'
import  {composeWithDevTools} from 'redux-devtools-extension'

import{productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productCreateReviewReducer, topProductsReducer} from './reducers/productReducers'


import { cartReducer } from './reducers/cartReducers'

import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers'
import { orderAllReducer, orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from './reducers/orderReducers'


const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    orderList : orderListReducer,
    userList : userListReducer,
    userDelete : userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete : productDeleteReducer,
    productCreate : productCreateReducer,
    productUpdate : productUpdateReducer,
    orderList: orderAllReducer,
    orderDeliver : orderDeliverReducer,
    productCreateReview : productCreateReviewReducer,
    topProducts : topProductsReducer,
    
})


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
    userLogin : {userInfo : userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store