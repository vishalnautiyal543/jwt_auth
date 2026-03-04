import './App.css'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Home from './pages/Home'
import PrivateRoutes from "./components/PrivateRoutes"
import DashBoard from './pages/DashBoard'
import Login from './pages/Login'
import Register from "./pages/Register"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />

          <Route path='/dashboard' element={
            <PrivateRoutes>
              <DashBoard/>
            </PrivateRoutes>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
