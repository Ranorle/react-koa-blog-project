import React, {useContext, useEffect, useState} from "react";
import {DeleteOutlined,EditOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Menu from "../components/Menu"
import axios from "axios";
import moment from "moment";
import {AuthContext} from "../context/authContext";

const Single =()=>{
    const [post,setPost] = useState({})

    const location = useLocation()

    const navigate=useNavigate()

    const postId =location.pathname.split("/")[2]

    const {currentUser} =useContext(AuthContext)

    useEffect(()=>{
        const fetchData=async ()=>{
            try{
                const res=await axios.delete(`/posts/${postId}`)
                navigator
            }catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[postId])

    const handleDelete=async ()=>{
        try{
            const res=await axios.get(`/posts/${postId}`)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    return<div className='single'>
        <div className='singlecontent'>
            <img src={post?.img}/>
            <div className='user'>
                {post.userImg &&<img src={post.userImg}/>}
            <div className="info">
                <span>{post.username}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
            </div>
                {currentUser.username=== post.username && <div className="edit">
                    <Link to={`/write?edit=2`}>
                        <Button type="primary" shape="circle" icon={<DeleteOutlined />} size='large' ghost/>
                    </Link>
                        <Button onClick={handleDelete} type="primary" shape="circle" icon={<EditOutlined />} size='large' ghost/>
                </div>}
        </div>
            <h1>{post.title}</h1>
                {post.desc}
        </div>
        <Menu/>
    </div>
}
export default Single