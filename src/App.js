import React, { Component } from 'react';
import $ from 'jquery';
import FolderItem from './FolderItem';
import FileItem from './FileItem';
import Menu from './Menu';
import InfoModal from './InfoModal';
import CreateNewModal from './CreateNewModal';
import './App.css';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {currentData: [], childData: [], currentPath: ''};
    this.updateCurrentData = this.updateCurrentData.bind(this);
    this.populateItems = this.populateItems.bind(this);
  }

  componentDidMount(){
    var currentPath = window.location.pathname;
    var folderName = currentPath.substring(currentPath.lastIndexOf('/')+1);
    $.ajax({
      url: 'http://localhost:3001/structure',
      type: 'GET',
      data: {name: folderName ? folderName : 'root'},
      crossOrigin: true
    }).then((data) => {
        this.setState({ currentData: data, currentPath: currentPath });
        $.ajax({
          url: 'http://localhost:3001/structure',
          type: 'GET',
          data: {parent_id: data[0].id},
          crossOrigin: true
        }).then((data) => {
            this.setState({ childData: data });
          });
      });
  }

  updateCurrentData(updatedCurrentData, updatedChildData, updatedCurrentPath){
    this.setState({ currentData: updatedCurrentData, childData: updatedChildData, currentPath: updatedCurrentPath });
  }

  populateItems(){
    var explorerItems = [];
    for(var i=0;i< this.state.childData.length;i++){
      if(this.state.childData[i].type === "folder"){
        explorerItems.push(<FolderItem folderData={this.state.childData[i]} current_path={this.state.currentPath} update_current_data={this.updateCurrentData} />);
      }
      else if(this.state.childData[i].type === "file"){
        explorerItems.push(<FileItem fileData={this.state.childData[i]} />);
      }
    }
    return(
      <div id="explorer-item-section" className="flex-row flex-valign">
        {explorerItems}
        <div className="add-new-item">
          <img src="add-new.png" id="add-new-icon" alt="Add New Icon" />
        </div>
        <Menu />
      </div>
    );
  }

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
          {this.populateItems()}
        </section>
        <InfoModal />
        <CreateNewModal />
      </div>
    );
  }
}
