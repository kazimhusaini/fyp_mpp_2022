const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
      case "UPDATE_START":
        return {
          ...state,
          isFetching:true
        };
      case "UPDATE_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
        
      case "UPDATE_FAILURE":
        return {
          user: state.user,
          isFetching: false,
          error: true,
        };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
      case "NOTI_START":
        return {
          noti: null,
        };
      case "NOTI_SUCCESS":
        return {
          noti: action.payload
        };
      case "NOTI_FAILURE":
        return {
          noti: null,
        };
    default:
      return state;
  }
};

export default Reducer;