import React, { Component } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import '../assets/css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaUser, FaHome, FaVideo, FaPlaystation, FaViadeoSquare, FaVideoSlash, FaPause, FaVimeoSquare, FaPlay, FaBars, FaTimes, FaShare, FaEye, FaEyeSlash, FaDot } from 'react-icons/fa'
import { uid, suid } from 'rand-token';
import SearchBtn from './../assets/images/searchbtn.png'
import User from './../assets/images/user.svg'

class Header extends Component {
      constructor(){
        super();
        this.state={
          user:[],
          isLoggedin:false,
        }
      }
    handleLogout(){
      sessionStorage.removeItem('userReg');
      window.location='/login/'
    }
    componentDidMount(){
      this.fetchThisUser();
    }
    render() {
      const {user} = this.state;
        return (
            <div className="overlay">
              <div className="header_option">
                <div className="header_option_top">
                    {
                      (this.state.isLoggedin)?user.map((user, i) =>
                      <span key={i} className="inner-option">
                        <img src={user.profilepic} alt="image" />
                        <span>{user.userfirstname} {user.userlastname.substring(0,1).toUpperCase()} </span>
                      </span>
                    ):<span className="inner-option">
                        <img src={User} alt="image" />
                        <span><Link className="link" to={'/register'}>Register</Link> / <Link className="link" to={'/login'}>Login</Link> </span>
                     </span>
                    }
                   <span className="inner-option2"> <span onClick={this.props.closeoptions} ><FaTimes/></span></span>
                </div>
                <div className="header_option_btm">
                    <div className="option_link_box">          
                        <Link to={`/user/3`} className="link"><span>Your Channel</span></Link>
                        <Link to={`/user/1`} className="link"><span>Your Videos</span></Link>
                        <Link to={`/setting`} className="link"><span>Settings</span></Link>
                        {(this.state.isLoggedin)?<span onClick={()=>this.handleLogout()}>Sign Out</span>:''}
                        
                        <span>Help</span>

                    </div>
                </div>
              </div>
            </div>
   
        );
    }

    fetchThisUser(){
       
      let useremail = sessionStorage.getItem('userReg');
     fetch('/videostreaming/user.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              useremail: useremail,

          })
      })

          .then((response) => response.json())
          .then((responseJSON) => {
              if (responseJSON['output'][0]['success'] =='true') {
                this.setState({
                  isLoggedin:true,
                  user: responseJSON['output'][0]['user'],
                  allsub : responseJSON['output'][0]['allsubscription']
              })
              }
              console.log(responseJSON);
              //console.log( this.state.useremail);
          }).catch((error) =>{
              //console.log(error);
          })

     
  }
}

export default Header;
