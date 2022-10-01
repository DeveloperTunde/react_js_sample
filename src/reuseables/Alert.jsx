import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'

export default class AlertComponent extends Component {
    constructor(){
        super();
        this.state={
            show:true
        }
    }
    setShow(e){
        this.setState({
            show: e
        })
    }

    render() {
        return (
           <div>
               {(this.state.show) ?   
                 <Alert 
                    className="alert_wrapper1"
                    variant={this.props.type} 
                    onClose={this.props.closealert} 
                    dismissible transition="slideout" >
                    <Alert.Heading className="alert_title">{this.props.title}</Alert.Heading>
                    <p>
                     {this.props.content}
                    </p>
                  </Alert> : <div></div>}
           </div>
        )
          
    
}
}