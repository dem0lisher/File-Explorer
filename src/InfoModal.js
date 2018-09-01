import React, { Component } from 'react';

export default class InfoModal extends Component {
  render() {
    return (
      <div className="overlay flex-row flex-center" onClick={this.closeModal}>
        <div className="modal">
          <div className="modal-title flex-row flex-center">
            <h2>File Info</h2>
            <img src="close.svg" id="close-btn" alt="Close Icon" onClick={this.closeModal} />
          </div>
          <div className="modal-body flex-column flex-center">
            <div className="file-icon-ctn">
              <img src="File.png" alt="File Icon" />
              <span className="file-ext white-text">.js</span>
            </div>
            <div className="info-ctn">
              <div className="info-item flex-row"><div className="flex-row flex-end">Name: </div><div className="info-item-value">index.js</div></div>
              <div className="info-item flex-row"><div className="flex-row flex-end">Size: </div><div className="info-item-value">542kb</div></div>
              <div className="info-item flex-row"><div className="flex-row flex-end">Creator name: </div><div className="info-item-value">Ankur</div></div>
              <div className="info-item flex-row"><div className="flex-row flex-end">Created date: </div><div className="info-item-value">24th Aug, 2018</div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
