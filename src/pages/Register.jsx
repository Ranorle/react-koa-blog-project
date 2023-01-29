import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
const Register =()=>{
    const [inputs,setInputs]=useState({
        username:"",
        email:"",
        password:"",
    })

    const [err,setError]=useState(null)

    const navigate=useNavigate()

    const handleChange=(e)=>{
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleSubmit=async e=> {
        e.preventDefault()
        try {
            await axios.post("/auth/register", inputs)
            // console.log(res)
            navigate("/login")
        }catch (err){
        setError(err.response.data);
        }
    }
    // console.log(inputs)

    return<div className='auth'>
        <h1>Register</h1>
        <form>
            <input required type="text" placeholder='username' name="username" onChange={handleChange}/>
            <input required type="email" placeholder='email' name='email' onChange={handleChange}/>
            <input required type="password" placeholder='password' name='password' onChange={handleChange}/>
            <button onClick={handleSubmit}>Register</button>
            {err && <p>{err}</p>}
            <span>如果你有一个账户，请前往<Link to="/login">登陆界面</Link></span>
        </form>
    </div>
}
export default Register