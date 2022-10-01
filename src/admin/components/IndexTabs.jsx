import React, {useState, useEffect} from 'react';
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
import Thumbnailb from '../../assets/images/thumbnailb.png'
import Thumbnailc from '../../assets/images/thumbnailc.png'
import Thumbnaild from '../../assets/images/thumbnaild.png'
import Thumbnailbg from '../../assets/images/bgthumbnail.png'
import Thumbnailbgsm from '../../assets/images/bgthumbnail2.png'
import { Link } from '@material-ui/core';
import Card from 'react-bootstrap/Card'





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


let PageSize = 10;
export default function TabsWrappedLabel() {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



 function getAllVideos(){
    fetch('/videostreaming/allvideos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })

        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON['output'][0]['success'] == 'true') {
                allVideos(responseJSON['output'][0]['data']);
                heroVideo(responseJSON['output'][0]['data'][0]);
            }
        // console.log(responseJSON['output']);
        }).catch((error) =>{
           // console.log(error);
        })
}

useEffect(() => {
    getAllVideos();
  }, []);

  const [allvideos, allVideos] = useState([]);
  const [herovideo, heroVideo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentvideos, currentVideos] = useState([]);

  useEffect(() =>{
    setCurrentVideos();
  }, [currentPage]);

  function onPageChanges(currentPage){
      console.log(currentPage)
      setCurrentPage(currentPage['selected']);
  }

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    let PageSize = 5;
    let rangeCount = allvideos.length/PageSize;

    function setCurrentVideos(){
      const lastPageIndex = currentPage * PageSize;
      const firstPageIndex = lastPageIndex - PageSize;
      currentVideos(allvideos.slice(firstPageIndex, lastPageIndex));
    }



    function adminUpdateVideo(a, e){
      fetch('/videostreaming/adminupdatevideos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            currentstatus: e,
            vidid: a
        })
    })
  
        .then((response) => response.json())
        .then((responseJSON) => {
          let res = responseJSON['output'][0]['success'];
          if(res == 'true'){
            alert('success');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        })
    }

  return (
    <div className={classes.root}>
     
    <div className="">
      <AppBar position="static" style={{backgroundColor:'transparent', boxShadow:'none'}}>

        <Tabs value={value} 
           onChange={handleChange} 
           TabIndicatorProps={{style: {background:'#fff', color:'#fff'}}}
           >
          <Tab value="one" 
          label="New Videos"
           {...a11yProps('two')} 
           style={{color:'#000', fontWeight:'bold'}}
           />
           <Tab value="two" 
          label="Flagged Videos"
           {...a11yProps('two')} 
           style={{color:'#000', fontWeight:'bold'}}
           />
          <Tab value="three" 
          label="Declined Videos" 
          {...a11yProps('three')} 
          style={{color:'#000', fontWeight:'bold'}}
          />   
        </Tabs>

      </AppBar>   
    </div>

     <div>                    
        <TabPanel value={value} index="one">
            <div className="admin_video_wrapper">
            
                {
                 allvideos.map((video)=>
                    (video.videostatus == 'active')? 
                    <div className="admin_video_box">
                 <Card className="admin_video_box_left">
                      <Card.Img src={video.videothumbnail} alt="image" className="admin_video_image"/>
                     <div className="videoview_content_wrap"></div>
                      <Card.ImgOverlay>
                          <Card.Text>
                          <div className="overlaycontent_video">
                              <span><FaPlay/></span>
                          </div>
                          </Card.Text>
                      </Card.ImgOverlay>
                  </Card>
                <div className="admin_video_box_right">
                    <div className="admin_video_right_top">
                        <span>{video.videotitle}</span>
                        <span>{video.videodescription}</span>
                    </div>
                    <div className="admin_video_right_bottom">
                        <div className="admin_video_bottom_top">
                            <p><img src={User1} /> <span>{video.videouploader}</span></p>
                        </div>
                        <div className="admin_video_bottom_bottom">
                            <div className="admin_video_bottom_bottom_a">
                                <span className="yellowColor">posted</span>
                                <span>{video.daysago}</span>
                            </div>
                            <div className="admin_video_bottom_bottom_b">
                               
                                <span className="secondaryButton" onClick={() => adminUpdateVideo(video.videoid, 'flagged')}>Flag</span>
                                <span className="redButton" onClick={() => adminUpdateVideo(video.videoid, 'deactivated')}>Deactivate</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              : <div></div>
                 )
                }


            </div>
        </TabPanel>
      
        <TabPanel value={value} index="two">
        <div className="admin_video_wrapper">
            
            {
             allvideos.map((video)=>
               (video.videostatus =='flagged')?
               <div className="admin_video_box">
             <Card className="admin_video_box_left">
                  <Card.Img src={video.videothumbnail} alt="image" className="admin_video_image"/>
                 <div className="videoview_content_wrap"></div>
                  <Card.ImgOverlay>
                      <Card.Text>
                      <div className="overlaycontent_video">
                          <span><FaPlay/></span>
                      </div>
                      </Card.Text>
                  </Card.ImgOverlay>
              </Card>
            <div className="admin_video_box_right">
                <div className="admin_video_right_top">
                    <span>{video.videotitle}</span>
                    <span>{video.videodescription}</span>
                </div>
                <div className="admin_video_right_bottom">
                    <div className="admin_video_bottom_top">
                        <p><img src={User1} /> <span>{video.videouploader}</span></p>
                    </div>
                    <div className="admin_video_bottom_bottom">
                        <div className="admin_video_bottom_bottom_a">
                            <span className="yellowColor">posted</span>
                            <span>{video.daysago}</span>
                        </div>
                        <div className="admin_video_bottom_bottom_b">
                            <span className="greenButton" onClick={() => adminUpdateVideo(video.videoid, 'active')}>Reactivate</span>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>: <div></div>
             )
            }


        </div>
        </TabPanel>
        <TabPanel value={value} index="three">
        <div className="admin_video_wrapper">
            
            {
             allvideos.map((video)=>
               (video.videostatus =='deactivated')?
               <div className="admin_video_box">
             <Card className="admin_video_box_left">
                  <Card.Img src={video.videothumbnail} alt="image" className="admin_video_image"/>
                 <div className="videoview_content_wrap"></div>
                  <Card.ImgOverlay>
                      <Card.Text>
                      <div className="overlaycontent_video">
                          <span><FaPlay/></span>
                      </div>
                      </Card.Text>
                  </Card.ImgOverlay>
              </Card>
            <div className="admin_video_box_right">
                <div className="admin_video_right_top">
                    <span>{video.videotitle}</span>
                    <span>{video.videodescription}</span>
                </div>
                <div className="admin_video_right_bottom">
                    <div className="admin_video_bottom_top">
                        <p><img src={User1} /> <span>{video.videouploader}</span></p>
                    </div>
                    <div className="admin_video_bottom_bottom">
                        <div className="admin_video_bottom_bottom_a">
                            <span className="yellowColor">posted</span>
                            <span>{video.daysago}</span>
                        </div>
                        <div className="admin_video_bottom_bottom_b">
                            <span className="greenButton" onClick={() => adminUpdateVideo(video.videoid, 'active')}>Reactivate</span>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>: <div></div>
             )
            }


        </div>
        </TabPanel>
     </div>




      
    </div>
  );

  
}
