import React, { Component, useState } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import '../assets/css/videos.css'
import '../assets/css/styles.css'
import '../assets/css/user.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShare, FaEye, FaEyeSlash } from 'react-icons/fa'
import Thumbnaila from '../assets/images/thumbnaila.png'
import { uid, suid } from 'rand-token';
import Alert from 'react-bootstrap/Alert'
import AlertComponent from '../reuseables/Alert'
import Header from '../components/LoginHeader';




class UserIndex extends Component {
    constructor() {
        super();
        this.state = {
            pass1: true,
            pass2: true,
            token: true,
            firstname: '',
            lastname: '',
            email: '',
            password1: '',
            password2: '',
            hasToken: true,
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

    togglePassword1() {
        (this.state.pass1) ? this.setState({ pass1: false }) : this.setState({ pass1: true })
    }

    togglePassword2() {
        (this.state.pass2) ? this.setState({ pass2: false }) : this.setState({ pass2: true })
    }


    async saveItem(item, data) {
        try {
            await localStorage.setItem(item, data)
        } catch (error) {
            console.log(error);
        }
    }

    submitRegistration() {

        if (this.state.firstname != '') {
            if(this.state.lastname != ''){
                if(this.state.email != ''){
                    let email = this.state.email;
                    let validemail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                    if (validemail) {
                        if(this.state.password1 != ''){
                            if (this.state.password1 != this.state.password2) {
                                alert('The two passwords do not match');
                            } else {
                            
                                const token = suid(20);
                            
                                this.saveItem('token', token);
                                fetch('/videostreaming/rest/create_user.php', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': `token ${token}`
                            
                                    },
                                    body: JSON.stringify({
                            
                                        fname: this.state.firstname,
                                        lname: this.state.lastname,
                                        email: this.state.email,
                                        password: this.state.password1
                            
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
                                       }else{
                                        this.setState({
                                            alerttitle:'Sorry!', alertcontent:`${responsemessage}`, alerttype:'warning'
                                         })
                                       }
                                       
                                       
                            
                                    }).catch((error) => {
                                       console.log(error);  
                                      
    
                                    })
                            }
                        }else {
                         this.setShow(true);
                         this.setState({
                             alerttitle:'Form Error!', alertcontent:'Please fill the password box', alerttype:'danger'
                         })
                     }
                    }else{
                        this.setShow(true);
                         this.setState({
                             alerttitle:'Form Error!', alertcontent:'Please use a valid email', alerttype:'danger'
                         })
                    }
                
                }else {
                     this.setShow(true);
                     this.setState({
                        alerttitle:'Form Error!', alertcontent:'Please fill the email box', alerttype:'danger'
                     })
                 }
            }else {
                this.setShow(true);
                this.setState({
                    alerttitle:'Form Error!', alertcontent:'Please fill the last name box', alerttype:'danger'
                })
            }
        } else {
             this.setShow(true);
             this.setState({
                  alerttitle:'Form Error!', alertcontent:'Please fill the first name box', alerttype:'danger'
             })
        }

    }



    render() {
        if (!this.state.hasToken) {
            window.location = `/login`

        }
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
                  </div>: <div></div>}
                <div className="page_container">
                     <div className="user_form_wrapper">
                      <div className="login_title">
                            <span>Sign Up</span>
                        </div>
                       <div className="form_group_lg form_group_input">
                            <input type="text" 
                              name="firstname"
                              placeholder="First Name" 
                              value={this.state.firstname} 
                              onChange={this.handleInput.bind(this)}/>
                        </div>
                        <div className="form_group_lg form_group_input">
                            <input type="text" 
                               name="lastname"
                               placeholder="Last Name"  
                               value={this.state.lastname} 
                               onChange={this.handleInput.bind(this)}/>
                        </div>

                        <div className="form_group_lg form_group_input">
                            <input type="text" 
                                name="email"
                                placeholder="Email" 
                                value={this.state.email} 
                                onChange={this.handleInput.bind(this)}/>
                        </div>

                        {/* <div className="form_group_lg form_group_input">
                            <select
                             name="country"
                             onChange={this.handleInput.bind(this)}
                             value={this.state.country}
                             >
                                <option value="nil">Select Country</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Cameroon">Cameroon</option>
                            </select>
                        </div> */}
                        
                        <div className="form_group_sm_l form_group_input">
                            <input  
                                type={(this.state.pass1) ? 'password' : 'text'} 
                                name="password1"
                                placeholder="Password" 
                                value={this.state.password1} 
                                onChange={this.handleInput.bind(this)}/>
                            <i>{(this.state.pass1) ? <FaEye onClick={() => this.togglePassword1()} /> : <FaEyeSlash onClick={() => this.togglePassword1()} />} </i>
                        </div>
                        <div className="form_group_sm_r form_group_input">
                            <input
                                name="password2"
                                type={(this.state.pass2) ? 'password' : 'text'} 
                                placeholder="Confirm Password" 
                                value={this.state.password2} 
                                onChange={this.handleInput.bind(this)}/>
                            <i>{(this.state.pass2) ? <FaEye onClick={() => this.togglePassword2()} /> : <FaEyeSlash onClick={() => this.togglePassword2()} />} </i>
                        </div>
                        <div className="primaryButton form_group_lg reg_submit_btn" onClick={() => this.submitRegistration()}>
                               <span>Sign Up</span>
                        </div>

                        <div className="login_footer">
                            <span>Already have an account?</span>
                            <span><Link className="secondaryColor" to={'/login'}>Login</Link></span>
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
