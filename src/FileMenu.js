import React, { Component } from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import $ from 'jquery';

export default class FileMenu extends Component {
  constructor(props){
    super(props);
    this.showInfoModal = this.showInfoModal.bind(this);
    this.deleteDir = this.deleteDir.bind(this);
  }

  showInfoModal(e, data, target){
    var dirData = JSON.parse(target.getAttribute('data-dirdata'));
    $('#info-modal-ctn').removeClass('hidden');
    this.props.updateSelectedData(dirData);
  }

  deleteDir(e, data, target){
    var dirData = JSON.parse(target.getAttribute('data-dirdata'));
    $.ajax({
      url: 'http://localhost:3001/structure/' + dirData.id,
      type: 'DELETE',
      crossOrigin: true
    }).then((data) => {
        var updatedChildData = this.props.childData.filter((childItem) => {
          return childItem.id !== dirData.id;
        });
        this.props.updateChildData(updatedChildData);
      });
  }

  render() {
    return (
      <div>
        <ContextMenu id="file-context-menu">
          <MenuItem className="context-menu-item" onClick={this.showInfoModal}>
            Get info
          </MenuItem>
          <MenuItem className="context-menu-item" onClick={this.deleteDir}>
            Delete
          </MenuItem>
        </ContextMenu>
      </div>
    );
  }
}
