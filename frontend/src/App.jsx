import React, {useState, useMemo, useEffect} from  "react";
import jwt_decode from "jwt-decode";
import UserContext from "../context/userContext";
import NavBar from "./components/NavBar";
import Router from "./navigation/Router";

function App() {
  const [dataLoggin, setDataLoggin] = useState();

  useEffect(() => {
    if (!dataLoggin) {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
      const decoded = jwt_decode(token.token);
      console.log(decoded.sub)
      setDataLoggin(decoded.sub);
      }
    }
  }, []);


  const contextValue = useMemo(
    () => ({
      dataLoggin, setDataLoggin
    }), [dataLoggin, setDataLoggin]);

  return (
    <div className="max-w-screen-xl px-3 m-auto min-h-screen flex flex-col">
      <UserContext.Provider value={contextValue}>
      <NavBar/>
      <Router />
      </UserContext.Provider>
    </div>
  )
}

export default App
