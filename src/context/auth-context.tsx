import React from "react";
import { UserInterface } from "../pages/autorization";

export interface AuthContextInterface {
  user: UserInterface | null;
  signIn: (user: UserInterface) => void;
}

const AuthContext = React.createContext<AuthContextInterface>({
  user: null,
  signIn: (user: UserInterface) => {},
});
// const AuthContext = React.createContext<AuthContextInterface | null>(null);

export default AuthContext;
