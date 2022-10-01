import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactPlayer from 'react-player/lazy'
import '../../assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import {FaTimes} from 'react-icons/fa';
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

const now = new Date()
const getTodayAtSpecificHour = (hour = 7) =>
    set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const selectedStart = getTodayAtSpecificHour()
const selectedEnd = getTodayAtSpecificHour(8)

const startTime = getTodayAtSpecificHour(0)
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
            sunday: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
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
        this.interval = setInterval(() => this.fetchSunday(), 1000);
        this.interval2 = setInterval(() => this.fetchMonday(), 1000);
        this.interval3 = setInterval(() => this.fetchTuesday(), 1000);
        this.interval4 = setInterval(() => this.fetchWednesday(), 1000);
        this.interval5 = setInterval(() => this.fetchThursday(), 1000);
        this.interval6 = setInterval(() => this.fetchFriday(), 1000);
        this.interval7 = setInterval(() => this.fetchSaturday(), 1000);

        this.interval8 = setInterval(() => this.fetchScheduledVideos(), 1000);
    }


    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.interval2);
        clearInterval(this.interval3);
        clearInterval(this.interval4);
        clearInterval(this.interval5);
        clearInterval(this.interval6);
        clearInterval(this.interval7);
        clearInterval(this.interval8);
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
                //let test = responseJSON['output'][0]['data'];
                //console.log(test);
                //console.log(this.state.presentTab);


            })
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
            start: getTodayAtSpecificHour(x.starttime), end: getTodayAtSpecificHour(x.endtime)
        }))





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
                            <div key={video.videoid} className="video_box">

                                <div className="select-wrapper">
                                    <ReactPlayer
                                        style={{ position: 'relative', top: 0, left: 0, }}
                                        url={video.videourl}
                                        width='100%'
                                        height='17vh'
                                        playing={false}
                                        controls={true}
                                    />
                                    <div>
                                        <Button outline color="dark" onClick={() => this.selectTiming(video.videoid, video.videopersecond)}>
                                            add video
                                     </Button>
                                    </div>
                                </div>
                            </div>)}
                    </div> : <div></div>}
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

            .then((response) => response.text())
            .then((responseJSON) => {
                // this.setState({

                //     sunday: responseJSON['output'][0]['data'],
                // })
                console.log(responseJSON);
            })
    }


    fetchMonday = () => {
        //http://192.168.8.100/videostreaming/allvideos
        fetch('/videostreaming/selectionlist.php', {
            method: 'POST',
            
            body: JSON.stringify({
                fetchday: 1

            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({

                    monday: responseJSON['output'][0]['data'],
                })
            })
    }


    fetchTuesday = () => {
        //http://192.168.8.100/videostreaming/allvideos
        fetch('/videostreaming/selectionlist.php', {
            method: 'POST',
            
            body: JSON.stringify({
                fetchday: 2

            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({

                    tuesday: responseJSON['output'][0]['data'],
                })
            })
    }


    fetchWednesday = () => {
        //http://192.168.8.100/videostreaming/allvideos
        fetch('/videostreaming/selectionlist.php', {
            method: 'POST',
            
            body: JSON.stringify({
                fetchday: 3

            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({

                    wednesday: responseJSON['output'][0]['data'],
                })
            })
    }

    fetchThursday = () => {
        //http://192.168.8.100/videostreaming/allvideos
        fetch('/videostreaming/selectionlist.php', {
            method: 'POST',
            
            body: JSON.stringify({
                fetchday: 4

            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({

                    thursday: responseJSON['output'][0]['data'],
                })
            })
    }


    fetchFriday = () => {
        //http://192.168.8.100/videostreaming/allvideos
        fetch('/videostreaming/selectionlist.php', {
            method: 'POST',
            
            body: JSON.stringify({
                fetchday: 5

            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({

                    friday: responseJSON['output'][0]['data'],
                })
            })
    }


    fetchSaturday = () => {
        //http://192.168.8.100/videostreaming/allvideos
        fetch('/videostreaming/selectionlist.php', {
            method: 'POST',
            
            body: JSON.stringify({
                fetchday: 6

            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({

                    saturday: responseJSON['output'][0]['data'],
                })
            })
    }





}



