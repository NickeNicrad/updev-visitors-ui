import React, { useState } from 'react';
import Link from 'react-router-dom/Link';
import avatar from '../images/avatar/profile_avatar.png';

function UserInfos() {
	const [user] = useState(JSON.parse(localStorage.getItem('profile')));

	return (
		<div className='w-64 h-96 p-2 space-y-2 rounded-lg shadow'>
			<div className='item p-4 w-full shadow-sm hover:shadow hover:bg-gray-100 rounded-md flex cursor-pointer'>
				<Link className='w-64 text-center mx-auto text-gray-400'>
					Dashboard
				</Link>
			</div>
			<div className='item p-4 w-full shadow-sm hover:shadow hover:bg-gray-100 rounded-md flex cursor-pointer'>
				<Link className='w-64 text-center mx-auto text-gray-400'>Home</Link>
			</div>
		</div>
	);
}

export default UserInfos;
