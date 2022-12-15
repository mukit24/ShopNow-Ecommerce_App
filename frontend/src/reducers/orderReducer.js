export const orderCreateReducer = (state = {},action) => {
    
    switch (action.type) {
        case 'ORDER_CREATE_REQUEST':
            return {
                loading: true,
            }
        case 'ORDER_CREATE_SUCCESS':
            return {
                loading: false,
                success: true,
                order: action.payload,
            }
        case 'ORDER_CREATE_FAIL':
            return {
                loading: false,
                error: action.payload,
            }
        case 'ORDER_CREATE_RESET':
            return {}
        default:
            return state
           
    }
}

export const orderDetailsReducer = (state = {loading: true, orderItems:[],shippinAddress:{}},action) => {
    
    switch (action.type) {
        case 'ORDER_DETAILS_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'ORDER_DETAILS_SUCCESS':
            return {
                loading: false,
                order: action.payload,
            }
        case 'ORDER_DETAILS_FAIL':
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
           
    }
}

export const orderPayReducer = (state = {},action) => {
    
    switch (action.type) {
        case 'ORDER_PAY_REQUEST':
            return {
                loadingPay: true,
            }
        case 'ORDER_PAY_SUCCESS':
            return {
                loadingPay: false,
                successPay: true,
            }
        case 'ORDER_PAY_FAIL':
            return {
                loadingPay: false,
                errorPay: action.payload,
            }
        case 'ORDER_PAY_RESET':
            return {}
        default:
            return state
           
    }
}

export const orderMyOrderReducer = (state = { orders: [] },action) => {
    
    switch (action.type) {
        case 'ORDER_MY_ORDERS_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'ORDER_MY_ORDERS_SUCCESS':
            return {
                loading: false,
                orders: action.payload,
            }
        case 'ORDER_MY_ORDERS_FAIL':
            return {
                loading: false,
                error: action.payload,
            }
        case 'ORDER_MY_ORDERS_RESET':
            return { }
        default:
            return state
           
    }
}