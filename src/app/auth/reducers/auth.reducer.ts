import { AuthState } from "../../models/app-state";

const defaultState: AuthState = {
  user: null
};

export const authReducer = (state = defaultState, { type, payload}) => {
  switch (type) {
    case "AUTH.LOGOUT":
      return Object.assign({}, state, {
        user: null
      });
    case "AUTH.LOGIN_SUCCESS":
      return Object.assign({}, state, {
        user: payload
      });
    default:
      return state;
  }
};
