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
           videouploader:'',
           videotitle:'',
           videocategory: '',
           crop:  '',
           channel:  '',
           videoshortdescription:'',
           videofulldescription:'',
           tags:'',
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


 




submitEdit =() =>{

 const formData = new FormData();
 
 if (this.state.videouploader != null) {
     if (this.state.videotitle !='') {
        if (this.state.videoshortdescription !='') {
           if (this.state.videofulldescription !='') {
             formData.append("videotitle", this.state.videotitle);
             formData.append("videocategory", this.state.videocategory);
             formData.append("channel", this.state.channel);
             formData.append("crop", this.state.crop);
             formData.append("videoshortdescription", this.state.videoshortdescription);
             formData.append("videofulldescription", this.state.videofulldescription);
             formData.append("tags", this.state.tags);
             formData.append("videouploader", this.state.videouploader);

              //<img src={Gif} className="alertloader"/>
             const Mylabel = <p>Please wait...</p>;
             this.showAlert(true);
               this.setState({
                 alerttitle:'Uploading', alertcontent:Mylabel, alerttype:'success'
              })
             fetch('/videostreaming/editvideo.php',
                 {
                     method: 'POST',                   
                     body: formData,
                     headers: {
                         Accept: 'application/json',
                       },
                 }
             ).then((response) => response.json())
             .then((responseJSON) => {
                let status = responseJSON['output'][0]['status'];

                if (status == 'true') {
                    this.setState({
                        alerttitle:'Success!', alertcontent:'The video has been edited successfully', alerttype:'success'
                     })
                }
        
                console.log(responseJSON);
           
             setTimeout(() => {
               this.showAlert(false);
             }, 4000);
           
             }).catch((error) => {
                console.log(error);  
             
             })

           }else{
             this.showAlert(true);
             this.setState({
               alerttitle:'Error', alertcontent: 'Please fill the video full description box', alerttype:'warning'
             })
             setTimeout(() => {
              this.showAlert(false);
            }, 4000);
           }
        }else{
         this.showAlert(true);
         this.setState({
           alerttitle:'Error', alertcontent: 'Please fill the video short description box', alerttype:'warning'
         })
         setTimeout(() => {
          this.showAlert(false);
        }, 4000);
        }
     }else{
       this.showAlert(true);
       this.setState({
         alerttitle:'Error', alertcontent: 'Please fill the video title box', alerttype:'warning'
       })

       setTimeout(() => {
        this.showAlert(false);
      }, 4000);
     }
 }else{
   this.showAlert(true);
   this.setState({
     alerttitle:'Error', alertcontent: 'Please login before you can upload video', alerttype:'warning'
   })
   setTimeout(() => {
    this.showAlert(false);
  }, 4000);
 }
 


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
     videouploader:useremail
 })
 }

 componentDidMount(){
     this.getUserEmail();  
     this.getChannels();
     this.getVideo();
          
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
                    
                  <div className="file_form_wrapper3">
                           <div className="form_group">
                                <label>Video Title [30 characters max]<s style={{color:'tomato'}}>*</s></label>
                                <input type="text"  
                                       name="videotitle"
                                       value={this.state.videotitle} 
                                       onChange={this.handleInput.bind(this)}
                                       maxLength={30}/>
                           </div>
                          
                           <div className="form_group form_group2">
                                <label>Category</label>
                                <select name="videocategory"
                                        value={this.state.videocategory} 
                                        onChange={this.handleInput.bind(this)}>
                                   <option value="nil">No Category</option>
                                   <option value="Youth in Agribusiness">Youth in Agribusiness</option>
                                   <option value="Climate change">Climate change</option>
                                   <option value="Crop production">Crop production</option>
                                   <option value="Plant health">Plant health</option>
                                   <option value="Biotechnology">Biotechnology</option>
                                </select>
                           </div>

                           <div className="form_group form_group2">
                                <label>Crop Type</label>
                                <select name="crop"
                                        value={this.state.crop} 
                                        onChange={this.handleInput.bind(this)}>
                                   <option value="nil">Select Crop Type</option>
                                   <option value="maize">Maize</option>
                                   <option value="cassava">Cassava</option>
                                </select>
                           </div>
                          
                            <div className="form_group form_group2">
                                <label>Upload To A Channel </label>
                                <select name="channel"
                                        value={this.state.channel} 
                                        onChange={this.handleInput.bind(this)}>
                                          {(this.state.ischannelAvailable == false)?'':
                                        <option value="nil">No Channel</option>}
                                        {
                                        (this.state.ischannelAvailable == false)? 
                                        <option value="nil">No Channel [You have not created any channel]</option>
                                          :
                                          
                                          mychannels.map((channel, i)=>{
                                            return <option value={channel.id} key={i}>{channel.name}</option>
                                          })
                                      }
                                </select>
                           </div>


                           <div className="form_group form_group2">
                                <label>Video Short Details [64 characters max]<s style={{color:'tomato'}}>*</s></label>
                                <textarea name="videoshortdescription"
                                          value={this.state.videoshortdescription} 
                                          onChange={this.handleInput.bind(this)}
                                          maxLength={64}></textarea>
                           </div>

                           <div className="form_group ">
                                <label>Video Full Details<s style={{color:'tomato'}}>*</s></label>
                                <textarea name="videofulldescription"
                                          value={this.state.videofulldescription} 
                                          onChange={this.handleInput.bind(this)}></textarea>
                           </div>

                           <div className="form_group ">
                                <label>Video Tags [Separated by comma]</label>
                                <textarea name="tags"
                                          value={this.state.tags} 
                                          onChange={this.handleInput.bind(this)}></textarea>
                           </div>


                        
                           <div className="primaryButton form_group upload_video_btn" onClick={() =>this.submitEdit()}>
                               <span>Save</span>
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


    getVideo(){
        let videoid =  localStorage.getItem('editing');
      
        fetch('/videostreaming/singlevideo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                vidid: this.props.match.params.id,
            })
        })
    
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    thisvideo: responseJSON['output'][0]['data'][0],
                    videotitle: responseJSON['output'][0]['data'][0].videotitle,
                    videocategory: responseJSON['output'][0]['data'][0].VideoCategory,
                    videoshortdescription: responseJSON['output'][0]['data'][0].videodescription,
                    videofulldescription: responseJSON['output'][0]['data'][0].videofulldescription,
                    channel: responseJSON['output'][0]['data'][0].videochannel,
                    crop: responseJSON['output'][0]['data'][0].videocrop,
                    videotitle: responseJSON['output'][0]['data'][0].videotitle,
                    videouploader:this.props.match.params.id,
                    isloaded:true
                })
                //console.log(responseJSON['output'][0]['data'][0]);
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



