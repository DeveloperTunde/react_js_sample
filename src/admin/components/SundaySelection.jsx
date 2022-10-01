import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import 'react-tabs/style/react-tabs.css';
import ReactPlayer from 'react-player/lazy'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Ruler from './ScheduleRuler';
import '../../assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { Button, } from 'reactstrap';
import { endOfToday, set, format } from 'date-fns'
import TimeRange from 'react-timeline-range-slider'
import { FaTimes, FaEye, FaPlay, FaPlus } from 'react-icons/fa';
import Thumbnailbg from '../../assets/images/bgthumbnail.png'
import Thumbnailbgsm from '../../assets/images/bgthumbnail2.png'

const now = new Date()
const getTodayAtSpecificHour = (hour, minute) =>
    set(now, { hours: hour, minutes: minute, seconds: 0, milliseconds: 0 })

const selectedStart = getTodayAtSpecificHour()
const selectedEnd = getTodayAtSpecificHour(8)

const startTime = getTodayAtSpecificHour(0)
const endTime = endOfToday()









export default class SundaySelection extends Component {
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
            selectedInterval: [selectedStart, selectedEnd],
            videos: [],
            sunday: [],
            presentTab:0
        }
    }


    fetchVideos = () => {
        //http://192.168.8.100/videostreaming/allvideos
        fetch('/videostreaming/allvideos.php', {
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



    callbackFunction = (childData) => {
        this.setState({ presentTab: childData })
    }




    componentDidMount() {
        this.fetchVideos();
        this.interval = setInterval(() => this.fetchSunday(), 1000);

        this.interval8 = setInterval(() => this.fetchScheduledVideos(), 1000);
    }


    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.interval8);


    }




    fetchScheduledVideos = () => {
        //http://192.168.137.1/videostreaming/allvideos
        fetch('/videostreaming/scheduledvideos.php', {
            method: 'POST', 
            body: JSON.stringify({
                accesstoken: 'iita-web-developers',
                selectedday: this.props.currentTab,
            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    isLoaded: true,
                    videodata: responseJSON['output'][0]['data'],
                });
                //let test = responseJSON['output'][0]['data'];
                //console.log(test);
                //console.log(this.state.presentTab);


            })
    }



    deleteSelection(vid, vpersecond) {

        fetch('/videostreaming/deleteselection.php', {
            method: 'POST',
            
            body: JSON.stringify({
                selectedvideodel: vid,
                selecteddaydel: this.state.presentTab,
            })
        })

            .then((response) => response.text())
            .then((responseJSON) => {
               // alert(responseJSON+' '+vid+' '+this.state.presentTab);
                /*  return (
                   alert(responseJSON + "! The selections have been added")
                 ); */
            })
    }




    errorHandler = ({ error }) => this.setState({ error })

    onChangeCallback = selectedInterval => this.setState({ selectedInterval })


    render() {
        const { selectedInterval, error, selectedStart } = this.state;
        const { sunday, videodata } = this.state;

        let disabledIntervals = videodata.map(x => ({
            start: getTodayAtSpecificHour(x.starthour, x.startminute), end: getTodayAtSpecificHour(x.endhour, x.endminute)
        }))

        return (
            <div className="schedule-display">
                <div className="timepicker-slider2">
                    <TimeRange
                        error={error}
                        ticksNumber={36}
                        selectedInterval={selectedInterval}
                        timelineInterval={[startTime, endTime]}
                        onUpdateCallback={this.errorHandler}
                        onChangeCallback={this.onChangeCallback}
                        disabledIntervals={disabledIntervals}
                    />
                </div>


                <div className="addmorebtn-toggle" onClick={this.props.toggleAandR}>
                        {(this.props.selectVisible) ? 
                        
                        <div className="addmorebtn-toggle-inner-1" style={{backgroundColor:'tomato'}}> 
                            <p style={{color:'#fff'}}><FaTimes/></p>
                            <p style={{color:'#fff'}}>Close</p>
                        </div>
                        : 
                        <div className="addmorebtn-toggle-inner-2">
                            <p><FaPlus/></p>
                            <p>Add more video</p>
                        </div>
                        }
                </div>
                {(this.props.toggleAddmore) ? <div>

                    {sunday.map((video) =>

                    <div className="admin_video_box2" key={video.videoid}>
                    <Card className="admin_video_box_img">
                                   <Card.Img src={video.videothumbnail} alt="image" className="admin_index_left_a_img"/>
                                   <div className="admin_videoview_content_wrap"></div>
                                   <Card.ImgOverlay>
                                     <Card.Text>
                                       <div className="admin_overlaycontent-sidebar">
                                          <Link to={`videoview/${video.videoid}`} className="link"><span><FaPlay/></span></Link>
                                       </div>
                                     </Card.Text>
                                   </Card.ImgOverlay>
                                 </Card>
                    <div className="admin_video_box_content">
                       
                        <div className="admin_video_box_content_right">
                             <span className="admin_span_title">{video.videotitle}</span>
                            <div className="admin_video_content_right_b">
                                <span>From</span>
                                <span>{video.starttime}-{video.endtime} </span>
                                <span  onClick={() => this.deleteSelection(video.id, video.videopersecond)}>Remove</span> 
                            </div>
                        </div>
                     </div>
                    </div>


                    )}
                </div> : <div></div>}
                
                <div>
                    
                </div>
                
            </div>

                   


        );



    };




    fetchSunday = () => {
        //http://192.168.8.100/videostreaming/allvideos
        fetch('/videostreaming/selectionlist.php', {
            method: 'POST',
            body: JSON.stringify({
                fetchday: 0

            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({

                    sunday: responseJSON['output'][0]['data'],
                })
                console.log(responseJSON);
            })
    }






}



