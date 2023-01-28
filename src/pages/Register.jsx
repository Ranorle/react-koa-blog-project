import React from "react";
import {Link} from "react-router-dom";
const Register =()=>{
    return<div className='auth'>
        <h1>Register</h1>
        <form>
            <input required type="text" placeholder='username'/>
            <input required type="text" placeholder='email'/>
            <input required type="text" placeholder='password'/>
            <button>Register</button>
            <p>This is an error!</p>
            <span>如果你有一个账户，请前往<Link to="/login">登陆界面</Link></span>
        </form>
    </div>
}
export default Register