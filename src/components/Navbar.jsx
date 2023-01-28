import React from "react";
import {Link} from "react-router-dom";
import Logo1 from "../img/logo1.png"
import Logo2 from "../img/logo2.png"
const Navbar =()=>{
    return<div className='navbar'>
        <div className='container'>
            <div className='logo'>
                <img src={Logo1} />
                <img src={Logo2}/>
            </div>
            <div className='links'>
                <Link className='link' to='/?cat=blogs'><h6>博客</h6></Link>
                <Link className='link' to='/?cat=writes'><h6>笔记</h6></Link>
                <Link className='link' to='/?cat=readings'><h6>阅读</h6></Link>
                <Link className='link' to='/?cat=games'><h6>游戏</h6></Link>
                <Link className='link' to='/?cat=login'><h6>登录</h6></Link>
                <span>Ranorle</span>
                <span>登出</span>
                <span className='write'><Link className='link' to="write">Write</Link></span>
            </div>
        </div>
    </div>
}
export default Navbar