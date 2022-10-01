import React, { Component } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import '../assets/css/videos.css'
import '../assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaUser, FaHome, FaEye, FaEyeSlash, FaSquare, FaDotCircle, FaShareAlt, FaThumbsUp } from 'react-icons/fa'
import ReactPlayer from 'react-player/lazy'
import UploadVideoForm from './components/UploadVideoForm'


class Videoview extends Component {
    constructor() {
        super();
        this.state = {
            showmodal: false,
            showmodal2: false,
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
    }



    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { videos, counter, toggleLike } = this.state;
        console.log(videos);
        return (
            <div className="body">
                <Sidebar showmodal1={() => this.setShow(true)}/>
                <div className="content">
                <Header />
                <div className="page_container">
                   <div className="videoview_wrapper">
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
                                url={'../../' + videos.videourl}
                                width='100%'
                                height='auto'
                                playing={true}
                                controls={true}
                                onPlay={() => this.changeShouldPlay()}
                                onPause={() => this.changeShouldPause()}
                            />
                                </div>

                                <div className="videoview_content_wrapper">
                                    <div className="videoview_content_a">
                                        <div className="videoview_content_a_a"><span>{videos.videotitle}</span></div>
                                       
                                    </div>
                                    
                                    <div className="videoview_content_c"> 
                                        <p>{videos.videofulldescription}</p>
                                    </div>
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
                            
                        </div>
                                           
                   </div>
                </div>
                </div>
            </div>
        );
    }


    fetchVideo = () => {
        fetch('/videostreaming/singlevideo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                vidid: this.props.match.params.id
            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    videos: responseJSON['output'][0]['data'][0],
                })
                console.log(responseJSON['output'][0]['data']);
            })
    }


    updateViews = () => {
       let useremail = localStorage.getItem('userReg');
        fetch('/videostreaming/updateviews.php', {
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
            //  console.log(responseJSON);
            })
    }

    updateLike = () => {
        let useremail = localStorage.getItem('userReg');
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
     }


     checkLikes = () => {
        let useremail = localStorage.getItem('userReg');
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
}

export default Videoview;
