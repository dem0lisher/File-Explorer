import React, { Component } from 'react';
import FolderItem from './FolderItem';
import FileItem from './FileItem';
import Menu from './Menu';
import InfoModal from './InfoModal';
import CreateNewModal from './CreateNewModal';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="flex-row" style={{height: '500px'}}>
        <nav>
        </nav>
        <section>
          <div className="flex-row flex-space-between">
            <div className="flex-row flex-valign">
              <img src="arrow-green-circle.png" id="back-btn" alt="Up Icon" />
              <div id="dir-breadcrumb">root / movies / <span id="current-dir">inception</span></div>
            </div>
            <div id="search-bar-ctn">
              <input type="search" id="search-bar" placeholder="Search for anything" />
              <img src="search.svg" id="search-icon" alt="Search Icon" />
            </div>
          </div>
          <div id="explorer-item-section" className="flex-row flex-valign">
            <FileItem />
            <FileItem />
            <FileItem />
            <FileItem />
            <FolderItem />
            <FolderItem />
            <div className="add-new-item">
              <img src="add-new.png" id="add-new-icon" alt="Add New Icon" />
            </div>
            <Menu />
          </div>
        </section>
        <InfoModal />
        <CreateNewModal />
      </div>
    );
  }
}
