import React, { Component } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import '../assets/css/sidebar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaUser, FaHome, FaVideo, FaPlus, FaEye, FaEyeSlash, FaArrowLeftAlt, FaLongArrowAltLeft, FaTimes, FaChartArea, FaPlayCircle, FaThumbsUp } from 'react-icons/fa'
import { uid, suid } from 'rand-token';
import Logo from './../assets/images/logo.png'


class Header extends Component {
    constructor(){
        super();
        this.state={
            currentpage:'',
            user:[],
            isLoggedin:false,
        }
    }
    gotoProfile(){
        let email =sessionStorage.getItem('userReg');
        if(email){
            window.location = `/user/1`
        }else{
            alert('Please login to be able to upload videos ');
        }
    }
    //dfhdhdgdg
    getCurrentPage(){
       
        
        this.setState({
            currentpage: window.location.pathname
        })
        
    }

    componentDidMount(){
        this.getCurrentPage();
        this.fetchThisUser();
    }

     handleLink(link){
        window.location = link
    }

    

    render() {
        const {currentpage} = this.state;
        return (
            <div className={"sidebar "+this.props.leftsidebar} >
                 <div className="close_left_sidebar mobile_display">
                    <span onClick={this.props.closeLeftSidebar}><FaTimes/></span>
                 </div>
                  <div className="sidebar_logo">
                      <Link to={'/'} className="link"><img src={Logo} alt="logo" /></Link>
                  </div> 
                  <div className="sidebar_links">
                          <div> <Link to={'/'}><span className={(currentpage =='/')? 'active':''}><FaHome className="side_icon"/> Home</span></Link> </div>
                          <div> <Link to={'/videos'}><span className={(currentpage =='/videos')? 'active':''}><FaVideo className="side_icon"/> Videos</span></Link></div>
                          <div> <Link to={'/channels'}><span className={(currentpage =='/channels')? 'active':''}><FaChartArea className="side_icon"/> Channels</span></Link></div>

                          {(this.state.isLoggedin && this.state.user[0].usertype == 'subadmin')?  <div> 
                          <div> <Link to={'/subscription'}><span className={(currentpage =='/subscription')? 'active':''}><FaPlayCircle className="side_icon"/>Subscriptions</span></Link> </div>
                          <div> <Link to={'/liked_videos'}><span className={(currentpage =='/liked_videos')? 'active':''}><FaThumbsUp className="side_icon"/>Liked Videos </span></Link> </div>
                          </div>
                          :""}
                          <div> <Link to={'/tv/index'}><span className='active2'><FaVideo className="side_icon"/>IITA TV </span></Link> </div>
                  </div>  
                  
                  {(this.state.isLoggedin && this.state.user[0].usertype == 'subadmin')?   
                  <div className="sidebar_buttons" onClick={() => this.gotoProfile()}>
                        <span className="primaryButton"> <FaPlus className="icon" /> Upload</span>
                  </div>
                  :''} 

                  <div className="sidebar_cat">
                       <div>
                           <span className="sidebar_cat_title">PROGRAMS</span>
                       </div>

                       
                       {
                 (window.location.pathname == '/videos/category/Youth%20in%20Agribusiness'
                 || window.location.pathname == '/videos/category/Climate%20change'
                 || window.location.pathname == '/videos/category/Crop%20Production'
                 || window.location.pathname == '/videos/category/Plant%20health'
                 || window.location.pathname == '/videos/category/Biotechnology'
             
                )? 
                      <div>
                       <div> <span onClick={() =>this.handleLink('/videos/category/Youth in Agribusiness')}>Youth in Agribusiness</span> </div>
                       <div> <span onClick={() => this.handleLink('/videos/category/Climate change')}>Climate change</span> </div>
                       <div> <span onClick={() => this.handleLink('/videos/category/Crop production')}>Crop production</span> </div>
                       <div> <span onClick={() => this.handleLink('/videos/category/Plant health')}>Plant health</span> </div>
                       <div><span  onClick={() => this.handleLink('/videos/category/Biotechnology')}>Biotechnology</span> </div>
                
                      </div>
                       :
                       <div>
                       <div> <Link to={`/videos/category/Youth in Agribusiness `} ><span>Youth in Agribusiness  </span></Link> </div>
                       <div> <Link to={`/videos/category/Climate change`} ><span>Climate change  </span></Link> </div>
                       <div> <Link to={`/videos/category/Crop production`} ><span>Crop production  </span></Link> </div>
                       <div> <Link to={`/videos/category/Plant health`} ><span> Plant health  </span></Link> </div>
                       <div> <Link to={`/videos/category/Biotechnology`} ><span> Biotechnology  </span></Link> </div>
                      
                      </div>
                       }     
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
                    allsub : responseJSON['output'][0]['allsubscription'],
                    
                })
                }
                console.log(responseJSON);
                //console.log( this.state.useremail);
            }).catch((error) =>{
                console.log(error);
            })
  
       
    }


}

export default Header;
