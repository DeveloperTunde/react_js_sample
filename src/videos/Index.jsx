import React, { Component, useEffect, useState, useRef} from 'react';
import ReactPlayer from 'react-player/lazy'
import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../assets/css/styles.css'
import '../assets/css/styles.css'
import '../assets/css/mobiles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  FaEye, FaEyeSlash, FaSquare, FaDotCircle, FaAngleRight, FaLongArrowAltLeft, FaTimes, FaPlay } from 'react-icons/fa'
import User1 from './../assets/images/user1.png'
import Card from 'react-bootstrap/Card'
import Thumbnailbgsm from './../assets/images/bgthumbnail2.png'
import Pagination from "react-js-pagination";
import TvView from '../components/TvPlayerIndex';
import ModalComponent from '../reuseables/Modal'
import IITARadio from './../assets/images/iitaradio.jpg'



function Index()  {
 
     
 const [isrightside, settoggleRightsidebar] = useState('desktop_display');
 const [isleftsidebar, settoggleLeftSidebar] = useState('desktop_display');
 const [isAllprogAvai, IsAllprogAvai] = useState(false);
 const [isLoaded, IsLoaded] = useState(false);

 const [ismodal, showModal] = useState(false);
 const [modaldata, setModalData] = useState(false);


 
 const [allvideos, allVideos] = useState([]);
 const [allcategories, allCategory] = useState([]);
 const [currentPage, setCurrentPage] = useState(2);
const [currentvideos, currentVideos] = useState([]);

 const [herovideo, heroVideo] = useState([]);

 const [nowprogram, nowProgram] = useState([]);
 const [nowprogramvid, nowProgramVid] = useState([]);
 const [heroprogram, heroProgram] = useState([]);
 const [allprogram, allProgram] = useState([]);


 useEffect(() =>{
    setCurrentVideos();
  }, [currentPage]);


function handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    setCurrentPage(pageNumber);
  }

  let PageSize = 6;
  if (currentPage == 1) {
     PageSize = 7;
  }
  const rangeCount = allvideos.length/PageSize;

  function setCurrentVideos(){
    const lastPageIndex = currentPage * PageSize;
    const firstPageIndex = lastPageIndex - PageSize;
    currentVideos(allvideos.slice(firstPageIndex, lastPageIndex));
  }




function toggleRightSidebar(){

        if (isleftsidebar == 'mobile_display') {
            settoggleLeftSidebar('desktop_display');
        }

        if (isrightside == 'desktop_display') {
            settoggleRightsidebar('mobile_display');
        }else{
            settoggleRightsidebar('desktop_display');
        }
    }

function toggleLeftSidebar(){

        if (isleftsidebar == 'desktop_display') {
            settoggleLeftSidebar('mobile_display');
        }else{
            settoggleLeftSidebar('desktop_display');
        }
    }



    useEffect(() => {
        getAllVideos();
        getAllProgram();
        fetchStream();
      }, []);

      useEffect(() => {
        const interval = setInterval(() => fetchChangeURL(), 1000);
        return () => clearInterval(interval); 
      } );
    
    
//   const ref = useRef(null);
   
//    function seekto()  {
//         ref.current.seekTo(nowprogramvid.startvideoat, 'seconds');
//        // alert('aaaa');

