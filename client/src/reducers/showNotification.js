import React from 'react'

const showNotification = (value =false, action) => {

    switch (action.type) {
        case "CHANGE":
            return !value  
        default:
            return value
       }
  
}

export default showNotification