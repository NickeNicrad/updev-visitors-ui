import React, { useState } from 'react';
import avatar from '../images/avatar/profile_avatar.png';

function UserInfos() {
	const [user] = useState(JSON.parse(localStorage.getItem('profile')));

	return (
		<>
			<div className='w-96 dm:w-full shadow-md rounded hidden lg:block'>
				<div className='flex-none w-full h-44 relative'>
					<img
						src={avatar}
						alt=''
						className='w-full h-full rounded-t-md object-cover'
					/>
					<div className='absolute bottom-2 left-2'>
						<h1 className='text-gray-300 font-semibold shadow-inner capitalize'>
							{`${user.fname} ${user.lname}`}
						</h1>
						<p className='text-gray-200 text-xs shadow-inner'>{user.email}</p>
					</div>
					<div className='absolute bg-gray-50 rounded-full top-2 right-2 font-thin text-gray-400 text-xs p-1 hover:bg-gray-100 hover:text-gray-500 cursor-pointer'>
						<input
							className='hidden'
							type='file'
							accept='image/*'
							id='edit-user-img'
							onChange=''
						/>
						<label htmlFor='edit-user-img'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								className='w-4 h-4 cursor-pointer'>
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
						</label>
					</div>
				</div>

				<div className='px-2 text-base font-semibold w-full p-2'>
					<h1>Personal Information</h1>
				</div>

				<div className='px-2 text-gray-600 text-sm'>
					<div className='flex gap-1 items-center mt-1'>
						<span>Address: </span>
						<span className='font-semibold'>{user.address}</span>
					</div>

					<div className='flex gap-1 items-center mt-2'>
						<span>Phone: </span>
						<span className='font-semibold'>{user.phone}</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default UserInfos;
