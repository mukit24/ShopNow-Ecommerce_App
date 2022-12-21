import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_CREATE_REQUEST'
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log('dmann')
        const { data } = await axios.post(
            `/api/order/add/`,
            order,
            config
        )
        console.log('dmann')
        dispatch({
            type: 'ORDER_CREATE_SUCCESS',
            payload: data
        })


        dispatch({
            type: 'CART_ITEM_CLEAR',
        })

        localStorage.removeItem('cartItems')

        

    } catch (error) {
        dispatch({
            type: 'ORDER_CREATE_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_DETAILS_REQUEST'
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/order/${id}/`,
            config
        )

        dispatch({
            type: 'ORDER_DETAILS_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'ORDER_DETAILS_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateOrderToPay = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_PAY_REQUEST'
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/order/${id}/paid/`,
            config
        )

        dispatch({
            type: 'ORDER_PAY_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'ORDER_PAY_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ORDER_MY_ORDERS_REQUEST'
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/order/myorders/`,
            config
        )

        dispatch({
            type: 'ORDER_MY_ORDERS_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'ORDER_MY_ORDERS_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}