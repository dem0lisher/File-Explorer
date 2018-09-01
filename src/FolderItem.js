import React, { Component } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import $ from 'jquery';

export default class FolderItem extends Component {
  constructor(props){
    super(props);
    this.getFolderData = this.getFolderData.bind(this);
  }

  getFolderData(){
    $.ajax({
      url: 'http://localhost:3001/structure',
      type: 'GET',
      data: {parent_id: this.props.folderData.id},
      crossOrigin: true
    }).then((data) => {
        this.props.update_current_data(this.props.folderData, data);
      });
  }

  render() {
    return (
      <ContextMenuTrigger>
        <div className="folder-item flex-column flex-space-between" onDoubleClick={this.getFolderData}>
          <div className="folder-icon-ctn">
            <img src="Folder.png" alt="Folder Icon" />
          </div>
          <div className="explorer-item-name">{this.props.folderData.name}</div>
        </div>
      </ContextMenuTrigger>
    );
  }
}
