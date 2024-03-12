import logo from './logo.svg';
import './App.css';
import FormRegistration from './components/registration/FormRegistration';
import { Route,Routes,NavLink, Navigate, redirect, useNavigate } from 'react-router-dom';
import FormLogging from './components/logging/FormLogging';
import { useSelector } from 'react-redux';
import React from 'react';
import Home from './components/Home/Home';
import Start from './components/Start/Start';

function App() {

  console.log('APP')

  const auth = useSelector((state) => state.userStatus)
  console.log('USE_SELECTOR?:',auth)
  console.log('STATUS?:', typeof auth[0]?.status)

  const navigate = useNavigate()

  React.useEffect(() => {
    if (auth[0]?.status !== 200) {
      return navigate('/');
    }
    return navigate('/home')

  },[auth])

  return (
    <>
      <Routes>
        <Route
        path='/'
        element={<Start/>}
        />
        <Route
        path='/registration'
        element={<FormRegistration/>}
        />
        <Route
        path='/logging'
        element={<FormLogging/>}
        />
        <Route
        path='/home'
        element={<Home/>}
        />
        {/* {console.log('auth[0]?.status === 200:',auth[0]?.status === 200)} */}
      </Routes>
    </>
  );
}

export default App;
