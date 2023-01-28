import React from "react";
import {DeleteOutlined,EditOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {Link} from "react-router-dom";
import Menu from "../components/Menu"
const Single =()=>{
    return<div className='single'>
        <div className='singlecontent'>
            <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.RXLTq-g6CTutzjLYFr1oZgHaFP?pid=ImgDet&rs=1"/>
            <div className='user'>
                <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.RXLTq-g6CTutzjLYFr1oZgHaFP?pid=ImgDet&rs=1"></img>
            <div className="info">
                <span>Ranorle</span>
                <p>Posted 2 days ago</p>
            </div>
                <div className="edit">
                    <Link to={`/write?edit=2`}>
                        <Button type="primary" shape="circle" icon={<DeleteOutlined />} size='large' ghost/>
                    </Link>
                    <Link to={`/write?delete=2`}>
                        <Button type="primary" shape="circle" icon={<EditOutlined />} size='large' ghost/>
                    </Link>
                </div>
        </div>
            <h1>这是一个标题啦啦啦</h1>
            <p>你说得对 但是《 》是由 自主研发的一款全新开放世界冒险游戏#(游戏发生在一个被称作「 」的幻想世界，在这里被 选中的 将被授予「 」，引导 之力。你将扮演一位名为「 」的神秘角色，在自由的 中邂逅性格各异、能力独特的 们，和它们一起击败 ，找回 的同时，逐步发掘「 」的真相
                你说得对 但是《 》是由 自主研发的一款全新开放世界冒险游戏#(游戏发生在一个被称作「 」的幻想世界，在这里被 选中的 将被授予「 」，引导 之力。你将扮演一位名为「 」的神秘角色，在自由的 中邂逅性格各异、能力独特的 们，和它们一起击败 ，找回 的同时，逐步发掘「 」的真相
                你说得对 但是《 》是由 自主研发的一款全新开放世界冒险游戏#(游戏发生在一个被称作「 」的幻想世界，在这里被 选中的 将被授予「 」，引导 之力。你将扮演一位名为「 」的神秘角色，在自由的 中邂逅性格各异、能力独特的 们，和它们一起击败 ，找回 的同时，逐步发掘「 」的真相
                你说得对 但是《 》是由 自主研发的一款全新开放世界冒险游戏#(游戏发生在一个被称作「 」的幻想世界，在这里被 选中的 将被授予「 」，引导 之力。你将扮演一位名为「 」的神秘角色，在自由的 中邂逅性格各异、能力独特的 们，和它们一起击败 ，找回 的同时，逐步发掘「 」的真相
                你说得对 但是《 》是由 自主研发的一款全新开放世界冒险游戏#(游戏发生在一个被称作「 」的幻想世界，在这里被 选中的 将被授予「 」，引导 之力。你将扮演一位名为「 」的神秘角色，在自由的 中邂逅性格各异、能力独特的 们，和它们一起击败 ，找回 的同时，逐步发掘「 」的真相
                你说得对 但是《 》是由 自主研发的一款全新开放世界冒险游戏#(游戏发生在一个被称作「 」的幻想世界，在这里被 选中的 将被授予「 」，引导 之力。你将扮演一位名为「 」的神秘角色，在自由的 中邂逅性格各异、能力独特的 们，和它们一起击败 ，找回 的同时，逐步发掘「 」的真相
                你说得对 但是《 》是由 自主研发的一款全新开放世界冒险游戏#(游戏发生在一个被称作「 」的幻想世界，在这里被 选中的 将被授予「 」，引导 之力。你将扮演一位名为「 」的神秘角色，在自由的 中邂逅性格各异、能力独特的 们，和它们一起击败 ，找回 的同时，逐步发掘「 」的真相
                你说得对 但是《 》是由 自主研发的一款全新开放世界冒险游戏#(游戏发生在一个被称作「 」的幻想世界，在这里被 选中的 将被授予「 」，引导 之力。你将扮演一位名为「 」的神秘角色，在自由的 中邂逅性格各异、能力独特的 们，和它们一起击败 ，找回 的同时，逐步发掘「 」的真相
                你说得对 但是《 》是由 自主研发的一款全新开放世界冒险游戏#(游戏发生在一个被称作「 」的幻想世界，在这里被 选中的 将被授予「 」，引导 之力。你将扮演一位名为「 」的神秘角色，在自由的 中邂逅性格各异、能力独特的 们，和它们一起击败 ，找回 的同时，逐步发掘「 」的真相
            </p>
        </div>
        <Menu/>
    </div>
}
export default Single