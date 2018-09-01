import React, { Component } from 'react';

export default class CreateNewModal extends Component {
  render() {
    return (
      <div className="overlay flex-row flex-center" style={{display: 'none'}} onClick={this.closeModal}>
        <div id="create-new-modal" className="modal">
          <div className="modal-title flex-row flex-center">
            <h2>Create New</h2>
            <img src="close.svg" className="close-btn" alt="Close Icon" onClick={this.closeModal} />
          </div>
          <div className="modal-body flex-column flex-center">
            <div className="type-selector flex-row">
              <div id="type-file" className="type-item flex-row flex-center">File</div>
              <div id="type-folder" className="type-item flex-row flex-center selected-type">Folder</div>
            </div>
            <div className="create-new-form-ctn">
              <form id="create-new-form" className="flex-column flex-center">
                <input type="text" name="name" className="create-new-form-field" placeholder="Name" />
                <input type="text" name="creator" className="create-new-form-field" placeholder="Creator" />
                <input type="text" name="size" className="create-new-form-field" placeholder="Size" />
                <input type="text" name="date" className="create-new-form-field" placeholder="Date" />
                <button id="create-item-btn">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
