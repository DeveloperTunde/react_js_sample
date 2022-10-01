import React, { Component, useState } from 'react';
import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import '../assets/css/videos.css'
import '../assets/css/styles.css'
import '../assets/css/user.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaSquare,FaShareAlt } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal'
import Upload from '../assets/images/upload.png'
import AlertComponent from '../reuseables/Alert'
import Gif from '../assets/images/mygif.gif'


class UploadVideoForm extends Component {
     constructor(){
        super();
        this.state={
            showmodal: false,
            uploadFile:'',
            uploadBanner:'',
            loggeduser:'',
            channelname:'',
            togglealert:false,
            alerttitle:'', alertcontent:'', alerttype:''

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

  async setUploadFile(e){
    this.setState({
      uploadFile:e[0]
    })
    let file = e[0];
    let filesize = file.size;


    //console.log(file);
  
  }

  async setUploadFile2(e){
    this.setState({
      uploadBanner:e[0]
    })
    let file = e[0];
    let filesize = file.size;
 
  }
  



createChannel =() =>{

  const formData = new FormData();

  if (this.state.loggeduser != null) {
     if (this.state.channelname !='' ) {
        if (this.state.uploadFile != '') {
           if (this.state.uploadBanner !='') {

            formData.append("channellogo", this.state.uploadFile);
            formData.append("channelbanner", this.state.uploadBanner);
            formData.append("channelname", this.state.channelname);
            formData.append("user", this.state.loggeduser);

            ///videostreaming/createchannel.php
            fetch('http://localhost:3001/add',
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
              alerttitle:'Error', alertcontent: 'Please choose a channel banner', alerttype:'warning'
            })
           }
        }else{
          this.showAlert(true);
          this.setState({
            alerttitle:'Error', alertcontent: 'Please choose a channel logo', alerttype:'warning'
          })
        }
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




  setShow = (e) =>{
    this.setState({
        showmodal:e
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
  }



    render() {     
      const {togglealert, alertcontent, alerttype, alerttitle} = this.state;  
      
        return (
              <div className="content">  
                     {(this.state.togglealert == true) ? 
                  <div className="uploadalert">
                    <AlertComponent 
                      title={alerttitle}
                      showalert={togglealert} 
                      content={alertcontent}
                      type={alerttype}
                      closealert={() => this.showAlert(false)}/>
                  </div> : <div></div>} 
                 <Modal
                     show={this.props.openModal}
                     onHide={this.props.closeModal}
                     dialogClassName="modal-100w"
                     size="xl"
                     aria-labelledby="file-form"
                     centered
                   >
                    <Modal.Header closeButton>
                        <Modal.Title id="file-form" >
                           Create Channel
                        </Modal.Title>
                    </Modal.Header>
                     <Modal.Body>
                   
                        <div className="file_form_wrapper_a">
                        <div className="login_title">
                            <span>Create A Channel</span>
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
                               <span>Click here to select channel logo<s style={{color:'tomato'}}>*</s></span>
                           </div>
                           <div className='file_c_a'>
                               <span className="tertiaryButton" onClick={() => this.inputElement.click()}>Select Logo</span>
                               <span>{this.state.uploadFile.name}</span>
                           </div>

                           <input type="file" accept="image/*"
                                  hidden={true}
                                  ref={input => this.inputElement2 = input}
                                  onChange={(e) => this.setUploadFile2(e.target.files)} 
                                  />
                           <div className='file_b_a' >
                               <span >Click here to select channel banner <s style={{color:'tomato'}}>*</s></span>
                           </div>
                           <div className='file_c_a' >
                               <span className="tertiaryButton" onClick={() => this.inputElement2.click()}>Select Banner</span>
                               <span>{this.state.uploadBanner.name}</span>
                           </div>


                          
                           <div className="primaryButton form_group upload_video_btn" style={{textAlign:'center', marginTop:'4vh'}} onClick={() =>this.createChannel()}>
                               <span >Create Channel</span>
                           </div>
                           
                        </div>
                    </Modal.Body>
                 </Modal>

                 </div>
            
        );
    }
}

export default UploadVideoForm;
