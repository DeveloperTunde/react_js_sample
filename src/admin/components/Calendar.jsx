import React, { Component } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import '../../assets/css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaUser, FaHome, FaVideo, FaPlaystation, FaViadeoSquare, FaVideoSlash, FaPause, FaVimeoSquare, FaPlay, FaBars, FaTimes, FaShare, FaEye, FaEyeSlash, FaDot, FaCalendar } from 'react-icons/fa'
import { uid, suid } from 'rand-token';
import SearchBtn from '../../assets/images/searchbtn.png'
import User from '../../assets/images/user.png'

class Calendar extends Component {
    render() {
        return (
              <div className="calendar_wrapper">
                <div className="calendar_box">
                    <span>From date</span>
                    <FaCalendar />
                </div>

                <div className="calendar_box">
                    <span>To date</span>
                    <FaCalendar />
                </div>
              </div>
   
        );
    }
}

export default Calendar;
