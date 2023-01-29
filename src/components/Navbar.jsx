import React, {useContext} from "react";
import {Link} from "react-router-dom";
import Logo1 from "../img/logo1.png"
import Logo2 from "../img/logo2.png"
import {AuthContext} from "../context/authContext";
const Navbar =()=>{

    const {currentUser,logout} = useContext(AuthContext)

    return<div className='navbar'>
        <div className='container'>
            <div className='logo'>
                <Link to="/">
                    <img src={Logo1} />
                    <img src={Logo2}/>
                </Link>
            </div>
            <div className='links'>
                <Link className='link' to='/?cat=blogs'><h6>博客</h6></Link>
                <Link className='link' to='/?cat=writes'><h6>笔记</h6></Link>
                <Link className='link' to='/?cat=readings'><h6>阅读</h6></Link>
                <Link className='link' to='/?cat=games'><h6>游戏</h6></Link>
                <Link className='link' to='/login'><h6>登录</h6></Link>
                <span>{currentUser?.username}</span>
                {currentUser ? <span onClick={logout}>登出</span> :<Link className='link' to="/login">登录</Link>}
                <span className='write'><Link className='link' to="/write">Write</Link></span>
            </div>
        </div>
    </div>
}
export default Navbar