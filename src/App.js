import logo from './logo.svg';
import React, { useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Test from './videos/Test'
import TestTwo from './videos/TestTwo'
import Index from './videos/Index'
import Videos from './videos/Videos'
import LikedVideos from './videos/Likedvideos'
import Videoview from './videos/Videoview'
import UserIndex from './dashboard/Index'
import EditVideo from './dashboard/EditVideo'
import Setting from './dashboard/Setting'
import Channels from './videos/Channels'
import ChannelVideos from './videos/ChannelVideos'
import EditChannel from './dashboard/EditChannel'
import ChannelSubscription from './videos/Subscriptions'
import Login from './videos/Login'
import ForgotPassword from './videos/ForgotPassword'
import PasswordRecovery from './videos/PasswordRecovery'
import Register from './videos/Register'
import AdminIndex from './admin/Index'
import AdminLogin from './admin/Login'
import AdminVideos from './admin/AdminVideos'
import AllPrograms from './admin/AllPrograms'
import AdminEditVideo from './admin/EditVideo'
import AdminSchedular from './admin/Schedular'
import AdminVideoView from './admin/Videoview'
import Tv from './tv/Index'
import SearchVideos from './videos/SearchVideos'
import FilterVideos from './videos/FilterVideos'
import SearchCategory from './videos/SearchCategory'
import SearchCountry from './videos/SearchCountry'
import CreateEventWithNoOverlap from './admin/createEvent';
import SchedularOld from './admin/SchedularOld'


function App() {
  useEffect(() => {
    document.title = "IITA TV"
  }, [])
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Index} title="Index Page"/> 
        <Route path="/videos" exact component={Videos} /> 
        <Route path="/videos/search/:id" exact component={SearchVideos} /> 
        <Route path="/videos/filter/:filt" exact component={FilterVideos} /> 
        <Route path="/videos/category/:id" exact component={SearchCategory} /> 
        <Route path="/videos/country/:id" exact component={SearchCountry} /> 
        <Route path="/liked_videos" exact component={LikedVideos} /> 
        <Route path="/videoview/:id" exact component={Videoview} />
        <Route path="/user/:id" exact component={UserIndex} />
        <Route path="/editvideo/:id" exact component={EditVideo} />
        <Route path="/setting" exact component={Setting} />
        <Route path="/channels" exact component={Channels} />
        <Route path="/editchannel/:id" exact component={EditChannel} />
        <Route path="/channel_video/:id" exact component={ChannelVideos} />
        <Route path="/subscription" exact component={ChannelSubscription} />
        <Route path="/login" exact component={Login} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
        <Route path="/passwordrecovery/:email/:recovery" exact component={PasswordRecovery} />
        <Route path="/register" exact component={Register} />
        <Route path="/test" exact component={Test} />
        <Route path="/test2" exact component={TestTwo} />

        <Route path="/tv/index" exact component={Tv} />
        
        <Route path="/admin" exact component={AdminIndex} />
        <Route path="/admin/login" exact component={AdminLogin} />
        <Route path="/admin/videos/:type" exact component={AdminVideos} />
        <Route path="/admin/schedular" exact component={AdminSchedular} />
        <Route path="/admin/programs" exact component={AllPrograms} />
        <Route path="/admin/videoview/:id" exact component={AdminVideoView} />
        <Route path="/admin/editvideo/:id" exact component={AdminEditVideo} />
        <Route path="/admin/createevent" exact component={CreateEventWithNoOverlap} />
        <Route path="/admin/schedularold" exact component={SchedularOld} />
        
      </Switch>
    </Router>
  );
}

export default App;
