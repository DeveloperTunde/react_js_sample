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
        
togglePassword() {
    let pass = this.state.pass;
    this.setState({
        pass: !pass
    })
}

async saveItem(item, data) {
    try {
        await sessionStorage.setItem(item, data)
    } catch (error) {
        console.log(error);
    }
}

loginUser() {
        if(this.state.email != ''){
                if(this.state.password1 != ''){        
                        const token = suid(20);
                    
                        this.saveItem('token', token);
                        fetch('/videostreaming/rest/login.php', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `token ${token}`
                    
                            },
                            body: JSON.stringify({
                                email: this.state.email,
                                password: this.state.password
                    
                            })
                        })
                    
                            .then((response) => response.json())
                            .then((responseJSON) => {
                    
                            console.log(responseJSON);
                            let responsestatus = responseJSON['status'];
                            let responsemessage = responseJSON['message'];

                            this.setShow(true);
                                   

                            if (responsestatus === 1) {
                            this.saveItem('userReg', this.state.email);
                            this.setState({
                                 hasToken: true
                             }) 
                            this.setState({
                                 alerttitle:'Success!', alertcontent:`${responsemessage}`, alerttype:'success'
                             })
                             window.location='/user/1'
                            }else{
                             this.setState({
                                   alerttitle:'Sorry!', alertcontent:`${responsemessage}`, alerttype:'warning'
                             })
                             }
                               
                            }).catch((error) => {
                               console.log(error);  
                            
                            })
                    
                }else {
                 this.setShow(true);
                 this.setState({
                     alerttitle:'Form Error!', alertcontent:'Please fill the password box', alerttype:'danger'
                 })
             }
            }else {
                 this.setShow(true);
                 this.setState({
                    alerttitle:'Form Error!', alertcontent:'Please fill the email box', alerttype:'danger'
                 })
             }
       

}

getUset(){
    this.setState({
        user:sessionStorage.getItem('userReg')
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
                        <div className="form_group_lg form_group_input">
                            <input 
                             type={(this.state.pass) ? 'password' : 'text'} 
                             name="password"
                             placeholder="Password" 
                             value={this.state.password} 
                             onChange={this.handleInput.bind(this)}/>
                            <i>{(this.state.pass) ? <FaEye onClick={() => this.togglePassword(true)} /> : <FaEyeSlash onClick={() => this.togglePassword(false)} />} </i>
                        </div>
                      
                        <div className="primaryButton form_group_lg reg_submit_btn" onClick={() =>this.loginUser() }>
                               <span>Login</span>
                        </div>
                        <div className="login_footer">
                            <div className="login_footer_reglink">
                               <span>Don’t have an account?</span>
                               <span><Link className="secondaryColor" to={'/register'}>Register</Link></span>
                            </div>
                            <div className="forgotpass">
                               <span><Link className="secondaryColor" to={'/forgotpassword'}>Forgot Password?</Link></span>
                            </div>
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
