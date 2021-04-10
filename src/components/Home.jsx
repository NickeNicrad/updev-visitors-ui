import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewVisitor from './pages/modals/NewVisitor';
import NewVisit from './pages/modals/NewVisit';
import Visitors from './pages/Visitors';
import Visits from './pages/Visits';
import UserInfos from './UserInfos';

function Home() {
	return (
		<Router>
			<div className='flex gap-4 w-11/12 mx-auto my-4'>
				<UserInfos />
				<Switch>
					<Route path='/' exact component={Visitors} />
					<Route path='/visits' component={Visits} />
				</Switch>
			</div>
			<NewVisitor />
			<NewVisit />
		</Router>
	);
}

export default Home;
