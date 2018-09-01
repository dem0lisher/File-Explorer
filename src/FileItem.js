import React, { Component } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';

export default class FileItem extends Component {
  render() {
    return (
      <ContextMenuTrigger>
        <div className="file-item flex-column flex-space-between">
          <div className="file-icon-ctn">
            <img src="File.png" alt="File Icon" />
            <span className="file-ext white-text">.js</span>
          </div>
          <div className="explorer-item-name">index.js</div>
        </div>
      </ContextMenuTrigger>
    );
  }
}
