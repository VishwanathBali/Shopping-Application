import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import './index.css'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Bag from './components/Bag.jsx'
import Home from './routes/Home.jsx'
import myntraStore from './store/index.js'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {path: '/',element: <Home/>},
      {path: '/bag',element: <Bag/>},
      {path: '/login',element: <Login/>},
      {path: '/signup',element: <Signup/>}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={myntraStore}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
