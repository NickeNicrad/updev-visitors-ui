import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewVisitor from './pages/modals/NewVisitor';
import NewVisit from './pages/modals/NewVisit';
import Visitors from './pages/Visitors';
import Visits from './pages/Visits';
import Sidebar from './Sidebar';
import Dashboard from './pages/Dashboard';

function Home() {
	return (
		<Router>
			<div className='flex gap-4 w-11/12 mx-auto my-4'>
				<Sidebar />
				<Switch>
					<Route path='/' exact component={Visitors} />
					{/* <Route path='/visits' component={Visits} /> */}
				</Switch>
				<Visits />
			</div>
			<NewVisitor />
			<NewVisit />
		</Router>
	);
}

export default Home;
