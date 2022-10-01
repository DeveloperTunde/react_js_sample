import React, { Component } from 'react';
import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import '../assets/css/videos.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player/lazy'
import 'react-tabs/style/react-tabs.css';
import { FaSearch, FaUser, FaVolumeDown, FaVolumeUp, FaBackward, FaForward, FaPause, FaVimeoSquare, FaPlay, FaBars, FaTimes, FaFile, FaArrowCircleUp } from 'react-icons/fa'
import "react-datepicker/dist/react-datepicker.css";
import SchedulerTabs from './components/SchedulerTabs'
import { format } from "date-fns";
import TimeRange from "react-timeline-range-slider";

import { uid, suid } from 'rand-token';
import UploadVideoForm from './components/UploadVideoForm'
import CalScheduler from './components/CalScheduler'
import CreateEventWithNoOverlap from './createEvent';






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
            selectVisiblity: false,
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

     



   

    render() {
        return (
            <div className="body">
                <Sidebar showmodal1={() => this.setShow(true)}/>
                <div className="content" style={{ height:'auto', overflowY:'scroll' }}>
                <Header />
                <div className="page_container" >
                   <div className="index_wrapper" >
                  
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
                     <CreateEventWithNoOverlap/>
                  </div>

                  <div className="addmorebtn-toggle"  style={{marginTop:'3vh', cursor:'pointer'}}>
                      
                      <div className="addmorebtn-toggle-inner-2">
                          <p><FaArrowCircleUp/></p>
                          
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
