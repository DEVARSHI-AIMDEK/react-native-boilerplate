import { SET_DATA, GET_DATA, SET_IMAGE, GET_EMPLOYEE } from '../actions/counterActionTypes'

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

        case SET_IMAGE:
            return {
                ...state,
                employee: { ...state, imageUri: payload }
            }

        case GET_EMPLOYEE: {
            const employee = state.employee.filter(item => item.id === payload)
            return {
                ...state,
                employee: employee
            }
        }

        default:
            return state;
    }
}