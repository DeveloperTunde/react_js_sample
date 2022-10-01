import React, { Component } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import '../assets/css/videos.css'
import '../assets/css/admin.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import User1 from './../assets/images/user1.png'
import UploadVideoForm from './components/UploadVideoForm'


class Videos extends Component {
    constructor(){
        super();
        this.state={
            showmodal: false,
            showmodal2: false,
            allvideos:[],
            herovideo:[],
        }
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

     adminUpdateVideo(a, e){
        fetch('/videostreaming/adminupdatevideos.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              currentstatus: e,
              vidid: a
          })
      })
    
          .then((response) => response.json())
          .then((responseJSON) => {
            let res = responseJSON['output'][0]['success'];
            if(res == 'true'){
              alert('success');
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          })
      }

    componentDidMount(){
        this.getAllVideos();
    }
    render() {
        const {allvideos, herovideo}  = this.state;
        return (
            <div className="body">
                <Sidebar  showmodal1={() => this.setShow(true)}/>
                <div className="content">
                <Header />
                <div className="page_container">
                    <div className="index_wrapper">
                       <div className="index_title">
                          <p>Videos</p>
                       </div>
                       <div className="index_content">

                        {
                       allvideos.map((video, i) =>{
                           return <Link  to={`/admin/videoview/${video.videoid}`}> 
                            {(video.videostatus == this.props.match.params.type) ? 
                            
                            <div className="video_box">
                                <div className="video_box_img">
                                    <img src={video.videothumbnail} alt="thumbnail" />
                                </div>
                                <div className="video_box_content">
                                    <div className="video_box_content_left">
                                        <img src={User1} alt="image" />
                                    </div>
                                    <div className="video_box_content_right">
                                        <span className="span_title">{video.videotitle}</span>
                                        <span>{video.videodescription}</span>
                                        <div className="admin_video_content_right_button">
                                            {(this.props.match.params.type == 'active')? 
                                            <div>
                                                <span style={{color:'#F4A50B'}} onClick={() => this.adminUpdateVideo(video.videoid, 'flagged')}>Flag</span>
                                                <span style={{color:'#E82222'}} onClick={() => this.adminUpdateVideo(video.videoid, 'deactivated')}>Deactivate</span>
                                            </div> :
                                            <span style={{color:'#63B74F'}} onClick={() => this.adminUpdateVideo(video.videoid, 'active')}>Reactivate</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>: <div></div>}
                            </Link>
                       })   
                    }


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
                </div>
            </div>
        );
    }
    getAllVideos(){
        fetch('/videostreaming/allvideos.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON['output'][0]['success'] = true) {
                    this.setState({
                        allvideos: responseJSON['output'][0]['data'],
                        herovideo:responseJSON['output'][0]['data'][0]
                    })
                }
            // console.log(responseJSON['output']);
            }).catch((error) =>{
               // console.log(error);
            })
    }
}

export default Videos;
