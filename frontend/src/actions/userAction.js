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
    dispatch({
        type: 'USER_DETAILS_RESET'
    })
    dispatch({ type: 'USER_UPDATE_PROFILE_RESET' })
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

export const getUserDetails = () => async (dispatch,getState) => {
    try {
        dispatch({ type: 'USER_DETAILS_REQUEST' })

        const {userLogin: { userInfo }} = getState()
        console.log(userInfo)

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/user/profile/`,config)

        dispatch({
            type: 'USER_DETAILS_SUCCESS',
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: 'USER_DETAILS_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'USER_UPDATE_PROFILE_REQUEST'
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

        const { data } = await axios.put(
            `/api/user/profile/update/`,
            user,
            config
        )

        dispatch({
            type: 'USER_UPDATE_PROFILE_SUCCESS',
            payload: data
        })

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: 'USER_UPDATE_PROFILE_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}