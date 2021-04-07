import React, { useState } from 'react';
import profile1 from '../images/profiles/profile3.jpg';

function NavBar() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

	const openDropdown = () => {
		const dropdown = document.querySelector('#acc-dropdown');
		dropdown.classList.toggle('hidden');
	};

	const signOut = () => {
		document.querySelector('#acc-dropdown').classList.add('hidden');
		setUser(null);
		localStorage.clear();
	};

	return (
		<>
			{user ? (
				<div className='h-12 bg-gray-700 font-thin'>
					<div className='mx-auto flex justify-between items-center h-12 w-4/5'>
						<ul className='flex gap-2'>
							<li>logo</li>
							<li></li>
						</ul>

						<ul className='flex gap-2 text-gray-400 cursor-pointer'>
							<li
								className='relative flex hover:text-gray-500'
								onClick={openDropdown}>
								<span className='mr-1 capitalize'>
									{`${user.result.fname} ${user.result.lname}`}
								</span>
								<img
									src={profile1}
									alt=''
									className='h-8 w-8 rounded-full object-cover'
								/>
								{navigator.onLine ? (
									<i className='h-2 w-2 bg-green-600 absolute rounded-full bottom-0 right-0'></i>
								) : (
									<i className='h-2 w-2 bg-red-700 absolute rounded-full bottom-0 right-0'></i>
								)}
							</li>
						</ul>
					</div>

					{/* dropdown */}
					<div
						className='w-60 h-60 right-8 border-t-1 px-4 py-1 text-gray-400 rounded-b bg-gray-700 absolute z-50 hidden'
						id='acc-dropdown'>
						<center className='space-y-0'>
							<div className='relative'>
								<img className='w-24 rounded-full' src={profile1} alt='' />
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									className='w-6 absolute right-14 bottom-0 p-1 bg-gray-700 rounded-full hover:bg-gray-600 cursor-pointer'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
									/>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
									/>
								</svg>
							</div>
							<div>
								<span className='text-normal font-semibold text-gray-300'>
									Nicke Nicrad
								</span>
							</div>
							<div>
								<span className='text-sm'>nickenirad@gmail.com</span>
							</div>
							<div>
								<button className='w-full px-4 py-1 rounded hover:bg-gray-600 focus:outline-none'>
									Manage Account
								</button>
							</div>
							<div>
								<button
									onClick={signOut}
									className='w-full px-4 py-1 rounded hover:bg-gray-600 outline-none flex justify-center'>
									<span>SignOut</span>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										className='w-4 ml-2 my-auto'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
										/>
									</svg>
								</button>
							</div>
						</center>
					</div>
				</div>
			) : (
				<div className='h-12 bg-gray-700 font-thin'>
					<div className='mx-auto flex justify-center items-center h-12 w-4/5'>
						cdscds
					</div>
				</div>
			)}
		</>
	);
}

export default NavBar;
