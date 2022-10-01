import React, { Component } from 'react';
import ReactPlayer from 'react-player/lazy'
import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../assets/css/videos.css'
import '../assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaUser, FaHome, FaEye, FaTimes, FaEyeSlash, FaSquare, FaDotCircle, FaShareAlt, FaVolumeUp, FaVolumeOff, FaVolumeMute } from 'react-icons/fa'
import Card from 'react-bootstrap/Card'
import Thumbnailbgsm from './../assets/images/bgthumbnail2.png'
import ModalComponent from '../reuseables/Modal'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,

  } from "react-share";
  import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";

class Videoview extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            videos: [],
            mute: false,
            shouldPlay: true,
            currenttime: 0,
            starttime: 0,
            videodata: [],
            videodata2: [],
            currentValue: 0,
            isrightside:'desktop_display',
            isleftsidebar:'desktop_display',
            allprogram:[],
            heroprogram:[],
            IsAllprogAvai:false,
            toggleshare:false,
            isMuted:true,
            ismodal:false,
            modaldata:false
        }
        this.getCurrentValue = this.getCurrentValue.bind(this);
    }


    


     ref = player => {
        this.player = player
    }

    getCurrentValue(currentValue) {
        this.setState({
            currentValue: currentValue
        })
    }

     getAllProgram(){
        fetch('/videostreaming/allprograms.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON['output'][0]['success'] === 'true') {

                    this.setState({
                        allprogram:responseJSON['output'][0]['data'],
                        heroprogram:responseJSON['output'][0]['data'][0],
                        IsAllprogAvai:true,
                    })
                }
            // console.log(responseJSON);
            }).catch((error) =>{
                console.log(error);
            })
    }


    fetchStream = () => {
        //http://192.168.137.1/videostreaming/allvideos
        fetch('/videostreaming/streaming.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accesstoken: 'iita-web-developer',

            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    isLoaded: true,
                    videodata: responseJSON['output'][0]['data'][0]
                  
                });
               // console.log(responseJSON);
               if(responseJSON['output'][0]['data'][0].streamtype == 'live'){
                setTimeout(() => {
                    this.seekto();
                    
                   }, 2000);
               }    
               
               

            })
    }



    fetchChangeURL = () => {
        //http://192.168.137.1/videostreaming/allvideos
        fetch('/videostreaming/streaming.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accesstoken: 'iita-web-developer',

            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON['output'][0]['data'][0].videofile === this.state.videodata.videofile) {

                } else {
                    this.setState({
                        isLoaded: true,

                        videodata: responseJSON['output'][0]['data'][0]
                    });
                    
                    if(responseJSON['output'][0]['data'][0].streamtype == 'live'){
                        this.seekto();
                    }    
                       
                     //console.log(responseJSON);
                }
                 //console.log(responseJSON);

            })
    }

   

    seekto = () => {
        this.player.seekTo(this.state.videodata.startvideoat, 'seconds');
    }

    componentDidMount() {

        this.interval = setInterval(() => this.fetchChangeURL(), 1000);
        this.fetchStream();
        this.interval2 = setInterval(() => this.getAllProgram(), 1000);
  
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.interval2);
    }


    getcurrenttime() {
        this.setState({
            currenttime: this.player.persistedCurrentTime(),
        })
    }

    handlePlayAndPause = () => {
        this.setState(prevState => ({
            shouldPlay: !prevState.shouldPlay
        }));
    }
   
    toggleShare = () => {
        this.setState(prevState => ({
            toggleshare: !prevState.toggleshare
        }));
    }


  
    render() {
        const { videodata, heroprogram, nowprogram, allprogram, IsAllprogAvai, isrightside } = this.state;
        //console.log(videos);
        return (
            <div className="body">
                <Sidebar leftsidebar={this.state.isleftsidebar}  closeLeftSidebar={() => this.toggleLeftSidebar()}/>
                <div className="content">
                <Header openLeftSidebar={() => this.toggleLeftSidebar()} />
                <ModalComponent 
                   closeSideModal = {() => this.showModal(false)}
                   data = {this.state.modaldata}
                   showthismodal= {this.state.ismodal}
                />
                <div className="page_container">
                   <div className="videoview_wrapper videoview_wrapper2">
                   <div className="videoview_left_tv" >
                        <div className="videoview_left_a_tv" >
                            <div className="videoview_left_top_a">

                                <div className="videoview_left_video_a">
                                <ReactPlayer
                                   ref={this.ref}
                                   style={{ position: 'relative', top: 0, left: 0, }}
                                   url={'../'+videodata.videofile}
                                   width='100%'
                                   height='100%'
                                   playing={true}
                                   className="tv_video"
                                   loop={true}
                                   muted={this.state.isMuted}
                                   config={{ file: { attributes: {
                                    autoPlay: true,
                                    muted: true,
                                    preload: "auto"
                                  }}}}
                                 />
                                 {
                                    (this.state.isMuted)? <div className="unmute-btn">
                                    <span onClick={() => this.handleMute()}>
                                        <FaVolumeMute/>
                                    </span>
                                  </div>:''
                                }
                                </div>

                                <div className="videoview_content_wrapper">
                                <div className="videoview_content_a">
                                        <div className="videoview_content_a_a"><span>{videodata.videotitle}</span></div>
                                        <div className="videoview_content_a_b_wrap">
                                          {(!this.state.toggleshare)?
                                           <div className="videoview_content_a_b">
                                           <span onClick={()=> this.toggleShare()}><FaShareAlt /> Share </span>
                                       </div>:  
                                          <div className="videoview_content_a_b_c">
                                               <span className="desktop_display">Share on: </span>
                                               <span><EmailShareButton
                                                       url={window.location.href}
                                                       title={videodata.videotitle}
                                                       className="Demo__some-network__share-button">
                                                       <EmailIcon
                                                         size={32}
                                                         round />
                                                     </EmailShareButton></span>
                                                     
                                               <span> 
                                                   
                                                   <TwitterShareButton
                                                       url={window.location.href}
                                                       title={videodata.videotitle}
                                                       className="Demo__some-network__share-button">
                                                       <TwitterIcon
                                                         size={32}
                                                         round />
                                                     </TwitterShareButton></span>

                                                     <span> <WhatsappShareButton
                                                       url={window.location.href}
                                                       title={videodata.videotitle}
                                                       className="Demo__some-network__share-button">
                                                       <WhatsappIcon
                                                         size={32}
                                                         round />
                                                     </WhatsappShareButton> </span>

                                                     <span><FacebookShareButton
                                                       url={window.location.href}
                                                       title={videodata.videotitle}
                                                       className="Demo__some-network__share-button">
                                                       <FacebookIcon
                                                         size={32}
                                                         round />
                                                     </FacebookShareButton> </span>

                                                     <span><LinkedinShareButton
                                                       url={window.location.href}
                                                       title={videodata.videotitle}
                                                       className="Demo__some-network__share-button">
                                                       <LinkedinIcon
                                                         size={32}
                                                         round />
                                                     </LinkedinShareButton> </span>

                                                
                                           </div>}
                                        </div>
                                    </div>
                                    <div className="videoview_views"> 
                                        
                                        
                                    </div>
                                    <div className="videoview_content_c"> 
                                        <p>{videodata.videofulldescription}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="tv_next_programme mobile_display" onClick={() => this.toggleRightSidebar()}>
                                <span>Upcoming Programs</span>
                               
                            </div>
                        </div>
                    </div> 

                    <div className={"videoview_right tv_mobile_right "+(isrightside)}>

                         

                            <div className="videoview_side_btm" style={{marginTop:'0vh'}}>
                                <div className="videoview_side_btm_close mobile_display">
                                   <span onClick={() => this.toggleRightSidebar()}><FaTimes/></span>
                                </div>
                               <div className="featured_videos_title3" > 
                               {(IsAllprogAvai)?<span>Upcoming Programs</span>:<span></span>}
                               </div>

                               {
                                (IsAllprogAvai)?
                                <div className="upcoming_box_wrap"  onClick={() => this.openSideModal(heroprogram)}>
                               <span className="featured_next">next </span>
                               <div className="upcoming_1">
                               <div className="upcoming_box">
                                  <div className="upcoming_box_left">
                                     <span>{heroprogram.videotitle}</span>
                                     {/* <span>{heroprogram.videodescription}</span> */}
                                     <span>{heroprogram.videostarttime} - {heroprogram.videoendtime} <span className="upcoming_box_left_sm">{heroprogram.day}</span> </span>
                                  </div>
                                  <div className="upcoming_box_right">
                                     <span className="featured_next_ring"></span>
                                  </div>
                               </div>
                               </div>
                             </div>
                             : <span></span>
                               }
                               
                               
                               {
                             allprogram.slice(1, allprogram.length).map((program, i) =>{
                               return <div className="upcoming_box_wrap" onClick={() => this.openSideModal(program)}>
                                 <div className="upcoming_box">
                                    <div className="upcoming_box_left">
                                    <span>{program.videotitle}</span>
                                       {/* <span>{program.videodescription}</span> */}
                                       <span>{program.videostarttime} - {program.videoendtime} <span className="upcoming_box_left_sm">{program.day}</span></span>
                                    </div>
                                    <div className="upcoming_box_right">
                                       <span></span>
                                    </div>
                                 </div>
                               </div>


                             })
                            }
                              
                            </div>
                        </div>
                
                   </div>
                </div>
                </div>
            </div>
        );
    }

    handleMute = () =>{
        this.setState({
            isMuted:false
        })
    }

 toggleRightSidebar(){

    if (this.state.isleftsidebar == 'mobile_display') {
        this.setState({
            isleftsidebar:'desktop_display'
        })
       
    }

    if (this.state.isrightside == 'desktop_display') {
         this.setState({
            isrightside:'mobile_display'
        })
        
    }else{
         this.setState({
            isrightside:'desktop_display'
        })
        
    }
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





     openSideModal (data) {
        this.setState({
            ismodal:true,
            modaldata:data
        })
     
  }

  showModal(){
    this.setState({
        ismodal:false,
    })
}

}

export default Videoview;
