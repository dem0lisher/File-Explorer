import React, { Component } from 'react';
import $ from 'jquery';
import FolderItem from './FolderItem';
import FileItem from './FileItem';
import FolderMenu from './FolderMenu';
import FileMenu from './FileMenu';
import InfoModal from './InfoModal';
import CreateNewModal from './CreateNewModal';
import './App.css';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {currentData: [], childData: [], currentPath: '', selectedDirData: ''};
    this.updateCurrentData = this.updateCurrentData.bind(this);
    this.updateChildData = this.updateChildData.bind(this);
    this.updateSelectedData = this.updateSelectedData.bind(this);
    this.openCreateNewModal = this.openCreateNewModal.bind(this);
    this.populateItems = this.populateItems.bind(this);
    this.getCurrentBreadcrumbs = this.getCurrentBreadcrumbs.bind(this);
    this.getCreateNewModal = this.getCreateNewModal.bind(this);
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

  updateChildData(updatedChildData){
    this.setState({ childData: updatedChildData });
  }

  updateSelectedData(updatedSelectedDirData){
    this.setState({ selectedDirData: updatedSelectedDirData });
  }

  openCreateNewModal(){
    $("#create-new-modal-ctn").removeClass('hidden');
  }

  populateItems(){
    var explorerItems = [];
    for(var i=0;i< this.state.childData.length;i++){
      if(this.state.childData[i].type === "folder"){
        explorerItems.push(<FolderItem folderData={this.state.childData[i]} currentPath={this.state.currentPath} updateCurrentData={this.updateCurrentData} />);
      }
      else if(this.state.childData[i].type === "file"){
        explorerItems.push(<FileItem fileData={this.state.childData[i]} />);
      }
    }
    return(
      <div id="explorer-item-section" className="flex-row flex-valign">
        {explorerItems}
        <div className="add-new-item" onClick={this.openCreateNewModal}>
          <img src="add-new.png" id="add-new-icon" alt="Add New Icon" />
        </div>
        <FolderMenu childData={this.state.childData} updateChildData={this.updateChildData} updateSelectedData={this.updateSelectedData} />
        <FileMenu childData={this.state.childData} updateChildData={this.updateChildData} updateSelectedData={this.updateSelectedData} />
      </div>
    );
  }

  getCurrentBreadcrumbs(){
    var currentPath = this.state.currentPath;
    var dirStructure = currentPath.split('/'), breadcrumbs = [];
    if(dirStructure.length > 1 && dirStructure[dirStructure.length-1] === ''){
      dirStructure.splice(dirStructure.length-1, 1);
    }
    for(var i=0;i< dirStructure.length;i++){
      if(i === dirStructure.length-1){
        if(dirStructure[i] === ''){
          breadcrumbs.push(<span id="current-dir">root</span>)
        }
        else{
          breadcrumbs.push(<span id="current-dir">{dirStructure[i]}</span>);
        }
      }
      else{
        if(dirStructure[i] === ''){
          breadcrumbs.push(<span>root / </span>)
        }
        else{
          breadcrumbs.push(<span>{dirStructure[i]+" / "}</span>);
        }
      }
    }
    return(
      <div id="dir-breadcrumb">
        {breadcrumbs}
      </div>
    );
  }

  getCreateNewModal(){
    if(this.state.currentData && this.state.currentData.length){
      return(<CreateNewModal currentDirId={this.state.currentData[0].id} />);
    }
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
              {this.getCurrentBreadcrumbs()}
            </div>
            <div id="search-bar-ctn">
              <input type="search" id="search-bar" placeholder="Search for anything" />
              <img src="search.svg" id="search-icon" alt="Search Icon" />
            </div>
          </div>
          {this.populateItems()}
        </section>
        <InfoModal dirData={this.state.selectedDirData} />
        {this.getCreateNewModal()}
      </div>
    );
  }
}
