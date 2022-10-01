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
            videouploader: null,
            videotitle:'',
            videocategory: '',
            crop:  '',
            channel:  '',
            videoshortdescription: '',
            videofulldescription:'',
            tags:'',
            togglealert:false,
            alerttitle:'', alertcontent:'', alerttype:'',
            ischannelAvailable: false,
            mychannels:[],
           

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


    //console.log(filesize);
    this.props.opensecondModal();
  
  }
  




submitForm =() =>{

  const formData = new FormData();
  
  if (this.state.videouploader != null) {
      if (this.state.videotitle !='') {
         if (this.state.videoshortdescription !='') {
            if (this.state.videofulldescription !='') {
              
              formData.append("videofile", this.state.uploadFile);
              formData.append("videotitle", this.state.videotitle);
              formData.append("videocategory", this.state.videocategory);
              formData.append("channel", this.state.channel);
              formData.append("crop", this.state.crop);
              formData.append("videoshortdescription", this.state.videoshortdescription);
              formData.append("videofulldescription", this.state.videofulldescription);
              formData.append("tags", this.state.tags);
              formData.append("videouploader", this.state.videouploader);

              //<img src={Gif} className="alertloader"/>
              const Mylabel = <p>Please wait...  </p>;
              this.showAlert(true);
                this.setState({
                  alerttitle:'Uploading', alertcontent:Mylabel, alerttype:'success'
               })
              fetch('/videostreaming/upload.php',
                  {
                      method: 'POST',                   
                      body: formData,
                      headers: {
                          Accept: 'application/json',
                        },
                  }
              ).then((response) => response.json())
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
   
  getUserEmail = () =>{
  let useremail =  sessionStorage.getItem('userReg');
  this.setState({
      videouploader:useremail
  })
  }

  componentDidMount(){
      this.getUserEmail();
      this.getChannels();
  }



    render() {     
      const {togglealert, alertcontent, alerttype, alerttitle, mychannels} = this.state;  
      
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
                           Upload Video
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
                        Upload Video 
                     </Modal.Title>
                    </Modal.Header>
                     <Modal.Body>
                       
                        <div className="file_form_wrapper2">
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


                           <div className="selected_video">
                                <span>Selected video:</span>
                                <span>{this.state.uploadFile.name}</span>
                           </div>

                           <div className="primaryButton form_group upload_video_btn" onClick={() =>this.submitForm()}>
                               <span>Done</span>
                           </div>
                          
                        </div>
                 
                    </Modal.Body>
                    
                 </Modal>
                 
                 </div>
            
        );
    }
}

export default UploadVideoForm;
