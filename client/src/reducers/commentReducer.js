import React from 'react'

const commentReducer = (state=[],action) => {
    switch (action.type) {
        case "GET_COMMENT":
            return action.payLoad        
    
        default:
            return state
    }
}
export default commentReducer