import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
const Home =()=>{
    const [posts,setPosts] = useState([])

    const cat = useLocation().search

    useEffect(()=>{
        const fetchData=async ()=>{
            try{
                const res=await axios.get(`/posts${cat}`)
                setPosts(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[cat])
    // const posts=[
    //     {
    //         id:1,
    //         title:"Title1",
    //         desc:"description1",
    //         img:"https://tse4-mm.cn.bing.net/th/id/OIP-C.z6_kUv_ooQ5hj77LWxKzLAHaD5?pid=ImgDet&rs=1"
    //     },
    //     {
    //         id:2,
    //         title:"Title2",
    //         desc:"description2",
    //         img:"https://tse1-mm.cn.bing.net/th/id/OIP-C.ksV-Z2AQE9q-XxDAqHtd-gHaGI?pid=ImgDet&rs=1"
    //     }
    // ]

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    return<div className='home'>
        <div className='posts'>
            {
                posts.map(post=>(
                <div className='post' key={post.id}>
                    <div className='img'>
                        <img src={`../upload/${post.img}`} alt=""></img>
                    </div>
                    <div className='postcontent'>
                        <Link className='link' to={`/post/${post.id}`}>
                            <h1>{getText(post.title)}</h1>
                            <p>{getText(post.desc)}</p>
                            <button>详细阅读</button>
                        </Link>
                    </div>
                </div>
                ))
            }
        </div>
    </div>
}
export default Home