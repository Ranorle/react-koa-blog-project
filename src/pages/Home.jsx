import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios  from "axios";
import {Empty, Tag, Card, Checkbox, Row, Col} from "antd"
import dayjs from "dayjs";
import { Pagination } from 'tdesign-react';
const Home =()=>{
    const onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
    };
    const [posts,setPosts] = useState([])
    const [page,setPage]=useState(1)
    const cat = useLocation().search
    // console.log(cat)
    useEffect(()=>{
        const fetchData=async ()=>{
            try{
                let res
                 if(cat) res=await axios.get(`/posts${cat}`)
                if(!cat) res=await axios.get(`/posts?cat=blogs`)
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
    let postData=[]
    const pageSize=2
    function handlePosts(){
        for(let i=page*pageSize-pageSize;(i<page*pageSize && i!==posts.length);i++) {
            postData[i]=posts[i]
        }
    }
    handlePosts()
    let Cards= postData.map((post)=>{
            let t=[]
            function a(){
                let v=[]
                if(post) v=post.tags.split(',')
                t=v.map((prop)=>{
                    return {name:prop,showClose:false}
                })
            }
            a()
            const tagSd=t.map((prop)=>{
                return <Tag key={prop.name} color="#ebebeb" closable={false} style={{color:'black',marginLeft:'0px',marginRight:'4.5px'}}>{prop.name}</Tag>
            })
           return<Link key={post.id} className='CardDivs' to={`/post/${post.id}`}>
                <div className='CardImg'>
                    {post.img &&<img className='BlogImg' src={`../upload/${post.img}`}></img>}
                    {!post.img &&<div className='Empty'><Empty description='' image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>}
                </div>
                <div className='CardInfo'>
                    <div className='CardTitle'><span>{getText(post.title)}</span></div>
                    <div className='CardInfomin'>
                        <div className='CardComment'>
                            <p className='p1'>{getText(post.introduction)}</p>
                            <p className='p2'><span>作者:{post.username}</span> <span>标签: {tagSd}</span></p>
                        </div>
                        <div className='CardInfodet'>{dayjs(post.date).format("YYYY-MM-DD")}</div>
                    </div>
                </div>
            </Link>
        })
    let f=[]
    const checkboxs =()=>{
        posts.map((post)=>{
            if(post.tags) f.push(post.tags)
        })
        f=Array.from(new Set(f))
        return f.map((prop)=>{
            return<Col >
            <Checkbox value={prop}>{prop}</Checkbox>
        </Col>
        })

    }
    const boxs=checkboxs()

    return<div className='home'>
        <div className='posts'>
            <div className='postsDiv'>{Cards}</div>
            <div className='pageNationDiv'>
                <Pagination  size="medium" total={posts.length}  defaultPageSize={2} showPageSize={false} totalContent={false} onChange={(info)=>{
                setPage(info.current)
                }
                } showJumper />
            </div>
        </div>
        <div className='CheckboxDiv'>
            <Card title="筛 选"  className='CardDiv'>
                <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                    <Row>
                        {boxs}
                    </Row>
                </Checkbox.Group>
            </Card>
        </div>
    </div>
}
export default Home