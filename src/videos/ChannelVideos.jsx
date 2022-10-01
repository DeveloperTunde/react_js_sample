import React, { Component } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../assets/css/videos.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch,  FaEye, FaEyeSlash , FaPlay, FaCog} from 'react-icons/fa'
import User1 from './../assets/images/user1.png'
import Card from 'react-bootstrap/Card'
import Thumbnailbg from './../assets/images/bgthumbnail2.png'
import AlertComponent from '../reuseables/Alert'
import Loader from '../assets/images/loader.gif'
import PlayList from '../assets/images/playlist.svg'

class Videos extends Component {
    constructor(){
        super();
        this.state={
            channelvideos:[],
            channelprops:[],
            isrightside:'desktop_display',
            isleftsidebar:'desktop_display',
            togglealert:false,
            alerttitle:'', alertcontent:'', alerttype:'',
            allsub: 0,
            btn1:'Subscribe',
            btn2:'Unsubscribe',
            opensettings:false,
            showvideos:false,
            allcategories:[],
            loadcatevideos:false,
            loadingCateVideos:true,
            channelcategoryvideos:[],
        }
    }


    componentDidMount(){
        this.getChannelVideos();
    }


showAlert(e){
    this.setState({
        togglealert: e
    })
 }
 toggleSettings =() =>{
    this.setState(prevState => ({
        opensettings: !prevState.opensettings
      }));
 }
 handleShowCatVid = () =>{
     this.setState(prevState =>({
        loadcatevideos: !prevState.loadcatevideos
     }))
 }

