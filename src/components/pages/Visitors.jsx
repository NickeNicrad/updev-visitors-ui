import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import { getAllVisitors, deleteVisitor, updateVisitor } from '../../api/index';
import profile1 from '../../images/avatar/profile_avatar.png';

function Visitors() {
	const [value, setValue] = useState({
		search: '',
	});

	const [allVisitors, setAllVisitors] = useState([]);

	const openVisitorModal = (visitor) => {
		document.querySelector('#visitor-modal').classList.remove('hidden');
		document.querySelector('#visitor-modal').classList.add('flex');
		updateVisitor(visitor._id);
	};

	const loadVisitors = () => {
		getAllVisitors().then((res) => {
			setAllVisitors(res.data);
		});
	};

	const filteredVisitors = allVisitors.filter(
		(visitor) =>
			(
				visitor.fname +
				' ' +
				visitor.lname +
				' ' +
				visitor.email +
				' ' +
				visitor.phone +
				' ' +
				visitor.address
			)
				.toLowerCase()
				.indexOf(value.search.toLowerCase()) !== -1
	);

	const removeVisitor = (visitor) => {
		const option = window.confirm('are you sure want to delete?');

		if (option) return deleteVisitor(visitor._id);
	};

	useEffect(() => {
		dayjs.extend(relativeTime);
		loadVisitors();
	});

	return (
		<>
			<div className='w-full'>
				<div className='text-sm font-thin text-gray-500 gap-2 flex justify-start'>
					<Link
						className='bg-gray-50 rounded py-2 px-4 hover:bg-gray-100 focus:outline-none'
						to='/'>
						All Visitors
					</Link>
					<Link
						className='bg-gray-50 rounded py-2 px-4 hover:bg-gray-100 focus:outline-none'
						to='/visits'>
						All Visits
					</Link>
				</div>
				<div className='w-full h-16 flex justify-center items-center'>
					<div className='relative'>
						<input
							className='px-10 py-3 w-96 outline-none text-sm shadow rounded bg-gray-50 text-gray-400'
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
								clipRule='evenodd'
							/>
						</svg>
					</div>
				</div>
				<div className='w-full h-14 flex items-center justify-between text-gray-700'>
					<h1 className='font-semibold text-normal'>All Visitors</h1>
					<div>
						<button
							onClick={openVisitorModal}
							className=' relative text-sm px-6 py-2 bg-gray-50 rounded hover:bg-gray-100 focus:outline-none'>
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
				<div className='g-tab shadow-normal overflow-hidden overflow-y-scroll text-gray-700'>
					<table className='w-full text-center text-sm'>
						<thead>
							<tr>
								<th>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										className='h-4 w-5 cursor-pointer text-gray-700 fill-current font-thin mx-auto my-4'
										stroke='currentColor'
										strokeWidth='0'
										fill='none'>
										<path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z' />
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
						<tbody className='g-tab-body'>
							{filteredVisitors &&
								filteredVisitors.map((visitor) => {
									return (
										<tr className=' shadow' key={visitor._id}>
											<td>
												<img
													className='w-12 h-12 rounded-full object-cover mx-auto my-4'
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
													className='px-4 py-2 rounded bg-gray-900 text-gray-400 focus:outline-none hover:bg-gray-800 hover:text-gray-300'>
													edit
												</button>
											</td>
											<td>
												<button
													className='px-4 py-2 rounded bg-red-700 text-gray-50 focus:outline-none hover:bg-red-600 hover:text-gray-600'
													onClick={removeVisitor.bind(this, visitor)}>
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
