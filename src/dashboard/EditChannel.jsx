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
import Gif from '../assets/images/mygif.gif'


class EditVideo extends Component {
    constructor(props){
       super(props);
       this.state={
           showmodal: false,
           showedit: false,
           thisvideo:[],
           showmodal: false,
           channellogo:'',
           channelbanner2:'',
           loggeduser:'',
           channelname:'',
           togglealert:false,
           alerttitle:'', alertcontent:'', alerttype:'',
           ischannelAvailable: false,
           mychannels:[],
           isloaded:false,
           isrightside:'desktop_display',
           isleftsidebar:'desktop_display',
       }

       
    }

 showAlert(e){
     this.setState({
         togglealert: e
     })
  }
 
  
  handleInput(event) {
       const target = event.target;
       const value = target.value;
       const name = target.name;
       this.setState({
         [name]: value
       });
     }

      BannerUpload(inp){
        this.setState({
          channelbanner2:inp[0]
        })
        let file = inp[0];
        let filesize = file.size;
     
      }


      setUploadFile(e){
        this.setState({
          channellogo:e[0]
        })
        let file = e[0];
        let filesize = file.size;
    
    
        //console.log(file);
      
      }
    
      
 

     createChannel =() =>{

        const formData = new FormData();
      
        if (this.state.loggeduser != null) {
           if (this.state.channelname !='' ) {      
                  formData.append("channellogo", this.state.channellogo);
                  formData.append("channelbanner", this.state.channelbanner2);
                  formData.append("channelname", this.state.channelname);
                  formData.append("user", this.state.loggeduser);
                  formData.append("channelid", this.props.match.params.id);
      
      
                  fetch('/videostreaming/editchannel.php',
                  {
                      method: 'POST',                   
                      body: formData,
                      headers: {
                          Accept: 'application/json',
                        },
                  }
                  ).then((response) => response.text())
                  .then((responseJSON) => {
                  this.showAlert(true);
                  this.setState({
                    alerttitle:'Success!', alertcontent:`${responseJSON}`, alerttype:'success'
                  })
                  this.props.closeModal();
      
                  setTimeout(() => {
                    this.showAlert(false);
                  }, 4000);
      
      
                  }).catch((error) => {
                     console.log(error);  
      
                  })
      
              
           }else{
            this.showAlert(true);
            this.setState({
              alerttitle:'Error', alertcontent: 'Please fill the channel name box', alerttype:'warning'
            })
           }
        }else{
          this.showAlert(true);
          this.setState({
            alerttitle:'Error', alertcontent: 'Please login before you can create a channel', alerttype:'warning'
          })
      
          
        }
        setTimeout(() => {
          this.showAlert(false);
        }, 4000);
      
      }




getChannels(){
 let useremail =  sessionStorage.getItem('userReg');
   fetch('/videostreaming/mychannels.php', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            useremail: useremail
         })
     })
 
     .then((response) => response.json())
     .then((responseJSON) => {
         if (responseJSON['output'][0]['success'] == 'true') {
             this.setState({
                  ischannelAvailable: true,
                  mychannels: responseJSON['output'][0]['data']
             })
          }
         // console.log(responseJSON['output']);
         }).catch((error) =>{
            // console.log(error);
         })
 
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
  
 getUserEmail = () =>{
 let useremail =  sessionStorage.getItem('userReg');
 this.setState({
    loggeduser:useremail
 })
 }

 componentDidMount(){
     this.getUserEmail();  
     this.getChannels();
     this.getChannel();
          
 }
    render() {
       const {user}  = this.state;
       const {togglealert, alertcontent, alerttype, alerttitle, mychannels} = this.state;  
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
                    
                  <div className="file_form_wrapper_a" style={{paddingTop:'2vh'}}>
                        <div className="login_title">
                            <span>Edit Channel</span>
                        </div>
                        <div className="form_group">
                                <label>Channel Name [18 characters max]<s style={{color:'tomato'}}>*</s></label>
                                <input type="text"  
                                       name="channelname"
                                       value={this.state.channelname} 
                                       onChange={this.handleInput.bind(this)}
                                       maxLength={18}/>
                           </div>
                           <input type="file" accept="image/*"
                                  hidden={true}
                                  ref={input => this.inputElement = input}
                                  onChange={(e) => this.setUploadFile(e.target.files)} 
                                  />
                           <div className='file_b_a' >
                               <span>Click here to change channel logo<s style={{color:'tomato'}}>*</s></span>
                           </div>
                           <div className='file_c_a'>
                               <span className="tertiaryButton" onClick={() => this.inputElement.click()}>Change Logo</span>
                               <span>{this.state.channellogo.name}</span>
                           </div>

                           <input type="file" accept="image/*"
                                  hidden={true}
                                  ref={input => this.bannerElement = input}
                                  onChange={(e) => this.BannerUpload(e.target.files)} 
                                  
                                  />
                           <div className='file_b_a' >
                               <span >Click here to select change banner <s style={{color:'tomato'}}>*</s></span>
                           </div>
                           <div className='file_c_a' >
                               <span className="tertiaryButton" onClick={() => this.bannerElement.click()}>Change Banner</span>
                               <span>{this.state.channelbanner2.name}</span>
                           </div>


                          
                           <div className="primaryButton form_group upload_video_btn" style={{textAlign:'center', marginTop:'4vh'}} onClick={() =>this.createChannel()}>
                               <span >Save Edit</span>
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


    getChannel(){
        let videoid =  localStorage.getItem('editing');
      
        fetch('/videostreaming/singlechannel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channelid: this.props.match.params.id,
            })
        })
    
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    channelid: responseJSON['output'][0]['data'][0].id,
                    channelname: responseJSON['output'][0]['data'][0].name,
                    channelowner: responseJSON['output'][0]['data'][0].owner,
                    isloaded:true
                })
                // console.log(responseJSON['output'][0]['data'][0]);
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
       


export default EditVideo;