 toggleType = () =>{
    this.setState(prevState =>({
       loadcatevideos: !prevState.loadcatevideos,
       showvideos:!prevState.showvideos
    }))
}
    render() {
        const {channelvideos, channelprops, alerttitle,togglealert, alertcontent, alerttype}  = this.state;
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
                    <div className="index_wrapper">
                       <div className="index_title2">
                          <p>{channelprops.channelname}</p>
                       </div>
                       
                       <div className="user_wrapper2">
                       <div className="channel_banner">
                            <img src={channelprops.channelbanner} />
                       </div>

                       <div className="channel_header">
                            <div className="channel_header_left">
                                <div className="channel_header_left_a">
                                   <img src={channelprops.channellogo} />
                                </div>
                                <div className="channel_header_left_b">
                                    <span>{channelprops.channelowner}</span>
                                    <span>{this.state.allsub} Subscriber{(this.state.allsub > 1)?'s':''}</span>
                                </div>
                                <div className='channel_header_left_c'>
                                 <div className="channel_header_right_b">
                                    <span className="secondaryButton span_padding"  onClick={() => this.toggleType()}>  {
                                        (this.state.showvideos) ? 'Playlists': 'All Videos'
                                    } </span>
                                  </div>
                               </div>
                            </div>


                            

                            
                            
                            {
                               (channelprops.substatus =='yes')? 
                               <div className="channel_header_right"  >
                                   
                                  {(channelprops.channelemail == sessionStorage.getItem('userReg') )?
                                    <div className="channel_header_right_a">
                                    <span ><FaCog className="settingicon" onClick={() => this.toggleSettings()}/> </span>
                                    {(this.state.opensettings)?
                                     <ul>
                                         <Link to={`/editchannel/${channelprops.channelid}`} className="link"> <li> <span className="primaryColor">Edit </span></li></Link>
                                         <li> <span className="" onClick={() => this.deleteChannel()} >Delete </span></li>
                                        
                                     </ul>
                                    :''
                                    }
                                </div>
                                 :''}
                                 <div className="channel_header_right_b">
                                    <span className="primaryButton span_padding" onClick={() => this.channelUnsubscription(channelprops.channelid)}>{this.state.btn2} </span>
                                  </div>
                              </div>
                               :
                               <div className="channel_header_right" >
                                  {(channelprops.channelemail == sessionStorage.getItem('userReg') )?                
                                    
                                  <div className="channel_header_right_a">
                                      <span ><FaCog className="settingicon" onClick={() => this.toggleSettings()}/> </span>
                                      {(this.state.opensettings)?
                                       <ul>
                                            <Link to={`/editchannel/${channelprops.channelid}`} className="link"><li><span className="primaryColor">Edit </span></li></Link>
                                           <li> <span className="" onClick={() => this.deleteChannel()} >Delete </span></li>
                                          
                                       </ul>
                                      :''
                                      }
                                  </div>
                                  :''}
                                  <div className="channel_header_right_b">
                                    <span className="primaryButton span_padding" onClick={() => this.channelSubscription(channelprops.channelid)}>{this.state.btn1} </span>
                                  </div>
                               </div>
                            }
                       </div>

                        {
                      (!this.state.showvideos)? 
                     
                         <div>
                              {/* <span>{category.category}</span> */}
                            {(!this.state.loadcatevideos)?
                            this.state.allcategories.map((category, i) =>{
                                return <div className="" onClick={() =>this.handleFetchCatVid(category.category)} style={{cursor:'pointer'}}>
                               <div className='playlist-box'>
                                  <div className="playlist-top">
                                   <span>{category.category}</span> 
                                  </div>
                                  <div className='playlist-bottom'>
                                    <span> <img src={PlayList} alt="" /> </span>
                                    <span>{category.counter} Videos</span>
                                  </div>
                               </div>
                             
                           </div>
                            })
                        
                             :
                             <div>
                                 <div className='closebtn-channel'>
                                   <span onClick={this.handleShowCatVid}>Close</span>
                                 </div>
                                 {
                                     (this.state.loadingCateVideos)?
                                     <span style={{textAlign:'center'}}>
                                         <img src={Loader} />
                                     </span>
                                     :
                                     this.state.channelcategoryvideos.map((video, i) =>{
                                        return <Link  to={`/videoview/${video.videoid}`}> <div className="video_box">
                                              <Card className="video_box_img">
                                                <Card.Img src={video.videothumbnail} alt="image" className="admin_index_left_a_img"/>
                                                <div className="videoview_content_wrap"></div>
                                                <Card.ImgOverlay>
                                                  <Card.Text>
                                                    <div className="overlaycontent-index">
                                                      <span><FaPlay/></span>
                                                    </div>
                                                  </Card.Text>
                                                </Card.ImgOverlay>
                                              </Card>
                                             <div className="video_box_content">
                                                 <div className="video_box_content_left">
                                                     <img src={video.profilepicture} alt="image" />
                                                 </div>
                                                 <div className="video_box_content_right">
                                                     <span className="span_title">{video.videotitle}</span>
                                                     <span>{video.videodescription}</span>
                                                     <div className="video_content_right_b">
                                                         <span><FaEye/></span>
                                                         <span>{video.numberofviewers}views .</span>
                                                         <span>{video.daysago}</span> 
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                         </Link>
                                    })   
                                 }
                             </div>
                            }
                        </div>
                       
                     
                      :
                      channelvideos.map((video, i) =>{
                        return <Link  to={`/videoview/${video.videoid}`}> <div className="video_box">
                              <Card className="video_box_img">
                                <Card.Img src={video.videothumbnail} alt="image" className="admin_index_left_a_img"/>
                                <div className="videoview_content_wrap"></div>
                                <Card.ImgOverlay>
                                  <Card.Text>
                                    <div className="overlaycontent-index">
                                      <span><FaPlay/></span>
                                    </div>
                                  </Card.Text>
                                </Card.ImgOverlay>
                              </Card>
                             <div className="video_box_content">
                                 <div className="video_box_content_left">
                                     <img src={video.profilepicture} alt="image" />
                                 </div>
                                 <div className="video_box_content_right">
                                     <span className="span_title">{video.videotitle}</span>
                                     <span>{video.videodescription}</span>
                                     <div className="video_content_right_b">
                                         <span><FaEye/></span>
                                         <span>{video.numberofviewers}views .</span>
                                         <span>{video.daysago}</span> 
                                     </div>
                                 </div>
                             </div>
                         </div>
                         </Link>
                    })   
                    }

                       </div>
                    </div>
                  
                </div>
                </div>
            </div>
        );
    } 


     deleteChannel(chid){
        if (window.confirm("Are you sure you want to delete this channel?")) {
            fetch('/videostreaming/deletechannel.php', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  chid: chid
              })
          })
      
              .then((response) => response.text())
              .then((responseJSON) => {
                window.location = '/user/3';
                //console.log(responseJSON);
              }).catch((error) =>{
                console.log(error);
              })
          }
    }
    
    getChannelVideos = () => {
        let useremail = sessionStorage.getItem('userReg');
        fetch('/videostreaming/channelvideos.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channelid: this.props.match.params.id,
                useremail: useremail,
            })
        })

            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON['output'][0]['success'] == 'true') {
                    this.setState({
                        channelvideos: responseJSON['output'][0]['data'],
                    })
                }
                this.setState({
                    channelprops : responseJSON['output'][0],
                    allsub:  responseJSON['output'][0]['allsubscription'],
                    allcategories:responseJSON['output'][0]['categories'],

                })
                console.log(responseJSON['output'][0]);
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


    channelSubscription = (e) => {
        let useremail = sessionStorage.getItem('userReg');
        if (useremail != null) {
            
        this.setState({
            btn1:'Unsubscribe'
        })
         fetch('/videostreaming/channelsubscription.php', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 useremail: useremail,
                 channelid: e
             })
         })
     
             .then((response) => response.json())
             .then((responseJSON) => {
              let response = responseJSON['output'][0]['data'];
              if (response == 'success') {
                 this.setState({
                    alerttitle:'Success!', alertcontent:'You have successfully suscribed to the channel', alerttype:'success'
                 })
              }else if(response == 'failed'){
                 this.setState({
                    alerttitle:'Failed!', alertcontent:'Unable to process your request at the moment. Try again later', alerttype:'warning'
                 })
              }else{
                 this.setState({
                    alerttitle:'Failed!', alertcontent:'Sorry. An error occur while trying to process the request', alerttype:'warning'
                 })
              }
              
            setTimeout(() => {
              window.location.reload();
            }, 2000);
     
            
               console.log(responseJSON);
             })

            }else{
                this.showAlert(true);
                this.setState({
                   alerttitle:'Failed!', alertcontent:'You have to login before subscribing to the channel', alerttype:'danger'
                })
               }
     }
     
     
     channelUnsubscription = (e) => {
        let useremail = sessionStorage.getItem('userReg');
        this.setState({
            btn2:'Subscribe'
        })
         fetch('/videostreaming/channelunsubscription.php', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 useremail: useremail,
                 channelid: e
             })
         })
     
             .then((response) => response.json())
             .then((responseJSON) => {
              let response = responseJSON['output'][0]['data'];
              if (response == 'success') {
                 this.setState({
                    alerttitle:'Success!', alertcontent:'You have successfully unsuscribed from the channel', alerttype:'success'
                 })
              }
     
            setTimeout(() => {
              window.location.reload();
            }, 2000);
     
            
               console.log(responseJSON);
             })
     }


     handleFetchCatVid(e){
        this.setState(prevState =>({
            loadcatevideos: !prevState.loadcatevideos
         }))

         fetch('/videostreaming/channelcategory.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: e,
                channel: this.state.channelprops.channelid,
          })
        })
    
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON['output'][0]['success'] = true) {
                   this.setState({
                    channelcategoryvideos:responseJSON['output'][0]['data'],
                    loadingCateVideos:false
                   })
                }
           
            }).catch((error) =>{
                console.log(error);
            })

        }

}

export default Videos;
