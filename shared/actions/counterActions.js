import { SET_DATA, GET_DATA, SET_IMAGE, GET_EMPLOYEE } from './counterActionTypes'

export const setData = (payload) => {
    return dispatch => {
        dispatch({
            type: SET_DATA,
            payload: payload
        }
        )
    }
}

export const getData = payload => {
    return dispatch => {
        dispatch({
            type: GET_DATA,
        })
    }
}

export const setImage = payload => {
    return dispatch => {
        dispatch({
            type: SET_IMAGE
        })
    }
}

export const getEmployee = payload => {
    return dispatch => {
        dispatch({
            type: GET_EMPLOYEE,
            payload: payload
        })
    }
}