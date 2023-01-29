import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import moment from "moment";
import DOMPurify from "dompurify";
const Write =()=>{
    const state = useLocation().state;
    const [value, setValue] = useState(state?.desc || "");
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");

    const navigate = useNavigate()

    const upload = async()=>{
        try{
            const formData =new FormData()
            formData.append("file",file)
            const res =await axios.post("/upload",formData)
            return res.data
        }catch (err){
            console.log(err)
        }
    }

    const handleClick = async e=>{
        e.preventDefault();
        const imgUrl = await upload();

        try {
            state
                ? await axios.put(`/posts/${state.id}`, {
                    title,
                    desc: value,
                    cat,
                    img: file ? imgUrl : "",
                })
                : await axios.post(`/posts/`, {
                    title,
                    desc: value,
                    cat,
                    img: file ? imgUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                });
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    }
    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }
    return<div className='writediv'>
        <div className='writecontent'>
            <input type="text" value={getText(title)} placeholder='标题' onChange={e=>setTitle(e.target.value)}/>
            <div className="editorContainer">
                <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
            </div>
        </div>
        <div className='menu'>
            <div className='item'>
                <h1>Publish</h1>
                <span>
                    <b>Status:</b>草稿
                </span>
                <span>
                    <b>可见状态:</b>公开
                </span>
                <input style={{display:"none"}} type="file" name="" id="file" onChange={e=>setFile(e.target.files[0])}/>
                <label className="filelabel" htmlFor="file">Upload Image</label>
                <div className="buttons">
                    <button>保存草稿</button>
                    <button onClick={handleClick}>发布</button>
                </div>
            </div>
            <div className='item'>
                <h1>类别</h1>
                <div className="cat">
                <input type="radio" checked={cat === "blogs"} name="cat" value="blogs" id="blogs" onChange={e=>setCat(e.target.value)}></input>
                <label htmlFor="blog">博客</label>
                </div>
                <div className="cat">
                <input type="radio" checked={cat === "games"} name="cat" value="games" id="games" onChange={e=>setCat(e.target.value)}></input>
                <label htmlFor="game">游戏</label>
                </div>
                <div className="cat">
                <input type="radio" checked={cat === "writings"} name="cat" value="writings" id="writings" onChange={e=>setCat(e.target.value)}></input>
                <label htmlFor="writings">笔记</label>
                </div>
                <div className="cat">
                <input type="radio" checked={cat === "readings"} name="cat" value="readings" id="readings" onChange={e=>setCat(e.target.value)}></input>
                <label htmlFor="readings">阅读</label>
                </div>
            </div>
        </div>
    </div>
}
export default Write