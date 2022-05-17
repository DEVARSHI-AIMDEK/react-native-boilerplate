import { SET_USER, GET_USER, CLEAR_USER } from "./counterActionTypes";

export const setUser = (payload) => {
    return {
        type: SET_USER,
        payload: payload
    }
}

export const getUser = () => {
    return {
        type: GET_USER
    }
}

export const clearUser = () => {
    return {
        type: CLEAR_USER
    }
}