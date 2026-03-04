import React, { useState } from 'react'
import {Link} from "react-router-dom"

const Login = () => {

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

  return (
    <div>
      <input type="text" name='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
      <br />
      <input type="text" name='password' value={password} onChange={(e)=> setPassword(e.target.value)}  />
      <br />
      <button>Login</button>
      <br />
      <Link to="/register" >goto register page</Link>
    </div>
  )
}

export default Login