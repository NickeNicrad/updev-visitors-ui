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
		<div>
			<div className='relative'>
				<input
					className='w-96 py-3 pl-5 pr-9 rounded-lg shadow outline-none font-thin text-gray-500'
					type='text'
					name=''
					id=''
					placeholder='recherche'
				/>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5 absolute right-3 top-4 text-gray-400'
					viewBox='0 0 20 20'
					fill='currentColor'>
					<path
						fillRule='evenodd'
						d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
						clipRule='evenodd'
					/>
				</svg>
			</div>
			<div>
				<div className='shadow mt-6 flex items-center p-2 rounded-lg gap-2 cursor-pointer hover:bg-gray-100 active:bg-gray-200'>
					<img className='w-16 rounded-full' src={profile1} alt='' />
					<div className='leading-5'>
						<span className='text-gray-700'>Nicke Nicrad</span>
						<br />
						<span className='text-xs text-gray-400 px-1 py-0 rounded-md bg-blue-200'>
							CEO
						</span>
					</div>
					<div className='h-20'></div>
					<div className='block text-xs text-gray-600 tracking-wide leading-5'>
						<span>nickenicrad@gmail.com</span>
						<br />
						<span>0789184496</span>
					</div>

					{/* <div className='text-xl font-bold text-gray-500'>...</div> */}
				</div>

				<div className='shadow mt-6 flex items-center p-2 rounded-lg gap-2 cursor-pointer'>
					<img className='w-16 rounded-full' src={profile1} alt='' />
					<div className='leading-5'>
						<span className='text-gray-700'>Nicke Nicrad</span>
						<br />
						<span className='text-xs text-gray-400 px-1 py-0 rounded-md bg-blue-200'>
							CEO
						</span>
					</div>
					<div className='h-20'></div>
					<div className='block text-xs text-gray-600 tracking-wide leading-5'>
						<span>nickenicrad@gmail.com</span>
						<br />
						<span>0789184496</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Visitors;
