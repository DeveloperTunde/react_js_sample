import React, { Component, useState } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../assets/css/videos.css'
import '../assets/css/styles.css'
import '../assets/css/user.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPlus } from 'react-icons/fa';
import CreateChannelForm from '../components/CreateChannelForm'
import AlertComponent from '../reuseables/Alert'


class UserIndex extends Component {
   
   constructor(){
      super();
      this.state={
          showmodal: false,
          showmodal2: false,
          isLoggedin: false,
          useremail: '',
          myvideos:[],
          allchannel:[],
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

showAlert(e){
   this.setState({
       togglealert: e
   })
}

openChannel = () => {
    if (sessionStorage.getItem('userReg') != null) {
        this.setShow(true)
    }else{
        this.showAlert(true);
        this.setState({
            alerttitle:'Not Logged in!', alertcontent:'You have to login before you can create a channel', alerttype:'warning'
         })
    }
   
}

componentDidMount(){
   this.getAllChannel();
}
    render() {
       const {allchannel} = this.state;
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
                  {
                (this.state.channelNotLogin)? 
                   <div className="generalalert">
                   <AlertComponent 
                     title={alerttitle}
                     showalert={togglealert} 
                     content={alertcontent}
                     type={alerttype}
                     closealert={() => this.showAlert(false)}/>
                   </div>
                    :""
                  }
                  <div className="user_wrapper">
                   
             <div className="channels_top2">
                <span>Subscribed Channels</span>
                <span className="primaryButton" onClick={() => this.openChannel()}> <FaPlus className="icon" /> Create Channel</span>
             </div>

             <div className="channels_bottom">

            {
                (sessionStorage.getItem('userReg') == null)? <center><p className="placeholdertext2">You are not logged in</p></center> : 
               allchannel.map((channel, i) =>{
                 return <div className="channel_box" key={i}>
                    <div className="channel_box_all channel_box_a">
                      <img src={channel.logo} />
                    </div>
                    <div className="channel_box_all channel_box_b">
                    <Link  to={`/channel_video/${channel.id}`} className="link"><span>{channel.name}</span></Link>
                    </div>
                    <div className="channel_box_all channel_box_c">
                       <span>{channel.subscribers} Subscribers</span>
                    </div>
                    {
                       (channel.substatus =='yes')? 
                       <div className="channel_box_all channel_box_d" onClick={() => this.channelUnsubscription(channel.id)}>
                          <span className="primaryButton">Unsubscribe </span>
                       </div>
                       :
                       <div className="channel_box_all channel_box_d" onClick={() => this.channelSubscription(channel.id)}>
                          <span className="primaryButton">Subscribe </span>
                       </div>
                    }
                    
                </div>
                
               })
            }
                
              
                
             </div>
                  </div>
         
                <div>
                <CreateChannelForm
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

    getAllChannel(){
      let useremail = sessionStorage.getItem('userReg');
      fetch('/videostreaming/subscribedchannels.php', {
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
              if (responseJSON['output'][0]['success'] = true) {
                  this.setState({
                      allchannel: responseJSON['output'][0]['data']
                  })
              }
        // console.log(responseJSON);
          }).catch((error) =>{
             // console.log(error);
          })
  }

  channelSubscription = (e) => {
   let useremail = localStorage.getItem('userReg');
    fetch('/videostreaming/channelsubscription.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            useremail: useremail,
            channelid: e
        })
    })

        .then((response) => response.json())
        .then((responseJSON) => {
         this.showAlert(true);
         let response = responseJSON['output'][0]['data'];
         if (response == 'success') {
            this.setState({
               alerttitle:'Success!', alertcontent:'You have successfully suscribed to the channel', alerttype:'success'
            })
         }else if(response == 'failed'){
            this.setState({
               alerttitle:'Failed!', alertcontent:'Unable to process your request at the moment. Try again later', alerttype:'warning'
            })
         }else{
            this.setState({
               alerttitle:'Failed!', alertcontent:'Sorry. An error occur while trying to process the request', alerttype:'warning'
            })
         }
         

      //   setTimeout(() => {
      //    this.showAlert(false);
      //  }, 4000);

       setTimeout(() => {
         window.location.reload();
       }, 2000);

       
         // console.log(responseJSON);
        })
}


channelUnsubscription = (e) => {
   let useremail = localStorage.getItem('userReg');
    fetch('/videostreaming/channelunsubscription.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            useremail: useremail,
            channelid: e
        })
    })

        .then((response) => response.json())
        .then((responseJSON) => {
         this.showAlert(true);
         let response = responseJSON['output'][0]['data'];
         if (response == 'success') {
            this.setState({
               alerttitle:'Success!', alertcontent:'You have successfully unsuscribed from the channel', alerttype:'success'
            })
         }

       setTimeout(() => {
         window.location.reload();
       }, 2000);

       
         // console.log(responseJSON);
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