//        //fjfj
//     }


    


        return (
            <div className="body">
                <Sidebar leftsidebar={isleftsidebar}  closeLeftSidebar={() => toggleLeftSidebar()}/>
                <div className="content-2">
                <Header openLeftSidebar={() => toggleLeftSidebar()} />

                <ModalComponent 
                   closeSideModal = {() => showModal(false)}
                   data = {modaldata}
                   showthismodal= {ismodal}
                />
                <div className="mobile_top_happening mobile_display">
            
                   {
                    nowprogram.filter((el, i) => (i === 0 ))
                    .map((prog, index) => {
                    return <div className="mobile_happening_left">       

                            <Card className="mobile_happening_left_a">
                                   <Card.Img src={Thumbnailbgsm} alt="image" className="mobile_happening_left_a_img"/>
                                   <div className="videoview_content_wrap"></div>
                                   <Card.ImgOverlay>
                                     <Card.Text>
                                       <div className="overlaycontent-sm">
                                          <Link to={`/tv/index`} className="link"><span>watch</span></Link>
                                       </div>
                                     </Card.Text>
                                   </Card.ImgOverlay>
                            </Card>

                     <div className="mobile_happening_left_b">
                        <div className="mobile_happening_l_top">
                            <span>IITA TV</span>
                            <span>Happening Now</span>
                        </div>
                        <div className="mobile_happening_l_bottom">
                             <div className="mobile_happening_bottom_c">
                                      <span><b>.</b>Live</span>
                                      <span>{prog.videotitle.substring(0,16)+"..."}</span>

                              </div>
                        </div>
                     </div>
                    </div>
                   })
                               
                }
                   <div className="mobile_happening_right" onClick={() => toggleRightSidebar()}>
                      <span>next programs</span> <span><FaAngleRight/></span>
                   </div>
                </div>
                <div className="page_container">
                   <div className="videoview_wrapper">
                        <div className="videoview_left" >

                      
                            <div className="videoview_left_top">
                                
                                <div className="">
                                 <TvView className=""/>
                                 </div>
                                <div className="videoview_left_content primaryColor">
                                    
                                    <p>{nowprogramvid.videotitle}</p>
                                    
                                    <p className="interlight">{nowprogramvid.videofulldescription}</p>
                                    
                                </div>
                            </div>
                    



                            {/* <div className="videoview_left_btm">
                            
             {
              allcategories.map((category,index) => 
                  <div className="categorised">
                     <div className="featured_videos_title"> 
                  <span>{category.categoryname}</span>
                  <span><Link to={`videos/category/${category.categoryname}`} className="link">See More</Link></span>
              </div> 

            { 
                allvideos.filter(cate => cate.VideoCategory == category.categoryname).map((video,i) =>
                <Link  to={`/videoview/${video.videoid}`}><div className="video_box2" key={i}>
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
                        <span className="span_description">{video.videodescription} </span>
                        <div className="video_content_right_b">
                            <span><FaEye/></span>
                            <span>{video.numberofviewers}views .</span>
                            <span>{video.daysago}</span> 
                        </div>
                    </div>
                </div>
            </div>
            </Link>)
            }

        </div>
    )
}
                            </div> */}


                        </div>


                        
                        <div className={"videoview_right "+(isrightside)}>

                         {/* <div className="videoview_side_top desktop_display">
                            <div className="featured_videos_title2"> 
                                <span>Happening Now</span>
                                <span>IITA TV</span>

                               
                            </div>
                            {
                                 nowprogram.filter((el, i) => (i === 0 ))
                                 .map((prog, index) => {
                                  return <div>
                                     <Card className="videoview_side_video">
                                   <Card.Img src={Thumbnailbgsm} alt="image" className="admin_index_left_a_img"/>
                                   <div className="videoview_content_wrap"></div>
                                   <Card.ImgOverlay>
                                     <Card.Text>
                                       <div className="overlaycontent-sidebar">
                                          <Link to={`/tv/index`} className="link"><span>Watch Now</span></Link>
                                       </div>
                                     </Card.Text>
                                   </Card.ImgOverlay>
                                 </Card>
                                
                                <div className="videoview_side_content">

                                   <div className="side_content">
                                      <span><b>.</b>Live</span>
                                      <span>{prog.videotitle}</span>
                                      <span>{prog.videofulldescription.substring(0,300)+"..."}</span>
                                   
                                   </div>


                                    
                                </div>
                                  </div>
                                 })
                               
                                }
                                
                            </div> */}

                            <div className="videoview_side_btm">
                                <div className="videoview_side_btm_close mobile_display">
                                   <span onClick={() => toggleRightSidebar()}><FaTimes/></span>
                                </div>
                               <div className="featured_videos_title3"> 
                               {(isAllprogAvai)?<span>Upcoming Programs</span>:<span></span>}
                               </div>

                               {
                                (isAllprogAvai)?
                                <div className="upcoming_box_wrap" onClick={() => openSideModal(heroprogram)}>
                               <span className="featured_next">next </span>
                               <div className="upcoming_1">
                               <div className="upcoming_box">
                                  <div className="upcoming_box_left">
                                     <span>{heroprogram.videotitle}</span>
                                     {/* <span>{heroprogram.videodescription}</span> */}
                                     <span>{heroprogram.videostarttime} - {heroprogram.videoendtime} <span className="upcoming_box_left_sm">{heroprogram.day}</span> </span>
                                  </div>
                                  <div className="upcoming_box_right">
                                     <span className="featured_next_ring"></span>
                                  </div>
                               </div>
                               </div>
                             </div>
                             : <span></span>
                               }
                               
                               
                               {
                             allprogram.slice(1, allprogram.length).map((program, i) =>{
                               return <div className="upcoming_box_wrap" onClick={() => openSideModal(program)}>
                                 <div className="upcoming_box">
                                    <div className="upcoming_box_left">
                                    <span>{program.videotitle}</span>
                                       {/* <span>{program.videodescription}</span> */}
                                       <span>{program.videostarttime} - {program.videoendtime} <span className="upcoming_box_left_sm">{program.day}</span></span>
                                    </div>
                                    <div className="upcoming_box_right">
                                       <span></span>
                                    </div>
                                 </div>
                               </div>


                             })
                            }
                              
                            </div>


                           <a href='https://radio.iita.org/' target="_blank">
                                <div className="rightsider_advert">
                                     <img src={IITARadio} />
                                 </div>
                           </a>
                        </div>

                       




                       
                   </div>
                </div>
                </div>
            </div>
        );

    

   function getAllVideos(){
        fetch('/videostreaming/allvideos.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON['output'][0]['success'] = true) {
                   
                    allVideos(responseJSON['output'][0]['data']);
                    heroVideo(responseJSON['output'][0]['data'][0]);
                    allCategory(responseJSON['output'][0]['cat']);
                    setCurrentPage(1);
                }

                setCurrentVideos();
            // console.log(responseJSON);
            }).catch((error) =>{
                console.log(error);
            })
    }


   function getAllProgram(){
        fetch('/videostreaming/allprograms.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON['output'][0]['success'] === 'true') {
                    allProgram(responseJSON['output'][0]['data']);
                    heroProgram(responseJSON['output'][0]['data'][0]);
                    IsAllprogAvai(true)
                }
             console.log(responseJSON);
            }).catch((error) =>{
                console.log(error);
            })
    }


   function fetchStream () {
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
               
                IsLoaded(true);
                nowProgram(responseJSON['output'][0]['data']);
                nowProgramVid(responseJSON['output'][0]['data'][0]);
                //console.log(responseJSON);
              
              

            })
    }



    function fetchChangeURL() {
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
                if (responseJSON['output'][0]['data'][0].videofile === nowprogram[0].videofile) {

                } else {
                    IsLoaded(true);
                    nowProgram(responseJSON['output'][0]['data']);
                    nowProgramVid(responseJSON['output'][0]['data'][0]);
                    if (isLoaded) {
                      //  seekto();
                    }
                   // console.log(responseJSON);
                }
                 //console.log(responseJSON);

            })
    }

   

   function openSideModal (data) {
    
          showModal(true);
          setModalData(data);
        
       
    }
}

export default Index;
