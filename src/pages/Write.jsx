import React, {useState,useRef,useEffect} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import moment from "moment";
import MDEditor from '@uiw/react-md-editor';
import {CheckOutlined  } from '@ant-design/icons';
import {Button, message, Modal, Radio, theme } from 'antd';
import { Tag, Space,Input } from 'tdesign-react';
import { DiscountIcon, AddIcon } from 'tdesign-icons-react';
import 'tdesign-react/es/style/index.css';
// import DOMPurify from "dompurify";
const Write =()=>{
    const state = useLocation().state;
    const [value, setValue] = useState(state?.desc || "");
    const [title, setTitle] = useState(state?.title || "");
     const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");
    //文件手动上传
    const [uploading, setUploading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [inputVisible, toggleInputVisible] = useState(false);
    const [tagList, setTagList] = useState([]);

    /**
     * @param {number} i
     */
    const deleteTag = (i) => {
        const newtagList = [...tagList];
        newtagList.splice(i, 1);
        setTagList(newtagList);
    };

    const handleClickAdd = () => {
        toggleInputVisible(true);
    };

    const handleInputEnter = (value) => {
        toggleInputVisible(false);
        if (value) setTagList((currentList) => currentList.concat([{ name: value, showClose: true }]));
    };

    console.log(tagList)

    const options = [
        {
            id:0,
            value: 'blogs',
            label: '博客',
        },
        {
            id:1,
            value: 'writes',
            label: '笔记',
        },
        {
            id:2,
            value: 'readings',
            label: '阅读',
        },
        {
            id:3,
            value: 'games',
            label: '游戏',
        },
    ];

    // console.log(file)


    const upload= async ()=>{
        // const formData = new FormData();
        // fileList.forEach((file) => {
        //     formData.append('file', file);
        // });
        // try{
        //     await axios.post('/upload',formData).then((res) => {
        //         setFileList([]);
        //         setUploading(false);
        //         return res.data
        //     })
        // }catch (err) {
        //     message.error('发布失败');
        //     console.log(err);
        // }
        try{
            const formData =new FormData()
            formData.append("file",file)
            const res =await axios.post("/upload",formData)
            return res.data
        }catch (err){
            console.log(err)
        }
    }

    const handleClick = async e=> {
        try {
            const imgUrl = await upload();
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
            console.log(imgUrl)
            message.success('发布成功');
        } catch (err) {
            message.error('发布失败');
            console.log(err);
        }
    }

    const handleImgUpload = async () => {
        setUploading(true);
        await handleClick()
        setUploading(false);

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

    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }
    return<div className='writediv'>
        <Modal centered={true} title="注意" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
            <p>确认要发布吗？</p>
        </Modal>
        <Modal centered={true} title="恭喜" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} okText="确认" cancelText="取消">
            <p>发布成功</p>
        </Modal>
        <div className='writecontent'>
            <div className='titlediv'><p>标题:</p><input type="text" value={getText(title)} placeholder='请输入标题' onChange={e=>setTitle(e.target.value)}/></div>
            <div className="editorContainer">
                <MDEditor  height={600} className="editor" theme="snow" value={value} onChange={setValue} />
            </div>
        </div>
        <div className='menu'>
            <div className='item1'>
                <input style={{display:"none"}} type="file" name="" id="file" onChange={e=>setFile(e.target.files[0])}/>
                {file ? null :<div className='uploadDiv'><label className='label1' htmlFor="file">点击上传背景(只能上传一张图片)(png/jpg/jpeg)</label></div>}
                {!file ? null :<div className='uploadDiv'><label className='label1'><CheckOutlined />上传成功<Button onClick={e=>setFile(null)}>取消上传</Button></label></div>}
            </div>
            <div className='item2'>
                <h1>请选择上传组别</h1>
                <div className="cat">
                    <Radio.Group name="radiogroup" defaultValue={1}>
                        {options.map((item) => (
                            <Radio key={item.value} value={cat} onChange={(value) => {setCat(value)}} value={item.value} >
                                {item.label}
                            </Radio>
                        ))}
                    </Radio.Group>
                </div>
            </div>
            <div className='item3'>
                <h1>请添加文章标签</h1>
                <div className='tagDiv'>
                    <div className='listDiv'>
                        {tagList.map((tag, i) => (
                            <Tag size="large"
                                key={i}
                                closable
                                onClose={() => {
                                    deleteTag(i);
                                }}
                                icon={tag.icon}
                                disabled={tag.disabled}
                                style={{ marginRight: 20,marginBottom:15 }}
                            >
                                {tag.name}
                                {i}
                            </Tag>
                        ))}
                    </div>
                    <div style={{ display: 'flex', cursor: 'pointer' }}>
                        {inputVisible ? (
                            <Input onBlur={handleInputEnter} onEnter={handleInputEnter} style={{ width: '94px' }} />
                        ) : (
                            <Tag size="large" onClick={handleClickAdd} icon={<AddIcon />}>
                                可添加标签
                            </Tag>
                        )}
                    </div>
                </div>
            </div>
            <div className='uploadButton'>
            <Button size='large'>保存草稿</Button>
            <Button
                type="primary"
                onClick={showModal}
                // disabled={fileList.length === 0}
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