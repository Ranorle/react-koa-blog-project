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

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    // const BlogCards = () => {
    //     return <Link className='CardDivs' to={`/post/${post.id}`}>
    //         <div className='CardImg'>
    //             <img className='BlogImg' src={`../upload/${post.img}`}></img>
    //         </div>
    //         <div className='CardInfo'>
    //             <div className='CardTitle'><span>{getText(post.title)}</span></div>
    //             <div className='CardInfomin'>
    //                 <div className='CardComment'>{getText(post.desc)}</div>
    //                 <div className='CardInfodet'>{post.date}</div>
    //             </div>
    //         </div>
    //     </Link>
    // }

    return<div className='home'>
        <div className='posts'>
            {
                posts.map(post=>(
                    <Link key={post.id} className='CardDivs' to={`/post/${post.id}`}>
                        <div className='CardImg'>
                            <img className='BlogImg' src={`../upload/${post.img}`}></img>
                        </div>
                        <div className='CardInfo'>
                            <div className='CardTitle'><span>{getText(post.title)}</span></div>
                            <div className='CardInfomin'>
                                <div className='CardComment'>{getText(post.desc)}</div>
                                <div className='CardInfodet'>{post.date}</div>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>
}
export default Home