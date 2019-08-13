import React from 'react'
import Chat from './Chat.jsx'

const Sidebar = ({toggleSidbar}) => (
    <div>
        <div id="mySidebar" className="sidebar">
        <a href="javascript:void(0)" className="closebtn" onClick={() => {
            document.getElementById("mySidebar").style.width = "0";
            document.getElementById("main").style.marginLeft= "0";
        }}>×</a>
        <Chat />
    </div>
    
    <div id="main">
        <button className="openbtn" onClick={() => {
            document.getElementById("mySidebar").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";}}>☰ Chat!</button>  
    </div>
    </div>
)

export default Sidebar;