import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getAllVisitors, getVisitor } from '../../api/index';
import profile1 from '../../images/profiles/profile2.jpg';

function Visitors() {
	const [value, setValue] = useState({
		search: '',
	});

	// const [singleVisitor, setSingleVisitor] = useState();

	const [allVisitors, setAllVisitors] = useState([]);
	// const [error, setError] = useState([]);

	const openVisitorModal = (visitor) => {
		document.querySelector('.visitor-modal-container').style.display = 'flex';
		// getVisitor(visitor._id).then((res) => {
		// 	setSingleVisitor(res.data);
		// });
	};

	const loadVisitors = () => {
		getAllVisitors().then((res) => {
			setAllVisitors(res.data);
		});
	};

	const filterVisitors = () => {
		allVisitors.filter((visitor) => {
			return (
				(visitor.fname || visitor.lname || visitor.email || visitor.phone)
					.toLowerCase()
					.indexOf(value.search.toLowerCase()) !== -1
			);
		});
	};

	useEffect(() => {
		dayjs.extend(relativeTime);
		loadVisitors();
	});

	console.log('visitors: ', filterVisitors);

	return (
		<>
			<div className='w-full px-10 visitors-container'>
				<div className='w-full h-24 flex justify-center items-center bg-gray-50'>
					<div className='relative'>
						<input
							className='px-10 py-3 w-96 outline-none text-sm shadow rounded bg-gray-100 text-gray-400'
							placeholder='search'
							type='text'
							value={value.search}
							onChange={(e) => {
								setValue({ ...value, search: e.target.value });
							}}
						/>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							className='h-5 w-5 absolute top-3 left-3 cursor-pointer text-gray-400 z-20 fill-current font-thin'
							stroke='currentColor'
							strokeWidth='0'
							fill='none'>
							<path
								d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
								clip-rule='evenodd'
							/>
						</svg>
					</div>
				</div>
				<div className='w-full h-14 flex items-center justify-between text-gray-700'>
					<h1>All Visitors</h1>
					<div>
						<button
							onClick={openVisitorModal}
							className=' relative text-sm px-6 py-2 bg-gray-100 rounded hover:bg-gray-300 focus:outline-none'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								className='absolute top-2 left-1 w-5 h-5'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M12 6v6m0 0v6m0-6h6m-6 0H6'
								/>
							</svg>
							<span>add new visitor</span>
						</button>
					</div>
				</div>
				<div className='g-tab text-gray-700'>
					<table className='w-full text-center text-sm'>
						<thead>
							<tr>
								<th>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										className='h-5 w-5 cursor-pointer text-gray-400 fill-current font-thin mx-auto'
										stroke='currentColor'
										strokeWidth='0'
										fill='none'>
										<path
											d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
											clip-rule='evenodd'
										/>
									</svg>
								</th>
								<th>Full Name</th>
								<th>E-Mail</th>
								<th>Phone</th>
								<th>Address</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{allVisitors &&
								allVisitors.map((visitor) => {
									return (
										<tr className=' shadow-lg'>
											<td>
												<img
													className='w-12 h-12 rounded-full object-cover mx-auto'
													src={profile1}
													alt=''
												/>
											</td>
											<td className='space-y-0'>
												<strong className='block font-semibold capitalize'>
													{`${visitor.fname} ${visitor.lname}`}
												</strong>
												<span className='block font-thin text-xs'>
													{dayjs(visitor.createdAt).fromNow()}
												</span>
											</td>
											<td>{visitor.email}</td>
											<td>{visitor.phone}</td>
											<td className='capitalize'>{visitor.address}</td>
											<td>
												<button
													onClick={openVisitorModal.bind(this, visitor)}
													className='px-4 py-2 rounded bg-gray-700 text-gray-400 focus:outline-none hover:bg-gray-600 hover:text-gray-300'>
													edit
												</button>
											</td>
											<td>
												<button className='px-4 py-2 rounded bg-red-700 text-white focus:outline-none hover:bg-red-500 hover:text-gray-600'>
													delete
												</button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default Visitors;
