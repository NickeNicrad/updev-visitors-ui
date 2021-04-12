import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import { updateVisit, getAllVisits } from '../../api/index';
import profile1 from '../../images/avatar/profile_avatar.png';

function Visits() {
	const [value, setValue] = useState({ search: '' });
	const [visits, setVisits] = useState([]);

	// all time concerned states
	const [startTime, setStartTime] = useState('00');
	const [hours, setHours] = useState('00');
	const [minutes, setMinutes] = useState('00');
	const [seconds, setSeconds] = useState('00');

	const openVisitModal = () => {
		document.querySelector('#visit-modal').classList.remove('hidden');
		document.querySelector('#visit-modal').classList.add('flex');
	};

	const printTable = () => {
		const table = document.querySelector('#print-tab').outerHTML;
		document.body.innerHTML = table;
		window.print();
	};

	let interval = useRef();

	const startTimer = (visit) => {
		if (visit._id) {
			const counter = Date.now();
			interval = setInterval(() => {
				const now = Date.now();
				const distance = (counter - now) * -1;

				if (interval < 0) {
					clearInterval(interval.current);
				} else {
					setHours(
						Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
					);
					setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
					setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
				}
			}, 1000);
			setStartTime(Date.now());
		}
	};

	const stopTimer = (visit) => {
		window.clearInterval(interval.current);
		const timeHolder = {
			startTime,
			stopTime: Date.now(),
			duration: {
				hours,
				minutes,
				seconds,
			},
		};
		updateVisit(visit._id, timeHolder);
	};

	const loadVisits = () => {
		getAllVisits().then((res) => {
			setVisits(res.data);
		});
	};

	const filteredVisits = visits.filter(
		(visit) =>
			(
				visit.fname +
				' ' +
				visit.lname +
				' ' +
				visit.visitor +
				' ' +
				visit.visited +
				' ' +
				visit.relationship +
				' ' +
				visit.reason +
				' ' +
				visit.organization
			)
				.toLowerCase()
				.indexOf(value.search.toLowerCase()) !== -1
	);

	useEffect(() => {
		dayjs.extend(relativeTime);
		loadVisits();
	});

	return (
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
						className='px-10 py-3 w-96 outline-none text-sm rounded shadow bg-gray-50 text-gray-400'
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
				<h1 className='font-semibold text-normal'>All Visits</h1>
				<div>
					<button
						onClick={openVisitModal}
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
						<span>add new visit</span>
					</button>

					<button
						onClick={printTable}
						className=' relative text-sm px-6 py-2 ml-2 bg-gray-50 rounded hover:bg-gray-100 focus:outline-none'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'
							className='absolute top-2 left-1 w-5 h-5 text-gray-600'>
							<path
								fillRule='evenodd'
								d='M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z'
								clipRule='evenodd'
							/>
						</svg>
						<span>Print Report</span>
					</button>
				</div>
			</div>
			<div className='g-tab shadow-normal overflow-hidden overflow-y-scroll text-gray-700'>
				<table className='w-full text-center text-sm' id='print-tab'>
					<thead>
						<tr className='py-2'>
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
							<th>Visitor</th>
							<th>Visited</th>
							<th>Reason</th>
							<th>Relationship</th>
							<th>Organization</th>
							<th>Duration</th>
							<th>State</th>
						</tr>
					</thead>
					<tbody>
						{filteredVisits &&
							filteredVisits.map((visit) => {
								return (
									<tr className='shadow p-2 g-tab-body my-2' key={visit._id}>
										<td>
											<img
												className='w-12 h-12 rounded-full object-cover mx-auto my-2'
												src={profile1}
												alt=''
											/>
										</td>

										<td className='space-y-0'>
											<strong className='block capitalize font-semibold'>
												{visit.visitor}
											</strong>
											<span className='block text-xs'>{`${dayjs(
												visit.createdAt
											).fromNow()}`}</span>
										</td>
										<td className='capitalize font-semibold'>
											{visit.visited}
										</td>
										<td>{visit.reason}</td>
										<td>{visit.relationship}</td>
										<td>{visit.company}</td>
										<td className='space-y-0'>
											<strong className='block capitalize font-semibold'>
												{`${visit.duration[0].hours}:${visit.duration[0].minutes}:${visit.duration[0].seconds}`}
											</strong>
											<span className='block text-xs'>{`${dayjs(
												visit.startTime
											).format('HH:mm')}-${dayjs(visit.stopTime).format(
												'HH:mm'
											)}`}</span>
										</td>
										<td>
											<button className='rounded bg-transparent text-gray-700 mx-1 focus:outline-none'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='h-5 w-5'
													viewBox='0 0 20 20'
													fill='currentColor'
													onClick={startTimer.bind(this, visit)}>
													<path
														fillRule='evenodd'
														d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
														clipRule='evenodd'
													/>
												</svg>
											</button>
											<button className='rounded bg-transparent text-gray-700 mx-1 focus:outline-none'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='h-5 w-5'
													viewBox='0 0 20 20'
													fill='currentColor'
													onClick={stopTimer.bind(this, visit)}>
													<path
														fillRule='evenodd'
														d='M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z'
														clipRule='evenodd'
													/>
												</svg>
											</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Visits;
