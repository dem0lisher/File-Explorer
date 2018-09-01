import React, { Component } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';

export default class FolderItem extends Component {
  render() {
    return (
      <ContextMenuTrigger>
        <div className="folder-item flex-column flex-space-between">
          <div className="folder-icon-ctn">
            <img src="Folder.png" alt="Folder Icon" />
          </div>
          <div className="explorer-item-name">config</div>
        </div>
      </ContextMenuTrigger>
    );
  }
}
