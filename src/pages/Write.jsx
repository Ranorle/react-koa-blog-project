import React, {useState,useRef,useEffect} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import moment from "moment";
import MDEditor from '@uiw/react-md-editor';
import {CheckOutlined  } from '@ant-design/icons';
import {Button, message, Modal, Radio } from 'antd';
import { Tag,Input } from 'tdesign-react';
import { DiscountIcon, AddIcon } from 'tdesign-icons-react';
import 'tdesign-react/es/style/index.css';
const Write =()=>{
    const state = useLocation().state;
    let tagsinfo=[]
    function a(){
        let v=[]
        if(state) v=state.tags.split(',')
        tagsinfo=v.map((prop)=>{
            return {name:prop,showClose:true}
        })
    }
    a()
    const [value, setValue] = useState(state?.desc || "");
    const [title, setTitle] = useState(state?.title || "");
     const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");
    //文件手动上传
    const [uploading, setUploading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [upImg,setupImg]=useState(false)
    const [inputVisible, toggleInputVisible] = useState(false);
    const [tagList, setTagList] = useState(tagsinfo);
    const[imgvalue,setimgvalue]=useState('')
    const[intro,setIntro]=useState(state?.introduction || '懒得写简介了')
    let disabled=true
    function disabled1(){
        if(title && value && cat) disabled= false
        if(!(title && value && cat))disabled=true
    }
    disabled1()
    const tagListname=tagList.map((ob)=>{
    return ob.name
     })
     const taginfo = tagListname.toString();

    function catinfo(){
        if(state) return state.cat
        return ''
    }


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

    // console.log(tagList)

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

    const upload= async (e)=>{
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
            const imgUrl =await upload()
            state
                ? await axios.put(`/posts/${state.id}`, {
                    title,
                    desc: value,
                    cat,
                    img: file ? imgUrl : state.img,
                    tags:taginfo,
                    intro:intro,
                })
                : await axios.post(`/posts/`, {
                    title,
                    desc: value,
                    cat,
                    img: file ? imgUrl : '',
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                   tags:taginfo,
                    intro:intro,
                });
            message.success('发布成功');
            setUploading(false);
        } catch (err) {
            message.error('发布失败');
            console.log(err);
            setUploading(false);
        }
    }

    const handleImgUpload = async () => {
        setUploading(true);
        await handleClick()
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setTimeout(() => {
            setIsModalOpen(false);
        }, 2000)
        handleImgUpload()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }
    return<div className='writediv'>
        <Modal centered={true} title="注意" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
            <p>确认要发布吗？</p>
        </Modal>
        <div className='writecontent'>
            <div className='titlediv'><p>标题:</p><input type="text" value={getText(title)} placeholder='请输入标题' onChange={e=>setTitle(e.target.value)}/></div>
            <div className='titlediv'><p>简介:</p><input type="text" placeholder='请输入简介' value={getText(intro)} onChange={e=>setIntro(e.target.value)}/></div>
            <div className="editorContainer">
                <MDEditor  height={600} className="editor" theme="snow" value={value} onChange={setValue} />
            </div>
        </div>
        <div className='menu'>
            <div className='item1'>
                <input style={{display:"none"}} type="file" name="" id="file" value={imgvalue} onChange={e=>{setFile(e.target.files[0])
                setupImg(true)
                }}/>
                {!upImg && state && <div className='uploadDiv'><label className='label1' htmlFor="file"><p>点击更改背景(只能上传一张图片)(png/jpg/jpeg)</p></label></div>}
                {!upImg && !state && <div className='uploadDiv'><label className='label1' htmlFor="file"><p>点击上传背景(只能上传一张图片)(png/jpg/jpeg)</p></label></div>}
                {upImg && <div className='uploadDiv'><label className='label1'><CheckOutlined />上传成功<Button onClick={e=>{setFile(null)
                setupImg(false)
                    setimgvalue('')
                }}>取消上传</Button></label></div>}
            </div>
            <div className='item2'>
                <h1>请选择上传组别</h1>
                <div className="cat">
                    <Radio.Group name="radiogroup" defaultValue={catinfo}>
                        {options.map((item) => (
                            <Radio key={item.value}  onChange={(value) => {
                                // console.log(value)
                                setCat(value.target.value)}}
                                   value={item.value} >
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
                            </Tag>
                        ))}
                    </div>
                    <div style={{ display: 'flex', cursor: 'pointer' }}>
                        {inputVisible ? (
                            <Input onBlur={handleInputEnter} onEnter={handleInputEnter} style={{width: '94px' }} />
                        ) : (
                            <Tag size="large" onClick={handleClickAdd} style={{margin:'0px'}} icon={<AddIcon />}>
                                可添加标签
                            </Tag>
                        )}
                    </div>
                </div>
            </div>
            <div className='uploadButton'>
            <Button size='large' onClick={()=>{message.info('肥肠抱歉,保存草稿功能还在完善中>_<')}}>保存草稿</Button>
            <Button
                type="primary"
                onClick={showModal}
                disabled={disabled}
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