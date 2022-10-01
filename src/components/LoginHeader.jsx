import React, { Component } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import '../assets/css/header.css'
import '../assets/css/general.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaUser, FaHome, FaVideo,  FaVimeoSquare, FaPlay, FaBars, FaTimes, FaShare, FaEye, FaEyeSlash, FaRegIdBadge, FaTh } from 'react-icons/fa'
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
        isfilter:'desktop_display'
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

    render() {
        return (
            <div className={"header "+(this.state.isrightside)}>
                  <div className="header_content">
                  <div className="header_left">
                    <div className={'mobile_header mobile_display'}>
                        <span onClick={this.props.openLeftSidebar}><FaBars/></span>
                    
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
               // console.log(responseJSON);
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
