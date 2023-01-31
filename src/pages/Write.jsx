import React, {useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import moment from "moment";
import MDEditor from '@uiw/react-md-editor';
import { UploadOutlined ,InboxOutlined } from '@ant-design/icons';
import {Button, Input, message, Upload,Modal} from 'antd';
// import DOMPurify from "dompurify";
const { Dragger } = Upload;
const Write =()=>{
    const state = useLocation().state;
    const [value, setValue] = useState(state?.desc || "");
    const [title, setTitle] = useState(state?.title || "");
     const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");
    // const navigate = useNavigate()
    //文件手动上传
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const navigate=useNavigate()

    const handleImgUpload = async () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file);
        });
        setUploading(true);
        try{
            await axios.post('/upload',formData).then(() => {
                setFileList([]);
                message.success('发布成功');
            }).finally(() => {
                setUploading(false);
            })
            navigate('/')
        }catch (err) {
            message.error('发布失败');
            console.log(err);
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setConfirmLoading(false);
        }, 2000)
        handleImgUpload()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModal2 = () => {
        setIsModalOpen2(true);
    };
    const handleOk2 = () => {
        setIsModalOpen2(false);
    };
    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };


    let props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
        multiple: false,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },confirmLoading: {confirmLoading}
    };

    if(fileList.length!=0) props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            showModal2()
            return false;
        },
        fileList,
        multiple: false,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        }
    };

    // const handleClick = async e=>{
    //     e.preventDefault();
    //     const imgUrl = await upload();
    //     try {
    //         state
    //             ? await axios.put(`/posts/${state.id}`, {
    //                 title,
    //                 desc: value,
    //                 cat,
    //                 img: file ? imgUrl : "",
    //             })
    //             : await axios.post(`/posts/`, {
    //                 title,
    //                 desc: value,
    //                 cat,
    //                 img: file ? imgUrl : "",
    //                 date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    //             });
    //         navigate("/")
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }
    return<div className='writediv'>
        <Modal centered={true} title="注意" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
            <p>确认要发布吗？</p>
        </Modal>
        <Modal centered={true} title="注意" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} okText="确认" cancelText="取消">
            <p>只能上传一个文件</p>
        </Modal>
        <div className='writecontent'>
            <div className='titlediv'><p>标题:</p><Input type="text" value={getText(title)} placeholder='请输入标题' onChange={e=>setTitle(e.target.value)}/></div>
            <div className="editorContainer">
                <MDEditor  height={600} className="editor" theme="snow" value={value} onChange={setValue} />
            </div>
        </div>
        <div className='menu'>
            <div className='item1'>
                <Dragger className='dragger' {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击上传或拖拽图片文件于此处上传</p>
                    <p className="ant-upload-hint">
                        注意:只能上传一个图片文件 (png/jpg/jpeg)
                    </p>
                    <p className="ant-upload-hint">
                        Notice: Only one image file can be uploaded (png/jpg/jpeg)
                    </p>
                </Dragger>
            </div>
            <div className='item2'>
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
            <div className='uploadButton'>
            <Button size='large'>保存草稿</Button>
            <Button
                type="primary"
                onClick={showModal}
                disabled={fileList.length === 0}
                loading={uploading}
                size='large'
            >
                {uploading ? '正在发布' : '发 布'}
            </Button>
            </div>
        </div>
    </div>
}
export default Write