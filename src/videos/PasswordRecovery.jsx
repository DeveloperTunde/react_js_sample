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
            password2:'',
            email:'',
            pass:true,
            pass2:true,
            togglealert:false,
            alerttitle:'', alertcontent:'', alerttype:'',
            isValid:false,
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

togglePassword2() {
    let pass2 = this.state.pass2;
    this.setState({
        pass2: !pass2
    })
}

async saveItem(item, data) {
    try {
        await sessionStorage.setItem(item, data)
    } catch (error) {
        console.log(error);
    }
}


checkParams(){
    fetch('/videostreaming/checkrecoveryparam.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: this.props.match.params.email,
            recovery: this.props.match.params.recovery,
      })
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON['output'][0]['success'] == 'true') {
               this.setState({
                   isValid:true
               })
            }
        console.log(responseJSON);
        }).catch((error) =>{
            console.log(error);
        })
}

loginUser() {
        if(this.state.password != ''){
                if(this.state.password2 != ''){    
                    if (this.state.password != this.state.password2) {
                        this.setShow(true);
                         this.setState({
                          alerttitle:'Form Error!', alertcontent:'The two passwords do not match', alerttype:'danger'
                         })
                   }
                else {
                fetch('/videostreaming/resetpassword.php', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
            
                    },
                    body: JSON.stringify({
                        password: this.state.password,
                        email:this.props.match.params.email
                    })
                })
            
                    .then((response) => response.json())
                    .then((responseJSON) => {
            
                    console.log(responseJSON);
                    let responsestatus = responseJSON['output'][0]['success'];

                    this.setShow(true);
                           
                    if (responsestatus == 'true') {
                       window.location='/login'
                    }else{
                     this.setState({
                           alerttitle:'Sorry!', alertcontent:'Unable to change your password at the moment', alerttype:'warning'
                     })
                     }
                       
                    }).catch((error) => {
                       console.log(error);  
                    
                    })
            
                 }
            }else {
                this.setShow(true);
                this.setState({
                    alerttitle:'Form Error!', alertcontent:'Please fill the second password box', alerttype:'danger'
                })
            }
            }else {
                 this.setShow(true);
                 this.setState({
                    alerttitle:'Form Error!', alertcontent:'Please fill the first password box', alerttype:'danger'
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
  this.checkParams();
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
                            <span>Change Password</span>
                        </div>

                        {(this.state.isValid)? 
                        <div style={{float:'left', width:'100%'}}>
                        <div className="form_group_lg form_group_input">
                            <input 
                             type={(this.state.pass) ? 'password' : 'text'} 
                             name="password"
                             placeholder="Password" 
                             value={this.state.password} 
                             onChange={this.handleInput.bind(this)}/>
                            <i>{(this.state.pass) ? <FaEye onClick={() => this.togglePassword(true)} /> : <FaEyeSlash onClick={() => this.togglePassword(false)} />} </i>
                        </div>

                        <div className="form_group_lg form_group_input">
                            <input 
                             type={(this.state.pass2) ? 'password' : 'text'} 
                             name="password2"
                             placeholder="Confirm Password" 
                             value={this.state.password2} 
                             onChange={this.handleInput.bind(this)}/>
                            <i>{(this.state.pass2) ? <FaEye onClick={() => this.togglePassword2(true)} /> : <FaEyeSlash onClick={() => this.togglePassword2(false)} />} </i>
                        </div>
                      
                        <div className="primaryButton form_group_lg reg_submit_btn" onClick={() =>this.loginUser() }>
                               <span>Change</span>
                        </div>
                        </div>: 
                        <div style={{float:'left', width:'100%', textAlign:'center', color:'red'}}>
                            <span>Sorry, incorrect recovery parameters</span>
                        </div>}
                        <div className="login_footer">
                            <div className="login_footer_reglink">
                               <span>Already have an account?</span>
                               <span><Link className="secondaryColor" to={'/login'}>Login</Link></span>
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
