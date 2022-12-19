import { createContext, useState, useEffect } from "react";

const loggedInCtx = createContext({
  authenticationCheck: true,
  isLoggedIn: false,
  user: {},
  onLogin: (username, password) => {},
  onLogout: () => {},
  getUser: (token) => {},
});

export function UserContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [User, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const loginHandler = async (username, password) => {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      document.cookie = "token=" + result.accessToken;
      getUserFromToken(result.accessToken);
      setIsLoggedIn(true);
    } else {
      alert("Login failed");
    }
  };

  const logoutHandler = () => {
    document.cookie = "token=  ;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    setIsLoggedIn(false);
  };

  const getUserFromToken = async (token) => {
    console.log("http://localhost:8080/auth/jwt?" + new URLSearchParams({token: token}));
    const response = await fetch("http://localhost:8080/auth/jwt?" + new URLSearchParams({token: token}), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userData = await response.json();

    if (response.ok) {
        setUser(User => ({...User, ...userData}));
        setIsLoggedIn(true);
    }
    setLoading(false);
  };

  const contextValue = {
    authenticationCheck: loading,
    isLoggedIn: isLoggedIn,
    user: User,
    onLogin: loginHandler,
    onLogout: logoutHandler,
    getUser: getUserFromToken,
  };

  return (
    <loggedInCtx.Provider value={contextValue}>
      {props.children}
    </loggedInCtx.Provider>
  );
}

export default loggedInCtx;
