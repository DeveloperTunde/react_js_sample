import React, { Component } from 'react';
import ReactPlayer from 'react-player/lazy'
import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import '../assets/css/videos.css'
import '../assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaVolumeDown, FaVolumeMute, FaVolumeOff, FaVolumeUp } from 'react-icons/fa'

class TvView extends Component {
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
            isMuted:true,

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

    seekto = () => {
        this.player.seekTo(this.state.videodata.startvideoat, 'seconds');
        
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

   

  

    componentDidMount() {

        this.interval = setInterval(() => this.fetchChangeURL(), 1000);
        this.fetchStream();
    
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


  
    render() {
        const { videodata} = this.state;
        //console.log(videos);
        return (
            //videoview_left_video_vid
          <div className="">
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
                  (this.state.isMuted)? <div className="unmute-btn2">
                  <span onClick={() => this.handleMute()}>
                      <FaVolumeMute />
                  </span>
              </div>:
              <div className="unmute-btn2">
              <span onClick={() => this.handleUnmute()}>
                  <FaVolumeUp />
              </span>
          </div>
              }
              <div className="live_span">
                    <span><b>.</b>Live</span>
              </div>
            </div>
          
        );
    }


    handleMute = () =>{
        this.setState({
            isMuted:false
        })
    }


    handleUnmute = () =>{
        this.setState({
            isMuted:true
        })
    }

}

export default TvView;
