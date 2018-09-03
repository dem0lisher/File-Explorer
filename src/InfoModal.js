import React, { Component } from 'react';
import $ from 'jquery';

export default class InfoModal extends Component {
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.getIcon = this.getIcon.bind(this);
  }

  closeModal(e){
    e.stopPropagation();
    if(e.target.className.indexOf('overlay') > -1 || e.target.className.indexOf('close-btn') > -1){
      $('#info-modal-ctn').addClass('hidden');
    }
  }

  getIcon(){
    if(this.props.dirData.ext){
      return(
        <div className="file-icon-ctn">
          <img src="File.png" alt="File Icon" />
          <span className="file-ext white-text">{this.props.dirData.ext}</span>
        </div>
      );
    }
    else{
      return(
        <div className="file-icon-ctn">
          <img src="Folder.png" alt="Folder Icon" />
        </div>
      );
    }
  }

  render() {
    return (
      <div id="info-modal-ctn" className="overlay flex-row flex-center hidden" onClick={this.closeModal}>
        <div id="info-modal" className="modal">
          <div className="modal-title flex-row flex-center">
            <h2>{this.props.dirData.ext ? "File Info" : "Folder Info"}</h2>
            <img src="close.svg" className="close-btn" alt="Close Icon" onClick={this.closeModal} />
          </div>
          <div className="modal-body flex-column flex-center">
            {this.getIcon()}
            <div className="info-ctn">
              <div className="info-item flex-row"><div className="flex-row flex-end">Name: </div><div className="info-item-value">{this.props.dirData.ext ? this.props.dirData.name + this.props.dirData.ext : this.props.dirData.name}</div></div>
              <div className="info-item flex-row"><div className="flex-row flex-end">Size: </div><div className="info-item-value">{this.props.dirData.size}</div></div>
              <div className="info-item flex-row"><div className="flex-row flex-end">Creator name: </div><div className="info-item-value">{this.props.dirData.creator}</div></div>
              <div className="info-item flex-row"><div className="flex-row flex-end">Created date: </div><div className="info-item-value">{this.props.dirData.date}</div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
