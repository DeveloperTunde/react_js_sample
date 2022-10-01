import React, { Component } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../assets/css/videos.css'
import '../assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaUser, FaHome, FaEye, FaEyeSlash, FaSquare, FaDotCircle, FaShareAlt, FaThumbsUp, FaVolumeUp } from 'react-icons/fa'
import ReactPlayer from 'react-player/lazy'
import axios from 'axios';
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
import AlertComponent from '../reuseables/Alert'
import SweetAlert from 'react-bootstrap-sweetalert';



class Videoview extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            isLoadedside: false,
            videos: [],
            video: [],
            shouldPlay: false,
            currenttime: 0,
            navVisible: true,
            searchVisible: true,
            datas: '',
            value: '',
            toggleLike:false,
            counter:0,
            toggleshare:false,
            isrightside:'desktop_display',
            isleftsidebar:'desktop_display',
            ipaddress:'',
            showdialog:false,
            isplaying:false,
            isMuted:true,
        }

    }
  
    handleOnReady = () => setTimeout(() => this.setState({ isplaying: true }), 100);



      confirmDialog(){
        window.location='/login'
      }
      onCancelDialog(){
         this.setState({showdialog:false})
      }
      

    toggleShare = () => {
        this.setState(prevState => ({
            toggleshare: !prevState.toggleshare
        }));
    }

    ref = player => {
        this.player = player
    }

    handlePlayAndPause = () => {
        this.setState(prevState => ({
            shouldPlay: !prevState.shouldPlay
        }));
    }

    changeShouldPlay() {
        this.setState({
            shouldPlay: true
        })
    }

    changeShouldPause() {
        this.setState({
            shouldPlay: false
        })
    }
    getCurrentTime(id) {
        let index = id - 1;
        this.setState({
            currenttime: this.ref.currentTime()
        });
    }

    refreshPage() {
        setTimeout(
            this.fetchVideo(), 1000)
    }

    componentDidMount() {
        this.fetchVideo();
        this.updateViews();
        this.interval = setInterval(() => this.checkLikes(), 1000);
        this.handleOnReady();
    }



    componentWillUnmount() {
        clearInterval(this.interval);
    }

    showAlert(e){
        this.setState({
            togglealert: e
        })
     }

    render() {
        const { videos, counter, toggleLike, alerttitle, togglealert, alertcontent, alerttype } = this.state;
        //console.log(videos);
        return (
            <div className="body">
                <Sidebar leftsidebar={this.state.isleftsidebar}  closeLeftSidebar={() => this.toggleLeftSidebar()}/>
                <div className="content">
                <Header openLeftSidebar={() => this.toggleLeftSidebar()} />
                <div className="page_container">
                {(this.state.togglealert == true) ? 
                  <div className="uploadalert">
                    <AlertComponent 
                      title={alerttitle}
                      showalert={togglealert} 
                      content={alertcontent}
                      type={alerttype}
                      closealert={() => this.showAlert(false)}/>
                  </div> : <div></div>} 
                   <div className="videoview_wrapper videoview_wrapper2">
                        <div className="videoview_left_a">
                            <div className="videoview_left_top_a">

                                <div className="videoview_left_video_a">
                                <ReactPlayer
                                // Disable download button
                                config={{ file: { attributes: { controlsList: 'nodownload' } } }}

                                // Disable right click
                                onContextMenu={e => e.preventDefault()}
                                ref={this.ref}
                                style={{ position: 'relative', top: 0, left: 0, }}
                                url={'../' + videos.videourl}
                                width='100%'
                                height='auto'
                                playing={true}
                                controls={true}
                                muted={this.state.isMuted}
                                onPlay={() => this.changeShouldPlay()}
                                onPause={() => this.changeShouldPause()}
                                config={{ file: { attributes: {
                                    autoPlay: true,
                                    muted: true,
                                    preload: "auto"
                                  }}}}
                              
                            />
                          
                                </div>

                                <div className="videoview_content_wrapper">
                                    <div className="videoview_content_a">
                                        <div className="videoview_content_a_a"><span>{videos.videotitle}</span></div>
                                        <div className="videoview_content_a_b_wrap">
                                          {(!this.state.toggleshare)?
                                           <div className="videoview_content_a_b">
                                           <span onClick={() => this.updateLike()}><FaThumbsUp color={(toggleLike)?'#E82222':''}/></span>
                                           <span onClick={()=> this.toggleShare()}><FaShareAlt /> Share </span>
                                       </div>:  
                                          <div className="videoview_content_a_b_c">
                                               <span className="desktop_display">Share on: </span>
                                               <span><EmailShareButton
                                                       url={window.location.href}
                                                       title={videos.videotitle}
                                                       className="Demo__some-network__share-button">
                                                       <EmailIcon
                                                         size={32}
                                                         round />
                                                     </EmailShareButton></span>
                                                     
                                               <span> 
                                                   
                                                   <TwitterShareButton
                                                       url={window.location.href}
                                                       title={videos.videotitle}
                                                       className="Demo__some-network__share-button">
                                                       <TwitterIcon
                                                         size={32}
                                                         round />
                                                     </TwitterShareButton></span>

                                                     <span> <WhatsappShareButton
                                                       url={window.location.href}
                                                       title={videos.videotitle}
                                                       className="Demo__some-network__share-button">
                                                       <WhatsappIcon
                                                         size={32}
                                                         round />
                                                     </WhatsappShareButton> </span>

                                                     <span><FacebookShareButton
                                                       url={window.location.href}
                                                       title={videos.videotitle}
                                                       className="Demo__some-network__share-button">
                                                       <FacebookIcon
                                                         size={32}
                                                         round />
                                                     </FacebookShareButton> </span>

                                                     <span><LinkedinShareButton
                                                       url={window.location.href}
                                                       title={videos.videotitle}
                                                       className="Demo__some-network__share-button">
                                                       <LinkedinIcon
                                                         size={32}
                                                         round />
                                                     </LinkedinShareButton> </span>

                                                
                                           </div>}
                                        </div>
                                    </div>
                                    <div className="videoview_views"> 
                                        <span><FaEye/></span>
                                        <span>{videos.numberofviewers}views </span>
                                        <span><FaSquare/> </span>
                                        <span>{videos.daysago}</span>
                                        <span>{counter} Likes</span>
                                    </div>
                                    <div className="videoview_content_c"> 
                                        <p>{videos.videofulldescription}</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

             <div>
                {(this.state.showdialog)?
                 <SweetAlert
                 info
                 showCancel
                 cancelBtnText="No"
                 confirmBtnText="Yes, login"
                 confirmBtnBsStyle="success"
                 title="Would you like to login ?"
                 onConfirm={() =>this.confirmDialog()}
                 onCancel={() =>this.onCancelDialog()}
                 focusCancelBtn
               >
                   You have to login before you can like this video
               </SweetAlert> :''}
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

    fetchVideo = () => {
        fetch('/videostreaming/singlevideo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accesstoken: 'userName',
                vidid: this.props.match.params.id
            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    videos: responseJSON['output'][0]['data'][0],
                })
               // console.log(responseJSON['output'][0]['data']);
            })
    }


    // getIpaddress = async () => {
    //     const res = await axios.get('https://geolocation-db.com/json/')
    //     console.log(res.data);
    //     this.setState({
    //         ipaddress: res.data.IPv4
    //     })
    //   }

    updateViews = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
       let ipaddress = res.data.IPv4;
        fetch('/videostreaming/updateviews.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ipaddress: ipaddress,
                vidid: this.props.match.params.id
            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
              console.log(responseJSON);
            })
    }

    updateLike = () => {
        let useremail = sessionStorage.getItem('userReg');
        if (useremail != null) {
         fetch('/videostreaming/likevideo.php', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 useremail: useremail,
                 vidid: this.props.match.params.id
             })
         })
 
             .then((response) => response.json())
             .then((responseJSON) => {
               let response = responseJSON['output'][0]['data'];
               if(response == 'success'){
                
                  //console.log(response);
               }
             })
            }else{
                this.setState({showdialog:true})
               }
     }


     checkLikes = () => {
        let useremail = sessionStorage.getItem('userReg');
         fetch('/videostreaming/updatelikes.php', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 useremail: useremail,
                 vidid: this.props.match.params.id
             })
         })
 
             .then((response) => response.json())
             .then((responseJSON) => {
               let liked = responseJSON['output'][0]['liked'];
               let counter  = responseJSON['output'][0]['counter'];
                this.setState({
                    counter
                })
               if(liked == 'yes'){
                this.setState({
                    toggleLike:true
                })
               }else{
                this.setState({
                    toggleLike:false
                })
               }
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

export default Videoview;
