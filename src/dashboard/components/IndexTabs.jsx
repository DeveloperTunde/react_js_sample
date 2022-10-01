import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import User1 from '../../assets/images/user1.png'
import { FaEye, FaPlay} from 'react-icons/fa'
import Thumbnaila from '../../assets/images/thumbnaila.png'
import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Pagination from "react-js-pagination";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabsWrappedLabel(props) {
  let { opentab} = props;
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  const [currentPage, setCurrentPage] = useState(2);
  const [myvideos, setMyVideos] = useState([]);

  const [currentvideos, currentVideos] = useState([]);

  const [isloggedin, setIsloggedIn] = useState(false);
  const [mychannels, setMyChannels] = useState([]);
  const [likedvideos, setMyLikedVideos] = useState([]);
  

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  const handleChange2 = (event, newValue) => {

    if (opentab == 1) {
      setValue('one');
    }else if (opentab == 2) {
      setValue('two');
    }else if (opentab == 3) {
      setValue('three');
    }
   
  };

  useEffect(()=>{
    handleChange2();
}, [])


useEffect(() =>{
  setCurrentVideos();
}, [currentPage]);


function handlePageChange(pageNumber) {
  console.log(`active page is ${pageNumber}`);
  setCurrentPage(pageNumber);
}


const PageSize = 6;
const rangeCount = myvideos.length/PageSize;

function setCurrentVideos(){
  const lastPageIndex = currentPage * PageSize;
  const firstPageIndex = lastPageIndex - PageSize;
  currentVideos(myvideos.slice(firstPageIndex, lastPageIndex));
}




useEffect(() => {
    let useremail = sessionStorage.getItem('userReg');
   fetch('/videostreaming/myvideos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: useremail,

        })
    })

        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON['output'][0]['success'] == 'true') {
                setIsloggedIn(true);
                setMyVideos(responseJSON['output'][0]['data']);
                console.log(responseJSON['output']);

                setCurrentPage(1);
            }

            setCurrentVideos();
             
        }).catch((error) =>{
            console.log(error);
        })

        
  }, []);
  
  useEffect(() => {
    getAllChannel();
    getLikedVideos();
  }, [])


  return (
    <div className={classes.root}>
     
    <div className="user_category_tabs">
      <AppBar position="static" style={{backgroundColor:'transparent', boxShadow:'none'}}>

        <Tabs value={value} 
           onChange={handleChange} 
           TabIndicatorProps={{style: {background:'#062541'}}}
          
           >
          <Tab value="one" 
          label="Your Videos"
           {...a11yProps('two')} 
           style={{color:'#000', fontWeight:'bold'}}
           className="tab_title"
           />
           <Tab value="two" 
          label="Liked Videos"
           {...a11yProps('two')} 
           style={{color:'#000', fontWeight:'bold'}}
           className="tab_title"
           />
          <Tab value="three" 
          label="Channels" 
          {...a11yProps('three')} 
          style={{color:'#000', fontWeight:'bold'}}
          className="tab_title"
          />   
        </Tabs>

      </AppBar>   
    </div>

     <div>                    
        <TabPanel value={value} index="one" >
        <div className="videoview_left_btm">
                       
                       {(!isloggedin)? <span align="center" style={{float:'left', fontWeight:'bold'}}> No Video yet</span> : 
                         currentvideos.map((video) =>
                          
                             <div className="video_box2">
                                <Link  to={`/videoview/${video.videoid}`}>
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
                                </Link>
                                <div className="video_box_content">
                                    <div className="video_box_content_left">
                                        <img src={User1} alt="image" />
                                    </div>
                                    <div className="video_box_content_right">
                                       <Link  to={`/videoview/${video.videoid}`}>
                                        <span className="span_title">{video.videotitle}</span>
                                      </Link>
                                        <span className="span_description">{video.videodescription}</span>
                                        <div className="video_content_right_b_b">
                                            <span><FaEye/></span>
                                            <span>{video.numberofviewers}views .</span>
                                            <span><Link to={`/editvideo/${video.videoid}`} className="link">  Edit</Link> </span>
                                            <span onClick={() => confirmDelete(video.videoid)}>Delete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          

                         )}

                     {
                       (myvideos.length > 0)?
                       <Pagination
                       activePage={currentPage}
                       itemsCountPerPage={6}
                       totalItemsCount={myvideos.length}
                       pageRangeDisplayed={5}
                       onChange={(e) =>handlePageChange(e)}
                       innerClass="pagination-wrapper"
                       itemClass="page-number"
                       activeClass="active-page"
                     />
                     :''
                     }
                            </div>
        </TabPanel>
      
        <TabPanel value={value} index="two">
        <div className="videoview_left_btm">
          
                       
                       {
                         (likedvideos.length > 0)?
                       
                       likedvideos.map((video)=>{
                        return <Link  to={`/videoview/${video.videoid}`}><div className="video_box2">
                        <div className="video_box_img">
                            <img src={video.videothumbnail} alt="thumbnail" />
                        </div>
                        <div className="video_box_content">
                            <div className="video_box_content_left">
                                <img src={User1} alt="image" />
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
                      : <div></div>
                       }

                       </div>
        </TabPanel>
      
        <TabPanel value={value} index="three">
        <div className="videoview_left_btm">
             <div className="channels_top">
                <span><Link to={'/channels'} className="link all_channels_link" style={{color:'#96CA8B'}} >See all Channels</Link></span>
             </div>
             <div className="channels_bottom">

                {
                  (mychannels.length > 0)?
                 mychannels.map((channel) =>{
                  return <div className="channel_box">
                  <div className="channel_box_all channel_box_a">
                    <img src={channel.logo} />
                  </div>
                  <div className="channel_box_all channel_box_b">
                     <span>{channel.name}</span>
                  </div>
                  <div className="channel_box_all channel_box_c">
                     <span>{channel.subscribers} Subscribers</span>
                  </div>
                  <div className="channel_box_all channel_box_d">
                  <Link  to={`/channel_video/${channel.id}`} className="link"><span className="primaryButton channel_video">Channel Videos</span></Link>
                  </div>
              </div>
                 }):<div></div>
                }
                
             </div>
        </div>
        </TabPanel>
     </div>




      
    </div>
  );

  function  confirmDelete(vid){
    let useremail = sessionStorage.getItem('userReg');
    if (window.confirm("Are you sure you want to delete this video?")) {
      fetch('/videostreaming/deletevideo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            vidid: vid,
            useremail: useremail
        })
    })

        .then((response) => response.text())
        .then((responseJSON) => {
          window.location.reload();
          //console.log(responseJSON);
        }).catch((error) =>{
          console.log(error);
        })
    }
  }




   function getAllChannel(){
      let useremail = sessionStorage.getItem('userReg');
      fetch('/videostreaming/mychannels.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            useremail: useremail,
        })
      })
  
          .then((response) => response.json())
          .then((responseJSON) => {
              if (responseJSON['output'][0]['success'] == 'true') {
                  setMyChannels(responseJSON['output'][0]['data'])
              }
          // console.log(responseJSON);
          }).catch((error) =>{
             // console.log(error);
          })
  }

  function getLikedVideos(){
    let useremail = sessionStorage.getItem('userReg');
    fetch('/videostreaming/likedvideos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          useremail: useremail,
      })
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON['output'][0]['success'] == 'true') {
                setMyLikedVideos(responseJSON['output'][0]['data'] );
            }
        // console.log(responseJSON['output']);
        }).catch((error) =>{
           // console.log(error);
        })
}

  
}
