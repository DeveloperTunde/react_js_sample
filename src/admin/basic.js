import React from 'react'
import { Calendar, Views } from 'react-big-calendar'
import events from './events'
import * as dates from './dates'

let allViews = Object.keys(Views).map(k => Views[k])

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

let Basic = ({ localizer }) => (
  <Calendar
    events={events}
    views={allViews}
    step={60}
    showMultiDayTimes
    max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
    //max={new Date(2017, 10, 1)}
    defaultDate={new Date(2015, 3, 1)}
    components={{
      timeSlotWrapper: ColoredDateCellWrapper,
    }}
    localizer={localizer}
  />
)

export default Basic