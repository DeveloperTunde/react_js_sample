import React, { Component, useState, useEffect} from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../assets/css/videos.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaShare, FaEye, FaEyeSlash, FaPlay } from 'react-icons/fa'
import User1 from './../assets/images/user1.png'
import Pagination from "react-js-pagination";
import Card from 'react-bootstrap/Card'

function Videos(props) {
    useEffect(() => {
        getAllVideos();
        
      }, []);
    
      const [allvideos, allVideos] = useState([]);

      
      const [herovideo, heroVideo] = useState([]);
      const [currentPage, setCurrentPage] = useState(2);
    
      const [currentvideos, currentVideos] = useState([]);

      const [isleftsidebar, settoggleLeftSidebar] = useState('desktop_display');
    
      useEffect(() =>{
        setCurrentVideos();
      }, [currentPage]);
    

    function handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        setCurrentPage(pageNumber);
      }

  

      const PageSize = 8;
      const rangeCount = allvideos.length/PageSize;
  
      function setCurrentVideos(){
        const lastPageIndex = currentPage * PageSize;
        const firstPageIndex = lastPageIndex - PageSize;
        currentVideos(allvideos.slice(firstPageIndex, lastPageIndex));
      }

      

      
        
        return (
            <div className="body">
                <Sidebar leftsidebar={isleftsidebar}  closeLeftSidebar={() => toggleLeftSidebar()}/>
                <div className="content">
                <Header openLeftSidebar={() => toggleLeftSidebar()} />
                <div className="page_container">
                    <div className="index_wrapper">
                       <div className="index_title">
                          <p>Videos</p>
                       </div>
                       <div className="index_content">

                        {
                       currentvideos.map((video, i) =>{
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
                       <div>
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={8}
                        totalItemsCount={allvideos.length}
                        pageRangeDisplayed={5}
                        onChange={(e) =>handlePageChange(e)}
                        innerClass="pagination-wrapper"
                        itemClass="page-number"
                        activeClass="active-page"
                      />
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    
        function getAllVideos(){
            fetch('/videostreaming/videofilter.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    videofilter: props.match.params.filt
              })
            })
                .then((response) => response.json())
                .then((responseJSON) => {
                    if (responseJSON['output'][0]['success'] = true) {
                        allVideos(responseJSON['output'][0]['data']);
                        heroVideo(responseJSON['output'][0]['data'][0]);
                        setCurrentPage(1);
                    }
                // console.log(responseJSON['output']);
                    setCurrentVideos();
                }).catch((error) =>{
                   // console.log(error);
                })
        }

        function toggleLeftSidebar(){

            if (isleftsidebar == 'desktop_display') {
                settoggleLeftSidebar('mobile_display');
            }else{
                settoggleLeftSidebar('desktop_display');
            }
        }

}

export default Videos;
