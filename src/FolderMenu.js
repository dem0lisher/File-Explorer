import React, { Component } from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import $ from 'jquery';

export default class FolderMenu extends Component {
  constructor(props){
    super(props);
    this.openFolder = this.openFolder.bind(this);
    this.showInfoModal = this.showInfoModal.bind(this);
    this.deleteDir = this.deleteDir.bind(this);
  }

  openFolder(e, data, target){
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
        <ContextMenu id="folder-context-menu">
          <MenuItem className="context-menu-item" onClick={this.openFolder}>
            Open
          </MenuItem>
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
