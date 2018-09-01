import React, { Component } from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';

export default class Menu extends Component {
  render() {
    return (
      <ContextMenu>
        <MenuItem className="context-menu-item">
          Open
        </MenuItem>
        <MenuItem className="context-menu-item" onClick={this.showInfoModal}>
          Get info
        </MenuItem>
        <MenuItem className="context-menu-item">
          Delete
        </MenuItem>
      </ContextMenu>
    );
  }
}
