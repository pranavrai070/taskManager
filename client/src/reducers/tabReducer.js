export const tabReducer = (state = "pending", action) => {
  switch (action.type) {
    case "ACTIVE":
      return "active";
    case "PENDING":
      return "pending";
    case "DONE":
      return "done";
    default:
      return state;
  }
};
