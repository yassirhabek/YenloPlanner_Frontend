import { createContext, useState } from "react";

const loggedInCtx = createContext({
  isLoggedIn: false,
  user: {},
  onLogin: (username, password) => {},
  onLogout: () => {},
});

export function UserContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [User, setUser] = useState({});

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
    const response = await fetch("http://localhost:8080/auth/jwt?" + new URLSearchParams({token: token}), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userData = await response.json();

    if (response.ok) {
        setUser(User => ({...User, ...userData}));
    } else {
      alert("User data not found");
    }
  };

  const contextValue = {
    isLoggedIn: isLoggedIn,
    user: User,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };

  return (
    <loggedInCtx.Provider value={contextValue}>
      {props.children}
    </loggedInCtx.Provider>
  );
}

export default loggedInCtx;
