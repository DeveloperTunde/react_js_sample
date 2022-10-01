import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import { FaClock, FaTimes } from 'react-icons/fa';

export default class ModalComponent extends Component {
    constructor(){
        super();
        this.state={
            show:true
        }
    }
    showModal(e){
        this.setState({
            show: e
        })
    }

 

    render() {
        return (
           <div>
              
            <Modal
                 show={this.props.showthismodal}
                 onHide={this.props.closeSideModal}
                 dialogClassName="modal-80w"
                 size="lg"
                 aria-labelledby="file-form"
                 
               >
                <Modal.Header closeButton>
                    <Modal.Title id="file-form" >
                       <span className="custom-modaltitle">
                       {this.props.data.videotitle}
                       </span>
                       

                    </Modal.Title>
                </Modal.Header>
                 <Modal.Body>
               
                    <div className="custom-modaldescription">
                      <p>{this.props.data.videofulldescription}</p>
                    </div>
                    <div className="custom-modalfooter">
                        <span><FaClock/></span>
                        <span>{this.props.data.videostarttime} - {this.props.data.videoendtime}</span>
                    </div>
                    
                </Modal.Body>
             </Modal>
                
           </div>
        )
          
    
}
}