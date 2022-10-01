import React, { Component, useState } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from '../components/Header';
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



class Login extends Component {
   
     constructor(){
        super();
        this.state={
            user: '',
            password:'',
            email:'',
            pass:true,
            togglealert:false,
            alerttitle:'', alertcontent:'', alerttype:''
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

adminLogin() {
        if(this.state.email != ''){
                if(this.state.password1 != ''){        
                        fetch('/videostreaming/adminlogin.php', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',                    
                            },
                            body: JSON.stringify({
                                email: this.state.email,
                                password: this.state.password
                    
                            })
                        })
                    
                            .then((response) => response.json())
                            .then((responseJSON) => {
                    
                            console.log(responseJSON);
                            let responsestatus = responseJSON["output"][0]['status'];

                            this.setShow(true);
                                   
                            console.log(responsestatus);
                            if (responsestatus == 'true') {
                            this.saveItem('ValidateAdmin', this.state.email);
                            this.setState({
                                 hasToken: true
                             }) 
                            this.setState({
                                 alerttitle:'Success!', alertcontent:'Login success', alerttype:'success'
                             })
                             window.location='/admin/'
                            }else{
                             this.setState({
                                   alerttitle:'Sorry!', alertcontent:'Incorrect Password/Email', alerttype:'warning'
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
               
                <div className="content-login">
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
                            <span>Admin Login</span>
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
                      
                        <div className="primaryButton form_group_lg reg_submit_btn" onClick={() =>this.adminLogin() }>
                               <span>Login</span>
                        </div>
                        
                     </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Login;
