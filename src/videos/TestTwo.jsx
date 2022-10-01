import React,{Component} from 'react'  
import { endOfToday, set } from 'date-fns' 
import TimeRange from 'react-timeline-range-slider'  
import { Media, Player, controls, withMediaProps } from 'react-media-player-with-playback-speed'
const { PlayPause, MuteUnmute ,isPlaying } = controls


class Test extends Component {
  alertPlay(){
    alert('dgdhh')
  }


  render() {
    return (
      <Media>
        <div className="media">
          <div className="media-player">
            <Player src="/videostreaming/videos/scaling-agric.innovations-through-commercialization-for-sustainable-food-system-transformation1631786538.mp4" 
            controls 
            autoPlay={true}
            //onPlay = {() => this.alertPlay()}
            //dhdh

            />
          </div>
          <div className="media-controls">
            <PlayPause />
            <MuteUnmute />
            
          </div>
        
        </div>
      </Media>
    )
  }
}

export default Test