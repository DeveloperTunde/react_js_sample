import React, { Component } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import '../assets/css/videos.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaUser, FaHome, FaVideo, FaPlaystation, FaFileVideo, FaViadeoSquare, FaVideoSlash, FaPause, FaVimeoSquare, FaPlay, FaBars, FaTimes, FaShare, FaEye, FaEyeSlash } from 'react-icons/fa'
import { uid, suid } from 'rand-token';
import User1 from './../assets/images/user1.png'
import User2 from './../assets/images/user2.png'
import Eye from './../assets/images/eye.png'
import Thumbnaila from './../assets/images/thumbnaila.png'
import Thumbnailb from './../assets/images/thumbnailb.png'
import Thumbnailc from './../assets/images/thumbnailc.png'
import Thumbnaild from './../assets/images/thumbnaild.png'

class Videos extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            selectedArray: [],
            selectVisiblity: false,
            submittingvideoid: '',
            showtimepicker: false,
            videodata: [1, 2, 2, 3],
            error: false,
            videos: [],
            monday: [],
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

    fetchVideos = () => {
        //http://192.168.8.100/videostreaming/allvideos
        fetch('http://localhost/videostreaming/allvideos.php', {
            method: 'POST',
            body: JSON.stringify({
                accesstoken: 'userName',

            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    isLoaded: true,
                    videos: responseJSON['output'][0]['data'],
                })
            })
    }




    componentDidMount() {
        this.fetchVideos();

    }
    render() {
        const { videos, videodata, sunday } = this.state;
        return (
            <div className="body">
                <Sidebar showmodal1={() => this.setShow(true)}/>
                <div className="content">
                <Header />
                <div className="page_container">
                    <div className="index_wrapper">
                       <div className="index_title">
                          <p>Flagged Videos (3)</p>
                       </div>
                       <div className="index_content">


                       {videos.map((video) =>
                            <div className="video_box" key={video.videoid}>
                                <div className="video_box_img">
                                    <img src={Thumbnaila} alt="thumbnail" />
                                </div>
                                <div className="video_box_content">
                                    <div className="video_box_content_left">
                                        <img src={User1} alt="image" />
                                    </div>
                                    <div className="video_box_content_right">
                                        <span className="span_title">Video Title</span>
                                        <span>One line description on the upcoming program</span>
                                        <div className="video_content_right_b">
                                            <span><FaEye/></span>
                                            <span>100views .</span>
                                            <span>3days ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) }

                            
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
}

export default Videos;
