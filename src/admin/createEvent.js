import React from 'react'
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar'
import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import events from './events'
import ExampleControlSlot from './ControlSlot'
import _ from 'lodash'
import { format } from "date-fns";
import moment from 'moment'
import 'moment/locale/nb';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import SchedularForm from './components/SchedularForm';
import { FaPlus, FaFile, FaPlay, FaTimes, FaVideo } from 'react-icons/fa'
import Card from 'react-bootstrap/Card'
import axios from 'axios'


const propTypes = {}

class CreateEventWithNoOverlap extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      events: _.cloneDeep(events),
      dayLayoutAlgorithm: 'no-overlap',
      starttimefull:'',
      endtimefull:'',
      titleful:'',
      showform:false,
      selectVisiblity: false,
      videos: [],
      submittingvideoid:'',
      isLoaded: false,
      videodata:[1, 2, 2, 3],
    }
  }




  componentDidMount() {
    this.fetchVideos();
    //this.fetchPrograms();
    this.interval = setInterval(() => this.fetchScheduledVideos(), 1000);
}


componentWillUnmount() {
    clearInterval(this.interval);

}


/*
fetchPrograms = async() =>{

  const response = await axios.post('/videostreaming/selectionlist.php')
        .catch((err) =>{
            console.log(err);
        })
    console.log(response);
}
*/


fetchScheduledVideos = () => {
    //http://192.168.137.1/videostreaming/allvideos
    fetch('/videostreaming/scheduledprograms.php', {
        method: 'POST',
        
        body: JSON.stringify({
            accesstoken: 'iita-web-developers',
        })
    })

        .then((response) => response.json())
        .then((responseJSON) => {
            this.setState({
                isLoaded: true,
                videodata: responseJSON['output'][0]['data'],
            });
            //console.log(responseJSON['output'][0]['data']);
            
            


        })
}


toggleAddVideo = () => {
    this.setState((prevState) =>( {
        selectVisiblity : !prevState.selectVisiblity
    }))
}

selectTiming(vid, vpersecond, title) {
    this.setState({
        submittingvideoid: vid,
       titleful:title,
    })
    this.toggleAddVideo();
   
}
  displayForm() {
    this.setState({
        showform:true
    })

}




  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Program name', this.state.titleful)
    if (title)
     
      if(this.state.submittingvideoid !=''){
        this.setState({
          events: [
            ...this.state.events,
            {
              start,
              end,
              title,
            },
          ],
          starttimefull: start,
          endtimefull: end,
          titleful:title
        })
  
        setTimeout(() => {
          this.displayForm();
        }, 1000);
      }else{
        alert('Please select a video to schedule')
      }
  }

  handleEventClick = (id) =>{
     
    if(window.confirm('Do you wish to remove this program from selection?')){
      fetch('/videostreaming/deleteselection.php', {
        method: 'POST',
        
        body: JSON.stringify({
            selectedvideodel: id,
        })
    })

        .then((response) => response.json())
        .then((responseJSON) => {

          alert(responseJSON + "! The program has been removed")
            
        })
    }else{
        
    }
  }

  render() {
  
    const locales = {
        'en-US': enUS,
      }
      
      const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
      })



    let eventss =  
       this.state.videodata.map((prog) =>(
        {
          id: prog.streamid,
          title: prog.programtitle,
          start: new Date(prog.start),
          end: new Date(prog.end),
        }
       ))
      
       //console.log(this.state.videodata);
      //console.log(this.state.events)
        
      
    return (

      <div>
           {
             (!this.state.selectVisiblity)?
             <div className="addmorebtn-toggle" onClick={this.toggleAddVideo} style={{marginBottom:'3vh', cursor:'pointer'}}>
                <div className="addmorebtn-toggle-inner-2">
                          <p><FaVideo/></p>
                          <p>Select Video</p>
                      </div>       
            </div>
            :
            <div className="addmorebtn-toggle" onClick={this.toggleAddVideo} style={{marginBottom:'3vh', cursor:'pointer'}}>
            <div className="addmorebtn-toggle-inner-2" style={{backgroundColor:'tomato'}}>
                      <p><FaTimes/></p>
                      <p>Close</p>
                  </div>       
            </div>
           }
          


              
                     <div>
                  {(this.state.selectVisiblity) ? <div style={{}}>
                      {this.state.videos.map((video) =>
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
                                      <span  onClick={() => this.selectTiming(video.videoid, video.videopersecond, video.videotitle)} style={{cursor:'pointer'}}>Add</span> 
                                  </div>
                              </div>
                           </div>
                          </div>
                          
                          
                          
                          )}
                  </div> : <div></div>}
              </div>
      <div style={{height:'100vh', float:'left', width:'90%', marginLeft:'2%', marginBottom:'20vh'}}>
                  

       
                



                 
        <ExampleControlSlot.Entry waitForOutlet>
          <strong>
            Click an event to see more info, or drag the mouse over the calendar
            to select a date/time range.
            <br />
            The events are being arranged by `no-overlap` algorithm.
          </strong>
        </ExampleControlSlot.Entry>
        <Calendar
          selectable
          localizer={localizer}
          events={eventss}
          defaultView={Views.WEEK}
          scrollToTime={new Date(2022, 1, 8, 6)}
          defaultDate={new Date(2022, 1, 12)}
          //defaultDate={moment().toDate()}
          onSelectEvent={event => this.handleEventClick(event.id)}
          onSelectSlot={this.handleSelect}
          dayLayoutAlgorithm={this.state.dayLayoutAlgorithm}
        />

                   

                     {(this.state.showform) ? 
                        <SchedularForm 
                           presentTabprop={this.state.presentTab} 
                           starttimeprop={format(this.state.starttimefull, "HH:mm")} 
                           endtimeprop={format(this.state.endtimefull, "HH:mm")}
                           starttimepropfull={this.state.starttimefull} 
                           endtimepropfull={this.state.endtimefull}
                           selectedvideo ={this.state.submittingvideoid}
                           videotitle={this.state.titleful}
                           />
                     :
                    
                    <div></div>}
      </div>
      </div>
    )
  }


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



}

CreateEventWithNoOverlap.propTypes = propTypes

export default CreateEventWithNoOverlap

