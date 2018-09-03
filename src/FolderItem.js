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
        var newPath;
        if(this.props.currentPath.charAt(this.props.currentPath.length-1) === '/'){
          newPath = this.props.currentPath.substring(0, this.props.currentPath.length-1)+'/'+this.props.folderData.name;
        }
        else{
          newPath = this.props.currentPath+'/'+this.props.folderData.name;
        }
        this.props.updateCurrentData(this.props.folderData, data, newPath);
      });
  }

  render() {
    return (
      <ContextMenuTrigger id="folder-context-menu" attributes={{'data-dirdata': JSON.stringify(this.props.folderData), className: "folder-item-ctn"}}>
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
