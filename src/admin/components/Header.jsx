import React, { Component } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import '../../assets/css/header.css'
import '../../assets/css/general.css'
import '../../assets/css/admin.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaUser, FaHome, FaVideo, FaPlaystation, FaViadeoSquare, FaVideoSlash, FaPause, FaVimeoSquare, FaPlay, FaBars, FaTimes, FaShare, FaEye, FaEyeSlash, FaClock } from 'react-icons/fa'
import { uid, suid } from 'rand-token';
import SearchBtn from '../../assets/images/searchbtn.png'
import User from '../../assets/images/user.png'
import Calendar from './Calendar';

class Header extends Component {
    constructor(){
     super();
     this.state ={
        iscalendar:false,
     }
    }

toggleCalendar(){
    let cal = this.state.iscalendar;
    this.setState({
        iscalendar : !cal
    })
}
componentDidMount(){
    this.checkLogin();
}


    render() {
        let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const day = days[new Date().getDay()];
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true });
        
        return (
            <div className="header">
                <div className="header_content">
                  <div className="admin_header_left">
                    <div className="admin_header_left_a">
                      <img src={User} alt="Profile Picture"/>
                      <span>Welcome Admin</span>
                    </div>
                
                  </div> 
                  <div className="admin_header_right">
                     <span ><FaClock/></span>
                     <span >{day} {time}</span>
                  </div>  
                </div>   
            </div>
   
        );
    }

    checkLogin = () =>{
        let adminemail = sessionStorage.getItem('ValidateAdmin');
    
        fetch('/videostreaming/verifyadminlogin.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                adminemail: adminemail,
          })
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON['output'][0]['success'] == 'true') {
                    this.setState({
                        isLoggedin:true
                    })
                }else{
                    window.location ='/admin/login'
                  }
             console.log(responseJSON);
            }).catch((error) =>{
               // console.log(error);
            })
    
             
          
      }
}

export default Header;
