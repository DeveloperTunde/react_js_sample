import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactPlayer from 'react-player/lazy'
import '../../assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import {FaTimes, FaPlay} from 'react-icons/fa';
import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import TimeRange from 'react-timeline-range-slider';
import { Button, Label, } from 'reactstrap';
import { endOfToday, set, format } from 'date-fns'
import SundaySelection from './SundaySelection';
import MondaySelection from './MondaySelection';
import TuesdaySelection from './TuesdaySelection';
import WednesdaySelection from './WednesdaySelection';
import ThursdaySelection from './ThursdaySelection';
import FridaySelection from './FridaySelection';
import SaturdaySelection from './SaturdaySelection';
import SchedularForm from './SchedularForm';

const now = new Date();
const getTodayAtSpecificHour = (hour, minute) =>
    set(now, { hours: hour, minutes: minute, seconds: 0, milliseconds: 0 })

const getTodayAtSpecificHour2 = (hour, minute) =>
    set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const selectedStart = getTodayAtSpecificHour2()
const selectedEnd = getTodayAtSpecificHour2(8,0)

const startTime = getTodayAtSpecificHour2(0)
const endTime = endOfToday()


export default class SchedulerTabs extends Component {
    constructor() {
        super();
        this.state = {
            presentTab: 0,
            isLoaded: false,
            selectedArray: [],
            selectVisiblity: false,
            removeVideoVisibility: true,
            submittingvideoid: '',
            showtimepicker: false,
            showform:false,
            videodata: [1, 2, 2, 3],
            error: false,
            selectedInterval: [selectedStart, selectedEnd],
            videos: [],
           

        }
    }


    errorHandler = ({ error }) => this.setState({ error })

    onChangeCallback = selectedInterval => this.setState({ selectedInterval })


    render() {
        const { videos, videodata, sunday } = this.state;
        const { selectedInterval, error, selectedStart } = this.state;


        let selectedday = '';
        if (this.state.presentTab == 0) {
            selectedday = 'Sunday';
        }else if(this.state.presentTab == 1){
            selectedday = 'Monday';
        }else if(this.state.presentTab == 2){
            selectedday = 'Tuesday';
        }else if(this.state.presentTab == 3){
            selectedday = 'Wednesday';
        }else if(this.state.presentTab == 4){
            selectedday = 'Thursday';
        }else if(this.state.presentTab == 5){
            selectedday = 'Friday';
        }else if(this.state.presentTab == 6){
            selectedday = 'Saturday';
        }



        let disabledIntervals = videodata.map(x => ({
            start: getTodayAtSpecificHour(x.starthour, x.startminute), end: getTodayAtSpecificHour(x.endhour, x.endminute)
        }))


     // console.log(this.state.selectedInterval[0])

        return (
            <div>
                <div className="scheduler-wrapper" >
                
                    <Tabs onSelect={this.twocalls}  >
                        <TabList >
                            <Tab>Sunday </Tab>

                            <Tab>Monday</Tab>
                            <Tab>Tuesday</Tab>
                            <Tab>Wednesday</Tab>
                            <Tab>Thursday</Tab>
                            <Tab>Friday</Tab>
                            <Tab>Saturday</Tab>
                        </TabList>


                        <TabPanel style={{ padding: 20, backgroundColor: '#fff' }}>
                            <SundaySelection
                                toggleAandR={() => this.toggleAddandRemove()}
                                toggleAddmore={this.state.removeVideoVisibility}
                                selectVisible={this.state.selectVisiblity}
                                currentTab={this.state.presentTab}
                            />
                        </TabPanel>

                        <TabPanel style={{ padding: 20, backgroundColor: '#fff' }}>
                            <MondaySelection
                                toggleAandR={() => this.toggleAddandRemove()}
                                toggleAddmore={this.state.removeVideoVisibility}
                                selectVisible={this.state.selectVisiblity}
                                currentTab={this.state.presentTab}
                            />
                        </TabPanel>

                        <TabPanel style={{ padding: 20, backgroundColor: '#fff' }}>
                            <TuesdaySelection
                                toggleAandR={() => this.toggleAddandRemove()}
                                toggleAddmore={this.state.removeVideoVisibility}
                                selectVisible={this.state.selectVisiblity}
                                currentTab={this.state.presentTab}
                            />
                        </TabPanel>

                        <TabPanel style={{ padding: 20, backgroundColor: '#fff' }}>
                            <WednesdaySelection
                                toggleAandR={() => this.toggleAddandRemove()}
                                toggleAddmore={this.state.removeVideoVisibility}
                                selectVisible={this.state.selectVisiblity}
                                currentTab={this.state.presentTab}
                            />
                        </TabPanel>

                        <TabPanel style={{ padding: 20, backgroundColor: '#fff' }}>
                            <ThursdaySelection
                                toggleAandR={() => this.toggleAddandRemove()}
                                toggleAddmore={this.state.removeVideoVisibility}
                                selectVisible={this.state.selectVisiblity}
                                currentTab={this.state.presentTab}
                            />
                        </TabPanel>

                        <TabPanel style={{ padding: 20, backgroundColor: '#fff' }}>
                            <FridaySelection
                                toggleAandR={() => this.toggleAddandRemove()}
                                toggleAddmore={this.state.removeVideoVisibility}
                                selectVisible={this.state.selectVisiblity}
                                currentTab={this.state.presentTab}
                            />
                        </TabPanel>

                        <TabPanel style={{ padding: 20, backgroundColor: '#fff' }}>
                            <SaturdaySelection
                                toggleAandR={() => this.toggleAddandRemove()}
                                toggleAddmore={this.state.removeVideoVisibility}
                                selectVisible={this.state.selectVisiblity}
                                currentTab={this.state.presentTab}
                            />
                        </TabPanel>

                    </Tabs>


                    {(this.state.showtimepicker) ? 
                    
                    <div className="overlay">
                    <div className="timepicker1">

                    <p className="closetimeselection" onClick={() => this.closeSelectionbox()}><FaTimes /></p>
                    <p>Select Time Frame for this Video</p>

                    <div className="timepicker-wrappper">
                        <div className="timepicker-inner">
                            <span>Selected Interval: </span>
                            {selectedInterval.map((d, i) => (
                                <span key={i}>{format(d, "dd MMM, HH:mm")}</span>
                            ))}

                        </div>
                    </div>

                    <div className="timepicker-slider">
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

                    <div className="submitvideobtn">
                        <span onClick={() => this.displayForm()}> Submit</span>
                    </div>

                </div>
                    </div> :
                    <div></div>}
                    

                    {(this.state.showform) ? 
                        <SchedularForm 
                           presentTabprop={this.state.presentTab} 
                           selecteddayprop={selectedday} 
                           starttimeprop={format(this.state.selectedInterval[0], "HH:mm")} 
                           endtimeprop={format(this.state.selectedInterval[1], "HH:mm")}
                           selectedvideo ={this.state.submittingvideoid}
                           />
                     :
                    
                    <div></div>}
                </div>
                <div>
                    {(this.state.selectVisiblity) ? <div style={{}}>
                        {videos.map((video) =>
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
                                    <div className="admin_video_content_right_c">
                                        <span>Duration: {video.videoduration}</span>
                                        <span  onClick={() => this.selectTiming(video.videoid, video.videopersecond)}>Add</span> 
                                    </div>
                                </div>
                             </div>
                            </div>
                            
                            
                            
                            )}
                    </div> : <div></div>}
                </div>
            </div>
        );



    };

