import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';

export default class AppRouter extends Component {
	
	render(){
		return(
			<Router>
				<div>
					<Route path='' component={App} />
				</div>
			</Router>
		);
	}
}