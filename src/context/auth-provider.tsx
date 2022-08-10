import { useReducer, useCallback, memo } from "react";
import AuthContext, { AuthContextInterface } from "./auth-context";
import { UserInterface } from "../pages/autorization/index";

interface AuthProviderInterface {
  children: JSX.Element;
}

const defaultAuthState = {
  user: null,
};

const authReducer = (state: any, action: any) => {
  if (action.type === "IS_AUTH") {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  return defaultAuthState;
};

const AuthProvider = (props: AuthProviderInterface) => {
  const [state, dispatch] = useReducer(authReducer, defaultAuthState);
  const signInHandler = useCallback(
    (user: UserInterface) => {
      dispatch({ type: "IS_AUTH", payload: { user } });
    },
    [dispatch]
  );

  const authContext: AuthContextInterface = {
    user: state.user,
    signIn: signInHandler,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default memo(AuthProvider);
