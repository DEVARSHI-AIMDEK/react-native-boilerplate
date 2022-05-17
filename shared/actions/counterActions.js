import { SET_DATA, GET_DATA } from './counterActionTypes'

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