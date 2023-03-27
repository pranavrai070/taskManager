const userListReducer = (userList = [], action) => {
  switch (action.type) {
    case "USER_LIST":
      const list = action.payLoad.map((user) => user.email);
      return list;

    case "CLEAR_USERLIST":
      return [];

    default:
      return userList;
  }
};

export default userListReducer;
