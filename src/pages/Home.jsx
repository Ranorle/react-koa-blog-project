import React from "react";
import {Link} from "react-router-dom";
const Home =()=>{
    const posts=[
        {
            id:1,
            title:"Title1",
            desc:"description1",
            img:"https://tse4-mm.cn.bing.net/th/id/OIP-C.z6_kUv_ooQ5hj77LWxKzLAHaD5?pid=ImgDet&rs=1"
        },
        {
            id:2,
            title:"Title2",
            desc:"description2",
            img:"https://tse1-mm.cn.bing.net/th/id/OIP-C.ksV-Z2AQE9q-XxDAqHtd-gHaGI?pid=ImgDet&rs=1"
        }
    ]
    return<div className='home'>
        <div className='posts'>
            {
                posts.map(post=>(
                <div className='post' key={post.id}>
                    <div className='img'>
                        <img src={post.img} alt=""></img>
                    </div>
                    <div className='postcontent'>
                        <Link className='link' to={`/post/${post.id}`}>
                            <h1>{post.title}</h1>
                            <p>{post.desc}</p>
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