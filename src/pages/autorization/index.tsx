import React, { useCallback, useState, memo, useContext } from "react";
import "./index.scss";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

export interface UserInterface {
  id: string;
  email: string;
  password: string;
}

function Autorization() {
  const navigate = useNavigate();
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [authType, setAuthType] = useState("sign-in");
  const authCtx = useContext(AuthContext);
  const submitHandler = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (authType === "sign-in") {
        fetch("http://localhost:8000/users", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((users) => {
            const currentUser = users.find(
              (user: UserInterface) => user.email === emailInput
            );
            if (!currentUser) {
              console.error("User not Found!");
            } else if (currentUser.password !== passwordInput) {
              console.error("Password is Incorrect!");
            } else {
              console.log(authCtx);
              authCtx?.signIn(currentUser);
              navigate("/contacts");
            }
          });
      }
      if (authType === "sign-up" && passwordInput === passwordConfirm) {
        fetch("http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInput,
            password: passwordConfirm,
          }),
        });
        setAuthType("sign-in");
        setEmailInput("");
        setPasswordInput("");
        setPasswordConfirm("");
      }
    },
    [passwordInput, emailInput, authType, passwordConfirm, authCtx, navigate]
  );
  return (
    <form onSubmit={submitHandler} className="form">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        required
        onChange={(e) => setEmailInput(e.target.value)}
        value={emailInput}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        required
        onChange={(e) => setPasswordInput(e.target.value)}
        value={passwordInput}
      />
      {authType === "sign-up" && (
        <>
          <label htmlFor="password2">Repeat password</label>
          <input
            type="password"
            id="password2"
            required
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
        </>
      )}
      <button className="form__btn" type="submit">
        {authType === "sign-in" ? "Sign In" : "Sign Up"}
      </button>
      <button
        className="form__new-account"
        onClick={() =>
          setAuthType(authType === "sign-in" ? "sign-up" : "sign-in")
        }
      >
        {authType === "sign-in" ? "Have not an account yet?" : "Login"}
      </button>
    </form>
  );
}

export default memo(Autorization);
