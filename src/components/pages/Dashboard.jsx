import React, { useState, useEffect } from 'react';
import { getAllVisitors } from '../../api/index';
import { getAllVisits } from '../../api/index';
import avatar from '../../images/avatar/profile_avatar.png';
import logo from '../../images/logo/IMG_20210131_202241_276.jpg';

function Dashboard() {
	const [value, setValue] = useState({
		about: '',
		role: '',
		phone: '',
		dob: '',
		sex: '',
		country: '',
	});

	const [allVisitors, setAllVisitors] = useState([]);
	const [allVisits, setAllVisits] = useState([]);

	const [user] = useState(JSON.parse(localStorage.getItem('profile')));

	const handleValue = (e) => {
		e.preventDefault();
	};

	const editProfile = (e) => {
		e.preventDefault();
	};

	const loadVisitors = () => {
		getAllVisitors().then((res) => {
			setAllVisitors(res.data);
		});
	};

	const loadVisits = () => {
		getAllVisits().then((res) => {
			setAllVisits(res.data);
		});
	};

	useEffect(() => {
		loadVisitors();
		loadVisits();
	});

	return (
		<>
			<div className='flex gap-4 w-11/12 mx-auto dash-container my-4'>
				<form
					onSubmit={handleValue}
					className='w-96 dm:w-full shadow-md rounded'>
					<div className='flex-none w-full h-44 relative'>
						<img
							src={logo}
							alt=''
							className='w-full h-full object-cover rounded-t-md'
						/>
						<div className='absolute bottom-2 left-2'>
							<h1 className='text-gray-200 font-semibold shadow-inner capitalize'>
								{`${user.result.fname} ${user.result.lname}`}
							</h1>
							<p className='text-gray-50 text-xs shadow-inner'>
								{user.result.email}
							</p>
						</div>
					</div>
					<div className='text-sm text-gray-500 px-4'>
						<p>about </p>
						<div className='flex justify-between'>
							<textarea
								className='font-thin text-xs resize-none focus:outline-none shadow py-1 rounded'
								type='text'
								cols='30'
								rows='3'
								value={value.about}
								onChange={(e) => setValue({ ...value, about: e.target.value })}
							/>
							<button
								className='flex bg-gray-50 h-7 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 shadow focus:outline-none'
								onClick={editProfile}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									class='h-5 w-5'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
									<path
										fill-rule='evenodd'
										d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
										clip-rule='evenodd'
									/>
								</svg>
								<span>edit</span>
							</button>
						</div>
					</div>
					<div className='px-4 py-2'>
						<span className='text-sm text-gray-600'>Role: </span>
						<input
							className='w-40 font-semibold text-sm text-gray-800 shadow py-1 rounded focus:outline-none'
							type='text'
							value={value.role}
							onChange={(e) => setValue({ ...value, role: e.target.value })}
						/>
					</div>
					<div className='px-4 py-2'>
						<span className='text-sm text-gray-600'>Phone: </span>
						<input
							className='w-40 font-semibold text-sm text-gray-800 shadow py-1 rounded focus:outline-none'
							type='text'
							value={value.phone}
							onChange={(e) => setValue({ ...value, phone: e.target.value })}
						/>
					</div>
					<div className='px-4 py-2'>
						<span className='text-sm text-gray-600'>Birth date: </span>
						<input
							className='w-40 font-semibold text-sm text-gray-800 shadow py-1 rounded focus:outline-none'
							type='text'
							value={value.dob}
							onChange={(e) => setValue({ ...value, dob: e.target.value })}
						/>
					</div>
					<div className='px-4 py-2'>
						<span className='text-sm text-gray-600'>Sex: </span>
						<input
							className='w-40 font-semibold text-sm text-gray-800 shadow py-1 rounded focus:outline-none'
							type='text'
							value={value.sex}
							onChange={(e) => setValue({ ...value, sex: e.target.value })}
						/>
					</div>
					<div className='px-4 py-2'>
						<span className='text-sm text-gray-600'>Country: </span>
						<input
							className='w-40 font-semibold text-sm text-gray-800 shadow py-1 rounded focus:outline-none'
							type='text'
							value={value.country}
							onChange={(e) => setValue({ ...value, country: e.target.value })}
						/>
					</div>

					<div>
						<button
							type='submit'
							className='w-full bg-gray-700 text-gray-500 py-2 focus:outline-none rounded mt-4 hover:bg-gray-600 hover:text-gray-500'>
							Update
						</button>
					</div>
				</form>

				<div className='w-full shadow-sm'>
					<div className='w-full h-20 shadow flex justify-center items-center'>
						<h1 className='text-2xl text-gray-500'>
							Welcome to updev visitors app
						</h1>
					</div>
					<div className='w-full h-16'>
						<span>.</span>
					</div>
					<div className='flex'>
						<div className='w-full'>
							{allVisitors &&
								allVisitors.map((visitor) => {
									return (
										<div className='flex w-full h-28 p-2' key={visitor.id}>
											<div className='flex-none w-20 h-20 relative'>
												<img
													src={avatar}
													alt=''
													className='absolute inset-0 w-full h-full object-cover rounded-3xl'
												/>
											</div>
											<div className='ml-2 mt-2'>
												<h1 className='flex-auto text-xs capitalize font-semibold text-gray-700'>
													{`${visitor.fname} ${visitor.lname}`}
												</h1>
												<div className='w-full flex-none text-xs font-thin text-gray-500'>
													{visitor.email}
												</div>
												<div className='w-full flex-none text-xs font-thin capitalize text-gray-500'>
													{visitor.address}
												</div>
												<div className='w-full flex-none text-xs font-thin capitalize text-gray-500'>
													{visitor.phone}
												</div>
											</div>
										</div>
									);
								})}
						</div>
						<div className='w-96'>
							<div className='w-full p-4 h-20 mb-4 text-gray-400 rounded-md shadow'>
								<h1 className='font-bold text-lg'>{allVisitors.length}</h1>
								<p className='text-base'>All Visitors</p>
							</div>
							<div className='w-full p-4 h-20 mb-4 text-gray-200 rounded-md shadow'>
								<h1 className='font-bold text-lg'>{allVisits.length}</h1>
								<p className='text-base'>All Visits</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
