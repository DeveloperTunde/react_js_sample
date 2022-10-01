import React, { Component } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../assets/css/videos.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  FaShare, FaEye, FaEyeSlash, FaPlay } from 'react-icons/fa'
import User1 from './../assets/images/user1.png'
import Card from 'react-bootstrap/Card'

class Videos extends Component {
    constructor(){
        super();
        this.state={
            allvideos:[],
            herovideo:[],
            isrightside:'desktop_display',
            isleftsidebar:'desktop_display'
        }
    }


    componentDidMount(){
        this.getAllVideos();
    }
    render() {
        const {allvideos, herovideo}  = this.state;
       
        return (
            <div className="body">
                 <Sidebar leftsidebar={this.state.isleftsidebar}  closeLeftSidebar={() => this.toggleLeftSidebar()}/>
                <div className="content">
                <Header openLeftSidebar={() => this.toggleLeftSidebar()} />
                <div className="page_container">
                    <div className="index_wrapper">
                       <div className="index_title">
                          <p>Liked Videos</p>
                       </div>
                       <div className="index_content">
                        
                        {
                        (sessionStorage.getItem('userReg') == null)? <center><p className="placeholdertext">You are not logged in</p></center> : 
                       allvideos.map((video, i) =>{
                           return <Link  to={`/videoview/${video.videoid}`}> <div className="video_box">
                                 <Card className="video_box_img">
                                   <Card.Img src={video.videothumbnail} alt="image" className="admin_index_left_a_img"/>
                                   <div className="videoview_content_wrap"></div>
                                   <Card.ImgOverlay>
                                     <Card.Text>
                                       <div className="overlaycontent-index">
                                         <span><FaPlay/></span>
                                       </div>
                                     </Card.Text>
                                   </Card.ImgOverlay>
                                 </Card>
                                <div className="video_box_content">
                                    <div className="video_box_content_left">
                                        <img src={video.profilepicture} alt="image" />
                                    </div>
                                    <div className="video_box_content_right">
                                        <span className="span_title">{video.videotitle}</span>
                                        <span>{video.videodescription}</span>
                                        <div className="video_content_right_b">
                                            <span><FaEye/></span>
                                            <span>{video.numberofviewers}views .</span>
                                            <span>{video.daysago}</span> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Link>
                       })   
                    }

                       </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
    getAllVideos(){
        let useremail = sessionStorage.getItem('userReg');
        fetch('/videostreaming/likedvideos.php', {
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
                if (responseJSON['output'][0]['success'] == 'true') {
                    this.setState({
                        allvideos: responseJSON['output'][0]['data'],
                        herovideo:responseJSON['output'][0]['data'][0]
                    })
                }
            console.log(responseJSON['output']);
            }).catch((error) =>{
               // console.log(error);
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

export default Videos;
