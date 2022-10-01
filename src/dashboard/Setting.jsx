import React, { Component, useState } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../assets/css/videos.css'
import '../assets/css/styles.css'
import '../assets/css/user.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaSquare,FaShareAlt, FaPencilAlt } from 'react-icons/fa'
import Thumbnailbg from './../assets/images/bgthumbnail.png'
import User from './../assets/images/user.png'
import IndexTabs from './components/IndexTabs'
import UploadVideoForm from './components/UploadVideoForm'
import AlertComponent from './../reuseables/Alert'



class UserIndex extends Component {
   
     constructor(){
        super();
        this.state={
            showmodal: false,
            showmodal2: false,
            isLoggedin: false,
            useremail: '',
            myvideos:[],
            allsub:0,
            user:[],
            userfirstname:'',
            userlastname:'',
            file:'',
            uploadFile:'',
            togglealert:false,
            alerttitle:'', alertcontent:'', alerttype:'',
            isrightside:'desktop_display',
            isleftsidebar:'desktop_display'
        }
     }



  setShow = (e) =>{
    this.setState({
        showmodal:e
    })
  }

  setShow2 = (e) =>{
    this.setState({
        showmodal2:e,
        showmodal:false
    })
  }

  checkLogin = () =>{
    let useremail = sessionStorage.getItem('userReg');
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
        // console.log(responseJSON);
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


handleInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  async setUploadFile(e){
    this.setState({
      uploadFile:e[0]
    })
    let file = e[0];
    this.setState({
        file: URL.createObjectURL(e[0])
      })
  
  }
  showAlert(e){
    this.setState({
        togglealert: e
    })
 }
  submitUpdate =() =>{

    const formData = new FormData();
    if (this.state.uploadFile !='' ) {
        formData.append("profilepicture", this.state.uploadFile);
    }
    formData.append("firstname", this.state.userfirstname);
    formData.append("lastname", this.state.userlastname);
    formData.append("useremail", this.state.useremail);

    this.showAlert(true);
      this.setState({
        alerttitle:'Saving', alertcontent:'Please wait...', alerttype:'success'
     })
    fetch('/videostreaming/updateuserprofile.php',
        {
            method: 'POST',                   
            body: formData,
            headers: {
                Accept: 'application/json',
              },
        }
    ).then((response) => response.json())
    .then((responseJSON) => {
        if (responseJSON['output'][0]['status'] =='true') {
            this.setState({
                alerttitle:'Success!', alertcontent:'saved successfully', alerttype:'success'
             }) 
        }
    console.log(responseJSON);

  
    setTimeout(() => {
      this.showAlert(false);
    }, 4000);
  
    }).catch((error) => {
       console.log(error);  
    
    })
  }
    render() {
       const {user}  = this.state;
       const {togglealert, alertcontent, alerttype, alerttitle} = this.state;  
        return (
            <div className="body">
                <Sidebar leftsidebar={this.state.isleftsidebar}  closeLeftSidebar={() => this.toggleLeftSidebar()}/>
                <div className="content">
                <Header openLeftSidebar={() => this.toggleLeftSidebar()} />
                <div className="page_container">
                {(this.state.togglealert == true) ? 
                  <div className="uploadalert">
                    <AlertComponent 
                      title={alerttitle}
                      showalert={togglealert} 
                      content={alertcontent}
                      type={alerttype}
                      closealert={() => this.showAlert(false)}/>
                  </div> : <div></div>} 
                  <div className="user_wrapper">
                    <div className="user_account_top">
                        <div className="user_account_top_left">
                            <div className="user_account_top_left_a">
                               {(this.state.file !='')?  <img src={this.state.file} alt="Profile Picture" /> :  <img src={user.profilepic} alt="Profile Picture" />}
                            </div>
                            <div className="user_account_top_left_b">
                                <span>{user.userfirstname} {user.userlastname}</span>
                                <span className="limeColor" onClick={() => this.inputElement.click()}>Change profile picture </span>
                                <input type="file" accept="image/*"
                                  hidden={true}
                                  ref={input => this.inputElement = input}
                                  onChange={(e) => this.setUploadFile(e.target.files)} 
                                  />
                            </div>
                        </div>
                        <div className="user_account_top_right2">
                            <span className="primaryButton save_bbn" onClick={() => this.submitUpdate()}> Save</span>
                        </div>
                    </div>
                    <div className="user_account_bottom2">

                       <div className="form_group">
                          <label>Email</label>
                          <input type="text"  
                                name="useremail"
                                value={this.state.useremail} 
                                onChange={this.handleInput.bind(this)}
                                maxLength={30}
                                className="border_light grey_background"
                                readOnly={true}
                                disabled={true}/>
                        </div>
                        <div className="form_group">
                          <label>Firstname </label>
                          <input type="text"  
                                name="userfirstname"
                                value={this.state.userfirstname} 
                                onChange={this.handleInput.bind(this)}
                                maxLength={30}
                                className="border_light"/>
                        </div>

                        <div className="form_group">
                          <label>Lastname </label>
                          <input type="text"  
                                name="userlastname"
                                value={this.state.userlastname} 
                                onChange={this.handleInput.bind(this)}
                                maxLength={30}
                                className="border_light"/>
                        </div>

                     
                          
                         
                          
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
                    allsub : responseJSON['output'][0]['allsubscription'],
                    userfirstname: responseJSON['output'][0]['user'][0].userfirstname,
                    userlastname: responseJSON['output'][0]['user'][0].userlastname
                })
                //console.log(responseJSON['output'][0]);
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
                // console.log(responseJSON['output'][0]);
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



