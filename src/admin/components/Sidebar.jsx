import React, { Component } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import '../../assets/css/sidebar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaClock, FaEyeSlash, FaPlus, FaStopwatch } from 'react-icons/fa'
import { uid, suid } from 'rand-token';
import Logo from '../../assets/images/logo.png'


class Header extends Component {



    render() {
        return (
            <div className="sidebar">
                  <div className="sidebar_logo">
                      <img src={Logo} alt="logo" />
                  </div> 
                  <div className="sidebar_links">
                          <div> <Link to={'/admin'}><span className="active">Home</span></Link> </div>
                          <div> <Link to={'/admin/videos/active'}><span>All Videos</span></Link></div>
                          <div> <Link to={'/admin/videos/flagged'}><span>Flagged</span></Link></div>
                          <div> <Link to={'/admin/videos/deactivated'}><span>Deactivated</span></Link> </div>
                          <div> <Link to={'/admin/programs'}><span>All Programs</span></Link> </div>
                  </div>     
                  <div className="sidebar_buttons">
                        <span className="primaryButton" onClick={this.props.showmodal1}> <FaPlus className="icon"/> Upload</span>
                        <Link to={'/admin/schedular'}><span className="primaryButton"> <FaStopwatch className="icon" /> Schedule</span></Link>
                       
                  </div>
            </div>
   
        );
    }
}

export default Header;