    fetchVideos = () => {
        //http://192.168.8.100/videostreaming/allvideos
        fetch('/videostreaming/alladminvideos.php', {
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
            //  console.log(responseJSON);
            }).catch((error)=>{
                //console.log(error)
            })
    }

    toggleAddandRemove = () => {
        this.state.selectVisiblity
            ? this.setState({ selectVisiblity: false })
            : this.setState({ selectVisiblity: true });

        this.state.removeVideoVisibility
            ? this.setState({ removeVideoVisibility: false })
            : this.setState({ removeVideoVisibility: true });

    }


    callbackFunction = (childData) => {
        this.setState({ presentTab: childData })
    }

    componentDidMount() {
        this.fetchVideos();

        this.interval = setInterval(() => this.fetchScheduledVideos(), 1000);
    }


    componentWillUnmount() {
        clearInterval(this.interval);

    }

 

    twocalls = (firstTab, second) => {
        this.setState({
            presentTab: firstTab
        })

        //this.sendData(firstTab)
    }

    selectTiming(vid, vpersecond) {
        this.setState({
            showtimepicker: true,
            submittingvideoid: vid
        })

    }

    displayForm() {
        this.setState({
            showtimepicker: false,
            showform:true
        })

    }

    closeSelectionbox() {
        this.setState({
            showtimepicker: false,
        })
    }

    fetchScheduledVideos = () => {
        //http://192.168.137.1/videostreaming/allvideos
        fetch('/videostreaming/scheduledvideos.php', {
            method: 'POST',
            
            body: JSON.stringify({
                accesstoken: 'iita-web-developers',
                selectedday: this.state.presentTab,
            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    isLoaded: true,
                    videodata: responseJSON['output'][0]['data'],
                });
                let test = responseJSON;
                
                //console.log(this.state.presentTab);


            })
    }




}



