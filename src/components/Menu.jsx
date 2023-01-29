import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
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
const Menu =({cat})=>{
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/?cat=${cat}`);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [cat]);
    return<div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map(post=>(
            <div className='post' key={post.id}>
                <img src={`../upload/${post?.img}`} alt=""/>
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
}
export default Menu