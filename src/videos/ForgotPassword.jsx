import React, { Component, useState } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import '../assets/css/videos.css'
import '../assets/css/styles.css'
import '../assets/css/user.css'
import '../assets/css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShare, FaEye, FaEyeSlash } from 'react-icons/fa'
import Thumbnaila from '../assets/images/thumbnaila.png'
import { uid, suid } from 'rand-token';
import AlertComponent from '../reuseables/Alert'
import Header from '../components/LoginHeader';



class UserIndex extends Component {
   
     constructor(){
        super();
        this.state={
            user: '',
            password:'',
            email:'',
            pass:true,
            togglealert:false,
            alerttitle:'', alertcontent:'', alerttype:'',
            isleftsidebar:'desktop_display'
        }
     }


setShow(e){
 let alertstate = this.state.togglealert;
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
        

sendRecoveryEmail() {
        if(this.state.email != ''){      
                        fetch('/videostreaming/forgotpassword.php', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                    
                            },
                            body: JSON.stringify({
                                useremail: this.state.email,
                    
                            })
                        })
                    
                            .then((response) => response.json())
                            .then((responseJSON) => {
                    
                            
                            let responsestatus = responseJSON['output'][0]['status'];
                            let responsemessage = responseJSON['output'][0]['message'];

                            this.setShow(true);
                                   

                            if (responsestatus == 'true') {
                            this.setState({
                                 alerttitle:'Success!', alertcontent:`${responsemessage}`, alerttype:'success'
                             })
                            }else{
                             this.setState({
                                   alerttitle:'Sorry!', alertcontent:`${responsemessage}`, alerttype:'warning'
                             })
                             console.log(responseJSON['output'][0]['status']);
                             }
                               
                            }).catch((error) => {
                               console.log(error);  
                            
                            })
                    
              
            }else {
                 this.setShow(true);
                 this.setState({
                    alerttitle:'Form Error!', alertcontent:'Please fill the email box', alerttype:'danger'
                 })
             }
       

}

getUset(){
    this.setState({
        user:localStorage.getItem('userReg')
    })
}
componentDidMount(){
  this.getUset();
}

    render() {
        const {togglealert, alertcontent, alerttype, alerttitle} = this.state;
        return (
            <div className="body">
                <Sidebar leftsidebar={this.state.isleftsidebar}  closeLeftSidebar={() => this.toggleLeftSidebar()}/>
                <div className="content">
                <Header openLeftSidebar={() => this.toggleLeftSidebar()} />
                {(this.state.togglealert) ? 
                  <div className="loginalert">
                      <AlertComponent 
                      title={alerttitle}
                      showalert={togglealert} 
                      content={alertcontent} 
                      type={alerttype}
                      closealert={() => this.setShow(false)}/>
                  </div> : <div></div>}
                <div className="page_container">
                
                     <div className="user_form_wrapper">
                        <div className="login_title">
                            <span>Login</span>
                        </div>
                        <div className="form_group_lg form_group_input">
                            <input type="text" 
                             name="email"
                             placeholder="Email" 
                             value={this.state.email} 
                             onChange={this.handleInput.bind(this)}/>
                        </div>
                       
                      
                        <div className="primaryButton form_group_lg reg_submit_btn" onClick={() =>this.sendRecoveryEmail() }>
                               <span>Login</span>
                        </div>
                        <div className="login_footer">
                            <span>Don’t have an account?</span>
                            <span><Link className="secondaryColor" to={'/register'}>Register</Link></span>
                        </div>
                     </div>
                </div>
                </div>
            </div>
        );
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
