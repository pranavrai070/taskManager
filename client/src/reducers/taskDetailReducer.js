import React from 'react'

const taskDetailReducer = (state=[],action) => {
    switch (action.type) {
        case "SET_DETAIL":
          return action.payLoad;
        default:
          return state;
      }
}

export default taskDetailReducer