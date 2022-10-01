import React, { Component } from 'react';
import '../../assets/css/styles.css'
import AlertComponent from '../../reuseables/Alert'
import { format } from "date-fns";





export default class SchedularForm extends Component {
    constructor() {
        super();
        this.state = {
          startvideoat: '',
          endvideoat: '',
          togglealert:false,
          alerttitle:'', alertcontent:'', alerttype:'',
          videotitle:'',
        }

        this.handleStarttime = this.handleStarttime.bind(this);
        this.handleEndtime = this.handleEndtime.bind(this);
       
    }
    
    showAlert(e){
        this.setState({
            togglealert: e
        })
      }
    

    handleStarttime(event) {
        this.setState({
            startvideoat: event.target.value
        });
    }

    handleEndtime(event) {
        this.setState({
            endvideoat: event.target.value
        });
    }


    handleTitle(event) {
        this.setState({
            videotitle: event.target.value
        });
    }


    handleInitialTitle(){
        this.setState({
            videotitle: this.props.videotitle
        });
    }


    submitSelections() {
        let starttime = this.props.starttimeprop;
        let endtime = this.props.endtimeprop;

        fetch('/videostreaming/addselection.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                selectedvideo: this.props.selectedvideo,
                selectedday: format(this.props.starttimepropfull, "yyyy-MM-dd"),
                startvideoat: this.state.startvideoat,
                endvideoat: this.state.endvideoat,
                starttime,
                endtime,
                videotitle:this.state.videotitle,

            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {

               // alert(responseJSON);
                this.showAlert(true);
               
                if(responseJSON =='success'){
                    this.setState({
                        alerttitle:'Success', alertcontent:'The program has been scheduled', alerttype:'success'
                     })
                     setTimeout(() => {
                        window.location.reload();
                     }, 2000);
                }else if (responseJSON =='failed') {
                    this.setState({
                        alerttitle:'Failed', alertcontent:'Please select another time frame for this programme', alerttype:'warning'
                     })
                }else if (responseJSON =='errortiming') {
                    this.setState({
                        alerttitle:'Timeframe Error', alertcontent:'The selected timeframe is greater than the programme duration', alerttype:'warning'
                     })
                }
               setTimeout(() => {
                this.showAlert(false);
              }, 5000);

            })



    }


    render() {
        const {togglealert, alertcontent, alerttype, alerttitle} = this.state; 
        
        var someDate = new Date();
var numberOfDaysToAdd = 3;
var date = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);  
        return (
            <div className="overlay">
            {(this.state.togglealert == true) ? 
                  <div className="uploadalert">
                    <AlertComponent 
                      title={alerttitle}
                      showalert={togglealert} 
                      content={alertcontent}
                      type={alerttype}
                      closealert={() => this.showAlert(false)}/>
                  </div> : <div></div>} 
         <div className="timepicker">
            <div className="form_wrapper">
                <div className="form_title">
                    <p>Schedule Programme {this.props.selectedvideo}</p>
                </div>
           
                <div className="form_box">
                    <label>Program Title:</label>
                    <input type="text"  value={this.state.videotitle} onChange={this.handleTitle.bind(this)} />
                </div>

                <div className="form_box">
                    <label>Scheduled Date:</label>
                    <input type="date"  value={format(this.props.starttimepropfull, "yyyy-MM-dd")} />
                </div>

                <div className="form_box">
                    <label>Start Time:</label>
                    <input type="time" value={this.props.starttimeprop} />
                </div>

                <div className="form_box">
                    <label>End Time:</label>
                    <input type="time"  value={this.props.endtimeprop}/>
                </div>

                {/* <div className="form_subtitle">
                    <p>djdjdjd</p>
                    <p>{this.props.starttimefull}</p>
                    
                </div> */}

                

                

                
                <div className="form_subtitle">
                    <p>Specify Programme Start and End Duration in Minutes</p>
                </div>
                <div className="form_box">
                    <label>Start From:</label>
                    <input type="text"  placeholder="" value={this.state.startvideoat} onChange={this.handleStarttime}/>
                </div>

                <div className="form_box">
                    <label>End At:</label>
                    <input type="text"  placeholder="" value={this.state.endvideoat} onChange={this.handleEndtime}/>
                </div>

                <div className="form_subtitle2">
                    <button onClick={() => this.submitSelections()}>Submit</button>
                </div>

            </div>

        </div>
            </div>


        );



    };




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
        this. handleInitialTitle();
    }



}



