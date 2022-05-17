import { SET_USER, GET_USER, CLEAR_USER } from "../actions/counterActionTypes";

const initState = {
    user: {}
}

export const userReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case SET_USER:
            return {
                ...state,
                user: payload
            }

        case GET_USER: {
            return {
                state
            }
        }

        case CLEAR_USER: {
            return {
                ...state,
                user: {}
            }
        }

        default:
            return state
    }
}