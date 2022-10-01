import React, { Component } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import '../assets/css/header.css'
import '../assets/css/general.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaUser, FaHome, FaVideo,  FaVimeoSquare, FaPlay, FaBars, FaTimes, FaShare, FaEye, FaEyeSlash, FaRegIdBadge, FaTh, FaPlus } from 'react-icons/fa'
import { uid, suid } from 'rand-token';
import SearchBtn from './../assets/images/searchbtn.png'
import User from './../assets/images/user.svg'
import HeaderUserOptions from './HeaderUserOptions';
import Calendar from './Calendar';

class Header extends Component {
    constructor(){
     super();
     this.state ={
        openOptions:false,
        iscalendar:false,
        search:'',
        country:'nil',
        user:[],
        isLoggedin:false,
        isrightside:'desktop_displays',
        ismainsearch:false,
        isseconsearch:false,
        isfilter:'desktop_display',
        usertype:'',
     }
    }

toggleRightSidebar(){
let isrightsidebar = this.state.isrightside;
if (isrightsidebar == 'desktop_display') {
    this.setState({
        isrightside:'mobile_display'
    })
}else{
    this.setState({
        isrightside:'desktop_display'
    })
}}



handleOpenOptions(){
   this.setState({
       openOptions:true,
   })
}

handleCloseOptions(){
    this.setState({
        openOptions:false,
    })
}
toggleCalendar(){
    let cal = this.state.iscalendar;
    this.setState({
        iscalendar : !cal
    })
}



handleChangeSearch(event) {
    this.setState({ search: event.target.value });
}


handleSearch(event) {
    if (this.state.search === '') {
        alert('Please fill the search box');
    } else {
        window.location = `/videos/search/${this.state.search}`

    }

}
handleCategory(e){
   e= e.target.value
    if (e =='nil') {
        
    }else{
        window.location = `/videos/category/${e}`
    }
}

handleCountry(e){
    e= e.target.value
    if (e =='nil') {
        
    }else{
        window.location = `/videos/country/${e}`
    }
}

componentDidMount(){
    this.fetchThisUser();
}

gotoProfile(){
    let email =sessionStorage.getItem('userReg');
    if(email){
        window.location = `/user/1`
    }else{
        alert('Please login to be able to upload videos ');
    }
}
    render() {
        return (
            <div className={"header "+(this.state.isrightside)}>
                  <div className="header_content">

                {
                 (window.location.pathname == '/user/1'
                 ||window.location.pathname == '/user/2'
                 ||window.location.pathname == '/user/3'
                 || window.location.pathname == '/channels'
                 || window.location.pathname == '/editchannel/'
                 || window.location.pathname == '/channel_video'
                 || window.location.pathname == '/subscription'
                 || window.location.pathname == '/channels')? 
                 <div className="header_left">
                 <div className={'mobile_header mobile_display'}>
                     <span onClick={this.props.openLeftSidebar}><FaBars/></span>

                     
                    
                 </div>
                 </div>
                 :
               
                  <div className="header_left">
                    <div className={'mobile_header mobile_display'}>
                        <span onClick={this.props.openLeftSidebar}><FaBars/></span>


                        {(!this.state.ismainsearch)?
                        <span onClick={()=> this.setMainSearch()}><FaSearch/></span>:''}
                        {(this.state.ismainsearch)?
                        <div className="main_search">
                        <input placeholder="Search" value={this.state.search} onChange={(e) =>this.handleChangeSearch(e)}/>
                        <button onClick={() => this.handleSearch()}><img src={SearchBtn} alt="search"/></button>
                     </div>:''}
                    </div>
                    <div className="header_left_a desktop_display">
                       <input placeholder="Search" value={this.state.search} onChange={(e) =>this.handleChangeSearch(e)}/>
                       <button onClick={() => this.handleSearch()}><img src={SearchBtn} alt="search"/></button>
                    </div>
                   
                   <div className={"header_left_b "+this.state.isfilter}>
                   {/* <select onClick={() =>  this.toggleCalendar()}>
                        <option>Date</option>
                    </select> */}
                    <select onChange={(e) => this.handleCategory(e)}>
                        <option value='nil'>Programs</option>
                        <option value="Youth in Agribusiness">Youth in Agribusiness</option>
                        <option value="Climate change">Climate change</option>
                        <option value="Crop production">Crop production</option>
                        <option value="Plant health">Plant health</option>
                        <option value="Biotechnology">Biotechnology </option>
                    </select>
                    <select onChange={(e) => this.handleCountry(e)}> 
                        <option value="nil">Country</option>
                         <option value="Benin">Benin</option>
                         <option value="Burundi">Burundi</option>
                         <option value="Cameroon">Cameroon</option>
                         <option value="DR Congo">DR Congo</option>
                         <option value="Ghana">Ghana</option>  
                         <option value="Kenya">Kenya</option>  
                         <option value="Mozambique">Mozambique</option> 
                         <option value="Nigeria">Nigeria</option>
                         <option value="Rwanda">Rwanda</option>
                         <option value="Tanzania">Tanzania</option>  
                         <option value="Uganda">Uganda</option>   
                         <option value="Global">Global</option> 

                    </select>
                   </div>
                   {this.state.iscalendar?<Calendar/>:<div></div>}
                  </div> 
                  }

                  <div className="header_right">
                    {
                    (this.state.isLoggedin && this.state.user[0].usertype =='SemiAdmin')?
                    <span className="desktop_display" onClick={() => this.gotoProfile()}><FaPlus className="faplus_icon"/>Upload</span>
                    :
                    <b></b>
                    }
                    {(!this.state.ismainsearch)?<span className="mobile_display"><FaPlus /> </span>:
                    <span onClick={() => this.toggleFilter()} className="gridview"><FaTh/> </span> }
                    {(this.state.isLoggedin)?<img src={this.state.user[0].profilepic} alt="user" onClick={() => this.handleOpenOptions()}/>
                        :
                        <img src={User} alt="user" onClick={() => this.handleOpenOptions()}/>}
                  </div>  
                   {this.state.openOptions? <HeaderUserOptions closeoptions={() =>this.handleCloseOptions()}/>: <div></div> }

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
             //  console.log('user', this.state.user[0].userfirstname);
                //console.log( this.state.useremail);
            }).catch((error) =>{
                //console.log(error);
            })
  
       
    }

    setMainSearch(){
        this.setState({
            ismainsearch:!this.state.ismainsearch
        })
    }


    toggleFilter(){
        let isfilter = this.state.isfilter;
        if (isfilter == 'desktop_display') {
            this.setState({
              isfilter:'mobile_display'
            })
        }else{
            this.setState({
                isfilter:'desktop_display'
              })
        }
    }
}

export default Header;
