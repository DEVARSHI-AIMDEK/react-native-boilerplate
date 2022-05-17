import { configureStore } from "@reduxjs/toolkit";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { employeeReducer } from "../reducers/employeeReducer";
import { userReducer } from "../reducers/userReducer";

const rootReducer = combineReducers({
    employeeReducer: employeeReducer,
    userReducer: userReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store