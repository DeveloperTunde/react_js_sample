import React, { Component, useState } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../assets/css/videos.css'
import '../assets/css/styles.css'
import '../assets/css/user.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaSquare,FaShareAlt } from 'react-icons/fa'
import Thumbnailbg from './../assets/images/bgthumbnail.png'
import User from './../assets/images/user.png'
import IndexTabs from './components/IndexTabs'
import UploadVideoForm from './components/UploadVideoForm'




class UserIndex extends Component {
   
     constructor(props){
        super(props);
        this.state={
            showmodal: false,
            showedit: false,
            showmodal2: false,
            isLoggedin: false,
            useremail: '',
            myvideos:[],
            allsub:0,
            user:[],
            isrightside:'desktop_display',
            isleftsidebar:'desktop_display'
        }
     }


  setShow = (e) =>{
    this.setState({
        showmodal:e
    })
  }

  showEdit = (e) =>{
    this.setState({
        showedit:e
    })
  }

  setShow2 = (e) =>{
    this.setState({
        showmodal2:e,
        showmodal:false
    })
  }

  checkLogin = async () =>{
    let useremail = await sessionStorage.getItem('userReg');
    fetch('/videostreaming/verifylogin.php', {
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
            if (responseJSON['output'][0]['success'] == 'true') {
                this.setState({
                    isLoggedin:true
                })
            }else{
                window.location ='../login'
              }
         console.log(responseJSON);
        }).catch((error) =>{
           // console.log(error);
        })

         
      
  }
  getUser(){
      let email =sessionStorage.getItem('userReg');
    this.setState({
        useremail: email
    })
  }

  componentDidMount(){
      this.checkLogin();
      this.getUser();
      this.fetchMyVideos();
      this.fetchThisUser();
  }
    render() {
       const {user}  = this.state;
        return (
            <div className="body" >
                <Sidebar leftsidebar={this.state.isleftsidebar}  closeLeftSidebar={() => this.toggleLeftSidebar()}/>
                <div className="content" >
                <Header openLeftSidebar={() => this.toggleLeftSidebar()} />
                <div className="page_container" >
                  <div className="user_wrapper" >
                    <div className="user_account_top">
                        <div className="user_account_top_left">
                            <div className="user_account_top_left_a">
                                <img src={user.profilepic} alt="Profile Picture" />
                            </div>
                            <div className="user_account_top_left_b">
                                <span>{user.userfirstname} {user.userlastname}</span>
                                <span>{this.state.allsub} Subscribers</span>
                            </div>
                        </div>
                        <div className="user_account_top_right">
                           {(this.state.isLoggedin && this.state.user.usertype == 'SemiAdmin')?
                             <span className="primaryButton" onClick={() => this.setShow(true)}><b style={{marginRight:'8px'}}>+</b> Upload Video</span>
                             :
                             <b></b>
                           }
                        </div>
                    </div>
                    <div className="user_account_bottom">
                        <IndexTabs opentab={this.props.match.params.id} showedit={() => this.showEdit(true)} />
                    </div>
                  </div>

                  <div>
                    <UploadVideoForm
                     openModal={this.state.showmodal}
                     closeModal={() => this.setShow(false)}
                     openModal2={this.state.showmodal2}
                     opensecondModal={() => this.setShow2(true)}
                     closeModal2={() => this.setShow2(false)}
                     />
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
                this.setState({
                    user: responseJSON['output'][0]['user'][0],
                    allsub : responseJSON['output'][0]['allsubscription']
                })
                console.log(responseJSON['output'][0]);
               
                //console.log( this.state.useremail);
            }).catch((error) =>{
                //console.log(error);
            })

       
    }


    fetchMyVideos(){
       
        let useremail = sessionStorage.getItem('userReg');
       fetch('/videostreaming/myvideos.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: useremail,

            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    isLoaded: true,
                    myvideos: responseJSON,
                })
               // console.log(responseJSON['output']);
                //console.log( this.state.useremail);
            }).catch((error) =>{
                //console.log(error);
            })

       
    }

    toggleLeftSidebar(){

        let isrightsidebar = this.state.isrightside;
        if (isrightsidebar == 'mobile_display') {
            this.setState({
                isrightside:'desktop_display'
            })
        }

        let isleftsidebar = this.state.isleftsidebar;
        if (isleftsidebar == 'desktop_display') {
            this.setState({
                isleftsidebar:'mobile_display'
            })
        }else{
            this.setState({
                isleftsidebar:'desktop_display'
            })
        }
    }

}
       


export default UserIndex;



