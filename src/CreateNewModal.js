import React, { Component } from 'react';
import $ from 'jquery';

export default class CreateNewModal extends Component {
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.changeType = this.changeType.bind(this);
    this.createNewDir = this.createNewDir.bind(this);
  }

  closeModal(e){
    e.stopPropagation();
    if(e.target.className.indexOf('overlay') > -1 || e.target.className.indexOf('close-btn') > -1){
      $('#create-new-modal-ctn').addClass('hidden');
    }
  }

  changeType(e){
    $('.type-item').removeClass('selected-type');
    $('#'+e.currentTarget.id).addClass('selected-type');
  }

  createNewDir(e){
    e.preventDefault();
    var data;
    var selectedType = $('.selected-type').data('type');
    if(selectedType === 'file'){
      var ext = $('#new-item-name').val().substring($('#new-item-name').val().indexOf('.'));
      data = {name: $('#new-item-name').val().substring(0, $('#new-item-name').val().indexOf('.')), creator: $('#new-item-creator').val(), size: $('#new-item-size').val(), date: $('#new-item-date').val(), type: selectedType, ext: ext, parent_id: this.props.currentDirId};
    }
    else{
      data = {name: $('#new-item-name').val(), creator: $('#new-item-creator').val(), size: $('#new-item-size').val(), date: $('#new-item-date').val(), type: selectedType, parent_id: this.props.currentDirId};
    }
    $.ajax({
      url: 'http://localhost:3001/structure',
      type: 'POST',
      data: data,
      crossOrigin: true
    }).then((data) => {
        $('#create-new-modal-ctn').addClass('hidden');
      });
  }

  render() {
    return (
      <div id="create-new-modal-ctn" className="overlay flex-row flex-center hidden" onClick={this.closeModal}>
        <div id="create-new-modal" className="modal">
          <div className="modal-title flex-row flex-center">
            <h2>Create New</h2>
            <img src="close.svg" className="close-btn" alt="Close Icon" onClick={this.closeModal} />
          </div>
          <div className="modal-body flex-column flex-center">
            <div className="type-selector flex-row">
              <div id="type-file" className="type-item flex-row flex-center" data-type="file" onClick={this.changeType}>File</div>
              <div id="type-folder" className="type-item flex-row flex-center selected-type" data-type="folder" onClick={this.changeType}>Folder</div>
            </div>
            <div className="create-new-form-ctn">
              <form id="create-new-form" className="flex-column flex-center">
                <input type="text" id="new-item-name" name="name" className="create-new-form-field" placeholder="Name" />
                <input type="text" id="new-item-creator" name="creator" className="create-new-form-field" placeholder="Creator" />
                <input type="text" id="new-item-size" name="size" className="create-new-form-field" placeholder="Size" />
                <input type="text" id="new-item-date" name="date" className="create-new-form-field" placeholder="Date" />
                <button type="button" id="create-item-btn" onClick={this.createNewDir}>Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
