import React from 'react'
import ReactDOM from 'react-dom/client'
import './input.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Routes, Route, HashRouter } from 'react-router-dom'
import Login from './Components/auth/Login'
import SignUp from './Components/auth/SignUp'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' Component={App}/>
          <Route path='/home' Component={Login}/>
          <Route path='/signup' Component={SignUp}/>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
