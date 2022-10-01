import React, { Component } from 'react';
import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import '../assets/css/videos.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player/lazy'
import 'react-tabs/style/react-tabs.css';
import { FaSearch, FaUser, FaVolumeDown, FaVolumeUp, FaBackward, FaForward, FaPause, FaVimeoSquare, FaPlay, FaBars, FaTimes } from 'react-icons/fa'
import "react-datepicker/dist/react-datepicker.css";
import SchedulerTabs from './components/SchedulerTabs'
import { format } from "date-fns";
import TimeRange from "react-timeline-range-slider";

import { uid, suid } from 'rand-token';
import UploadVideoForm from './components/UploadVideoForm'
import CalScheduler from './components/CalScheduler'




class Videos extends Component {
    constructor() {
        super();
        this.state = {
            showmodal: false,
            showmodal2: false,
            isLoggedin: false,
            useremail: '',
            isLoaded: false,
            videos: [],
            selectedArray: [],
            slectionVisibility: false,
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
        fetch('videostreaming/allvideos.php', {
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
        return (
            <div className="body">
                <Sidebar showmodal1={() => this.setShow(true)}/>
                <div className="content">
                <Header />
                <div className="page_container">
                   <div className="index_wrapper">
                   <SchedulerTabs />
                      <div>
                          <div>
                              <h1>{this.state.selectedArray}</h1>
                          </div>
                       </div>
                       <div>
                    <UploadVideoForm
                     openModal={this.state.showmodal}
                     closeModal={() => this.setShow(false)}
                     openModal2={this.state.showmodal2}
                     opensecondModal={() => this.setShow2(true)}
                     closeModal2={() => this.setShow2(false)}
                     />
                  </div>
                  <div>
                     {/* <CalScheduler/> */}
                  </div>
                   </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Videos;
