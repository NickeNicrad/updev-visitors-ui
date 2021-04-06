import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Footer from './pages/Footer';
import NewVisit from './pages/modals/NewVisit';
import NewVisitor from './pages/modals/NewVisitor';
import SideBar from './pages/SideBar';
import Visitors from './pages/Visitors';
import Visits from './pages/Visits';

function Home() {
	return (
		<Router>
			<div className='page-container'>
				<div className='page-item bg-gray-600'>
					<SideBar />
					<NewVisitor />
					<NewVisit />
				</div>
				<div className='page-item'>
					<Switch>
						<Route exact path='/' component={Dashboard} />
						<Route path='/visitors' component={Visitors} />
						<Route path='/visits' component={Visits} />
					</Switch>
					<Footer />
				</div>
			</div>
		</Router>
	);
}

export default Home;
