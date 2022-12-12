import axios from 'axios'

export const userLogin = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_LOGIN_REQUEST' })

        const config = {
            'Content-type': 'application/json'
        }

        const { data } = await axios.post('/api/user/login/',
            {'username': username, 'password': password },
            config)

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const userLogout = () => (dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({
        type: 'USER_LOGOUT'
    })
}

export const userRegistration = (name, username,email,password) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_REGISTER_REQUEST' })

        const config = {
            'Content-type': 'application/json'
        }

        const { data } = await axios.post('/api/user/register/',
            {'name': name, 'username': username, 'email':email ,'password': password },
            config)

        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: data,
        })

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: 'USER_REGISTER_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}