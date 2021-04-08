import React from 'react';
import { Link } from 'react-router-dom';

function SideBar() {
	return (
		<div className=' bg-gray-600'>
			<ul className='w-full text-center text-gray-400 box-border'>
				<Link to='/'>
					<li className='p-4 hover:bg-gray-700 option'>Home</li>
				</Link>
				<Link to='/visitors'>
					<li className='p-4 hover:bg-gray-700 option'>Visitors</li>
				</Link>
				<Link to='/visits'>
					<li className='p-4 hover:bg-gray-700 option'>Visits</li>
				</Link>
			</ul>
		</div>
	);
}

export default SideBar;
