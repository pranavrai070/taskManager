
const loaderReducer = (loader = false, action) => {
    switch (action.type) {
        case "TOGGLE_TO_TRUE":
            return true
        case "TOGGLE_TO_FALSE":
            return false   
        default:
            return loader
       }
}

export default loaderReducer