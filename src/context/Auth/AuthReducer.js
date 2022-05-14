import { LOGIN, LOGOUT } from "./types";

// token: localStorage.getItem("token"),
// auth: null,
// user: null,
// type: null,
// email: null,

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        auth: true,
        user: action.payload.name,
        type: action.payload.type,
        email: action.payload.email,
      };
      
    case LOGOUT:
      return {
        ...state,
        token: null,
        auth: false,
        user: null,
        type: null,
        email: null,
      };

    default:
      return state;
  }
};
