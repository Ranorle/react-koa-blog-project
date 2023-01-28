import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Write =()=>{
    const [value, setValue] = useState('');
    return<div className='writediv'>
        <div className='writecontent'>
            <input type="text" placeholder='标题'></input>
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
                <input style={{display:"none"}} type="file" name="" id="file"/>
                <label className="filelabel" htmlFor="file">Upload Image</label>
                <div className="buttons">
                    <button>保存草稿</button>
                    <button>更新</button>
                </div>
            </div>
            <div className='item'>
                <h1>类别</h1>
                <div className="cat">
                <input type="radio" name="cat" value="blog" id="blog"></input>
                <label htmlFor="blog">博客</label>
                </div>
                <div className="cat">
                <input type="radio" name="cat" value="game" id="game"></input>
                <label htmlFor="game">游戏</label>
                </div>
                <div className="cat">
                <input type="radio" name="cat" value="writings" id="writings"></input>
                <label htmlFor="writings">笔记</label>
                </div>
                <div className="cat">
                <input type="radio" name="cat" value="readings" id="readings"></input>
                <label htmlFor="readings">阅读</label>
                </div>
                <div className="cat">
                <input type="radio" name="cat" value="food" id="food"></input>
                <label htmlFor="food">美食</label>
                </div>
            </div>
        </div>
    </div>
}
export default Write