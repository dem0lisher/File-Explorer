import React, { Component } from 'react';

export default class CreateNewModal extends Component {
  render() {
    return (
      <div className="overlay flex-row flex-center" onClick={this.closeModal}>
        <div className="modal">
          <div className="modal-title flex-row flex-center">
            <h2>Create New</h2>
            <img src="close.svg" id="close-btn" alt="Close Icon" onClick={this.closeModal} />
          </div>
          <div className="modal-body flex-column flex-center">
            <div>
              <div>File</div>
              <div>Folder</div>
            </div>
            <div className="info-ctn">
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
