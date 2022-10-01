import React, { Component } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import '../assets/css/videos.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FaEye, FaEyeSlash, FaSquare } from 'react-icons/fa'
import User1 from './../assets/images/user1.png'
import User2 from './../assets/images/user2.png'
import Eye from './../assets/images/eye.png'
import Thumbnaila from './../assets/images/thumbnaila.png'
import Thumbnailb from './../assets/images/thumbnailb.png'
import Thumbnailc from './../assets/images/thumbnailc.png'
import Thumbnaild from './../assets/images/thumbnaild.png'
import Thumbnailbgsm from './../assets/images/bgthumbnail2.png'
import Card from 'react-bootstrap/Card'
import IndexTabs from './components/IndexTabs'
import UploadVideoForm from './components/UploadVideoForm'
import Pagination from "react-js-pagination";


class Videos extends Component {
    constructor(){
        super();
        this.state={
            showmodal: false,
            showmodal2: false,
            isLoggedin: false,
            useremail: '',
            myvideos:[],
            allvideos:[],
            herovideo:[],
            nowprogram:[],
            heroprogram:[],
            allprogram:[],
            activePage: 1,
            allusers:[]
        }
     }

    componentDidMount(){
        this.getAllVideos();
        this.getAllUsers();
        this.getAllProgram();
        this.interval = setInterval(() => this.fetchChangeURL(), 1000);
        this.fetchStream();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

    render() {
        const {allvideos, nowprogram, herovideo, allprogram, heroprogram, allusers} = this.state;
        const fulldesc = nowprogram.videofulldescription;
        console.log(heroprogram.length);
        return (
            <div className="body">
                <Sidebar showmodal1={() => this.setShow(true)}/>
                <div className="content">
                <Header />
                <div className="page_container">
                    <div className="index_wrapper">
                       <div className="index_content">
                          <div className="admin_index_1">
                             <div className="index_title_b">
                                <p>Playing Now</p>
                             </div>
                              <div className="admin_index_1_left">
                                 <div className="admin_index_1_left_a">

                                 <Card className="bg-dark admin_index_left_a_content">
                                   <Card.Img src={Thumbnailbgsm} alt="image" className="admin_index_left_a_img"/>
                                   <div className="videoview_content_wrap"></div>
                                   <Card.ImgOverlay>
                                     <Card.Text>
                                       <div className="overlaycontent">
                                          <Link to={`/tv/index`} className="link"><span>Watch Now</span></Link>
                                       </div>
                                     </Card.Text>
                                   </Card.ImgOverlay>
                                 </Card>
                                  </div>
                                 <div className="admin_index_1_left_b">
                                    <div className="admin_index_left_b_top">
                                        <p><span className="redButton livebtn">Live</span></p>
                                        <p>{nowprogram.videotitle}</p>
                                        <p>Scheduled Playing Time: <b>{nowprogram.videostarttime}- {nowprogram.videoendtime}</b> <Link to={'/admin/schedular'} className="link"><span className="limeColor">Edit</span></Link></p>
                                    </div>
                                    {(allprogram.length > 0)?
                                    <div className="admin_index_left_b_bottom">
                                        <div className="upcoming_box_wrap">
                                           <p className="featured_next_admin"><span>next</span></p>
                                           <div className="upcoming_1">
                                           <div className="upcoming_box">
                                              <div className="upcoming_box_left1">
                                                 <span>{heroprogram.videotitle}</span>
                                                 <span>{heroprogram.videodescription}</span>
                                                 <span>{heroprogram.videostarttime} - {heroprogram.videoendtime}</span>
                                              </div>
                                              <div className="upcoming_box_right">
                                                 <span className="featured_next_ring"></span>
                                              </div>
                                           </div>
                                          </div>
                                       </div>
                                    </div>

                                   :<div></div> }
                                 </div>
                                 <div>
                            
                                 </div>
                              </div>
                              <div className="admin_index_1_right">
                                  <div className="admin_index_1_right_wrapper">
                                        <p>Overview</p>
                                        <div className="admin_index_1_right_box overview_box1">
                                            <div className="admin_index_1_right_box_a">
                                                <span><FaSquare/></span>
                                            </div>
                                            <div className="admin_index_1_right_box_b">
                                                <span>Users</span>
                                                <span>{allusers.length}</span>
                                            </div>
                                        </div>

                                        <div className="admin_index_1_right_box overview_box2">
                                            <div className="admin_index_1_right_box_a">
                                                <span><FaSquare/></span>
                                            </div>
                                            <div className="admin_index_1_right_box_b">
                                                <span>Total Videos</span>
                                                <span>{allvideos.length}</span>
                                            </div>
                                        </div>
                                  </div>
       
                              </div>
                          </div>

                          <div className="admin_index_two">
                            <IndexTabs/>
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
        );
    }
    getAllVideos(){
        fetch('/videostreaming/allvideos.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON['output'][0]['success'] == 'true') {
                    this.setState({
                        allvideos: responseJSON['output'][0]['data'],
                        herovideo:responseJSON['output'][0]['data'][0]
                    })
                }
            // console.log(responseJSON['output']);
            }).catch((error) =>{
               // console.log(error);
            })
    }

    getAllUsers(){
        fetch('/videostreaming/allusers.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON['output'][0]['success'] == 'true') {
                    this.setState({
                        allusers: responseJSON['output'][0]['users'],
                    })
                }
            // console.log(responseJSON['output']);
            }).catch((error) =>{
               // console.log(error);
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
                if (responseJSON['output'][0]['success'] == 'true') {
                    this.setState({
                        allprogram: responseJSON['output'][0]['data'],
                        heroprogram:responseJSON['output'][0]['data'][0]
                    })
                }
            // console.log(responseJSON);
            }).catch((error) =>{
               // console.log(error);
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
                    nowprogram: responseJSON['output'][0]['data'][0]
                  
                });
               // console.log(responseJSON);
                //this.seekto();

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
                if (responseJSON['output'][0]['data'][0].videofile === this.state.nowprogram.videofile) {

                } else {
                    this.setState({
                        isLoaded: true,

                        nowprogram: responseJSON['output'][0]['data'][0]
                    });
                    this.seekto();
                    // console.log(responseJSON);
                }
                 //console.log(responseJSON);

            })
    }
}

export default Videos;
