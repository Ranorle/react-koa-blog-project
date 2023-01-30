import React, {useContext, useEffect, useState} from "react";
import {DeleteOutlined,EditOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Menu from "../components/Menu"
import axios from "axios";
import moment from "moment";
import {AuthContext} from "../context/authContext";
import DOMPurify from "dompurify";

const Single =()=>{
    const [post,setPost] = useState({})

    const location = useLocation()

    const navigate=useNavigate()

    const postId =location.pathname.split("/")[2]

    let {currentUser} =useContext(AuthContext)
    if(currentUser===null) currentUser={ //为解决currentUser不存在会导致single页面无法显示的bug
        "id": 0,
        "username": "",
        "email": "",
        "img": ""
    }

    // console.log(currentUser)

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${postId}`);
                setPost(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData()
    },[postId])

    const handleDelete=async ()=>{
        try{
            await axios.delete(`/posts/${postId}`)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    // console.log(post.title)
    return<div className='single'>
        <div className='singlecontent'>
            <img src={`../upload/${post?.img}`}/>
            <div className='user'>
                {post.userImg &&<img src={post.userImg}/>}
            <div className="info">
                <span>{post.username}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
            </div>
                { currentUser.username=== post.username &&
                    <div className="edit">
                    <Link to={`/write?edit=2`} state={post}>
                        <Button type="primary" shape="circle" icon={<EditOutlined />} size='large' ghost/>
                    </Link>
                        <Button onClick={handleDelete} type="primary" shape="circle" icon={<DeleteOutlined />} size='large' ghost/>
                </div>
                }
        </div>
            <h1 dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.title),
            }}
            ></h1>
            <p
            dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
        }}
            ></p>
        </div>
        <Menu cat={post.cat}/>
    </div>
}
export default Single