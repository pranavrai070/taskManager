
const notificationReducer = (notification=[],action) => {
    switch (action.type) {
        case "GET_NEW":
            return [...notification , action.payload]
        case "GET_ONCE":
            return action.payload  
        default:
            return notification
       }
}

export default notificationReducer