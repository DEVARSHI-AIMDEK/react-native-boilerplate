import { SET_DATA, GET_DATA } from '../actions/counterActionTypes'

const initState = {
    employee: []
}

export const employeeReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case SET_DATA:
            return {
                ...state,
                employee: payload
            }

        case GET_DATA:
            return state

        default:
            return state;
    }
}