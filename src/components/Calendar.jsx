import React, { Component } from 'react';

import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import '../assets/css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaUser, FaHome, FaVideo, FaPlaystation, FaViadeoSquare, FaVideoSlash, FaPause, FaVimeoSquare, FaPlay, FaBars, FaTimes, FaShare, FaEye, FaEyeSlash, FaDot, FaCalendar } from 'react-icons/fa'
import { uid, suid } from 'rand-token';
import SearchBtn from './../assets/images/searchbtn.png'
import User from './../assets/images/user.png'
import * as moment from 'moment';
import DatePicker from "react-datepicker";

class Calendar extends Component {
         constructor(){
             super();
             this.state ={
                datePickerIsOpen:false,
                startDate: '',
                endDate:'',
             }
         }

    handleCalChange(date) {
        const pickeddate = moment(date).format('YYYY-MM-DD');
        this.setState({
          startDate: pickeddate
        });
      }
    
      openDatePicker() {
        this.setState({
          datePickerIsOpen: !this.state.datePickerIsOpen,
        });
      };

      handleCalChange2(date) {
        const pickeddate = moment(date).format('YYYY-MM-DD');
        this.setState({
          endDate: pickeddate
        });
        const filts = this.state.startDate + '~' + pickeddate;
        if (this.state.startDate == this.state.endDate) {
            alert('Please select a date range');
        } else {
            window.location = `/videos/filter/${filts}`

        }
      }
    
      openDatePicker2() {
        this.setState({
          datePickerIsOpen2: !this.state.datePickerIsOpen2,
        });
      };

    render() {
        return (
              <div className="calendar_wrapper">
                <div className="calendar_box" >
                    <span onClick={() => this.openDatePicker()}>From date</span>
                    <DatePicker
                       onChange={(e) =>this.handleCalChange(e)}
                       customInput={<FaCalendar/>}
                       open={this.state.datePickerIsOpen}
                       value={this.state.startDate}
                       onClick={() => this.openDatePicker()}
                       onClickOutside={() => this.openDatePicker()}
                    />
                </div>

                <div className="calendar_box">
                    <span onClick={() => this.openDatePicker2()}>To date</span>
                    <DatePicker
                       onChange={(e)=>this.handleCalChange2(e)}
                       customInput={<FaCalendar  onClick={() => this.openDatePicker2()}/>}
                       open={this.state.datePickerIsOpen2}
                       onClickOutside={() => this.openDatePicker2()}
                       value={this.state.endDate}
                    />
                </div>
              </div>
   
        );
    }
}

export default Calendar;
