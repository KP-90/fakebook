// Importing modules
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Import components
import './App.css';
import Header from './components/Header';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Userinfo from "./components/Userinfo";
import SingleUser from "./components/SingleUserInfo";
import useToken from "./hooks/useToken";

import { changeUser } from "./components/userSlice";


function App() {

  const dispatch = useDispatch()
  const {token, setToken} = useToken()
  const user = useSelector(state => state.userInfo.user)

  // Fetch the logged in user so we know when we can start rendering 
  useEffect(() => {
    if(token) {
      fetch('http://localhost:4000/me', {mode: 'cors', headers: {'authorization': `Bearer ${token}`}})
      .then(response => response.json())
      .then(data => {
        dispatch(changeUser(data.user))
      })
    }
  }, [token])

  // If no token, only show the login page
  if(!token) {
    return <Login setToken={setToken}/>
  }

  return (
    <div className="App">
      {!user ? (<div>Loading...</div>) : (
      <BrowserRouter>
        <Header setToken={setToken}/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user/me" element={<Userinfo />} />
          <Route path="/user/:id" element={<SingleUser />} />
        </Routes>
      </BrowserRouter>
      )}
    </div>
  );
}

export default App;
