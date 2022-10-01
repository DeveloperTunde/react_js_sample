import React, { Component, useState } from 'react';
import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import '../../assets/css/videos.css'
import '../../assets/css/styles.css'
import '../../assets/css/user.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaSquare,FaShareAlt } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal'
import Upload from '../../assets/images/upload.png'
import AlertComponent from '../../reuseables/Alert'
import Gif from '../../assets/images/mygif.gif'


class UploadVideoForm extends Component {
     constructor(){
        super();
        this.state={
            showmodal: false,
            uploadFile:'',
            videouploader:'',
            videotitle:'',
            videoshortdescription: '',
            videofulldescription:'',
            togglealert:false,
            alerttitle:'', alertcontent:'', alerttype:''

        }
     }



showAlert(e){
  this.setState({
      togglealert: e
  })
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
    //console.log(filesize);

    this.props.opensecondModal();
  }
  



submitForm =() =>{

  const formData = new FormData();
  formData.append("videofile", this.state.uploadFile);
  formData.append("videotitle", this.state.videotitle);
  formData.append("videoshortdescription", this.state.videoshortdescription);
  formData.append("videofulldescription", this.state.videofulldescription);
  formData.append("videouploader", this.state.videouploader);

  const Mylabel = <p>Please wait <img src={Gif} className="alertloader"/> </p>;
  this.showAlert(true);
    this.setState({
      alerttitle:'Uploading', alertcontent:Mylabel, alerttype:'success'
   })
  //console.log(file);
  fetch('/videostreaming/adminupload.php',
      {
          method: 'POST',                   
          body: formData,
          headers: {
              Accept: 'application/json',
            },
      }
  ).then((response) => response.text())
  .then((responseJSON) => {
    this.setState({
      alerttitle:'Success!', alertcontent:`${responseJSON}`, alerttype:'success'
   })
  console.log(responseJSON);
  this.props.closeModal2();
  setTimeout(() => {
    this.showAlert(false);
  }, 4000);
  }).catch((error) => {
     // console.log(file);
     //let errors = JSON.parse(error);
    // console.log(error);  
  
  })
}



  setShow = (e) =>{
    this.setState({
        showmodal:e
    })
  }
   
  getUserEmail = () =>{
  let useremail =  localStorage.getItem('userReg');
  this.setState({
      videouploader:useremail
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
                           Upload Program
                        </Modal.Title>
                    </Modal.Header>
                     <Modal.Body>
                        <div className="file_form_wrapper">
                           <div className='file_a'>
                               <img src={Upload} />
                           </div>
                           <input type="file" accept="video/*"
                                  hidden={true}
                                  ref={input => this.inputElement = input}
                                  onChange={(e) => this.setUploadFile(e.target.files)} 
                                  />
                           <div className='file_b' >
                               <span>Click here to select file</span>
                           </div>
                           <div className='file_c'>
                               <span className="primaryButton" onClick={() => this.inputElement.click()}>Select File</span>
                           </div>
                        </div>
                    </Modal.Body>
                 </Modal>












                 <Modal
                     show={this.props.openModal2}
                     onHide={this.props.closeModal2}
                     dialogClassName="modal-100w"
                     size="xl"
                     aria-labelledby="file-form2"
                     centered
                   >
                    <Modal.Header closeButton>
                        <Modal.Title id="file-form2">
                        Upload Program 
                     </Modal.Title>
                    </Modal.Header>
                     <Modal.Body>
                        <div className="file_form_wrapper2">
                           <div className="form_group">
                                <label>Programme Title [25 characters max]</label>
                                <input type="text"  
                                       name="videotitle"
                                       value={this.state.videotitle} 
                                       onChange={this.handleInput.bind(this)}
                                       maxLength={35}/>
                           </div>


                           <div className="form_group">
                                <label>Programme Short Details [64 characters max]</label>
                                <textarea name="videoshortdescription"
                                          value={this.state.videoshortdescription} 
                                          onChange={this.handleInput.bind(this)}
                                          maxLength={64}></textarea>
                           </div>

                           <div className="form_group">
                                <label>Programme Full Details</label>
                                <textarea name="videofulldescription"
                                          value={this.state.videofulldescription} 
                                          onChange={this.handleInput.bind(this)}></textarea>
                           </div>

                           <div className="primaryButton form_group upload_video_btn">
                               <span onClick={() =>this.submitForm()}>Done</span>
                           </div>
                          
                        </div>
                    </Modal.Body>
                 </Modal>
            
                  </div>
        );
    }
}

export default UploadVideoForm;
