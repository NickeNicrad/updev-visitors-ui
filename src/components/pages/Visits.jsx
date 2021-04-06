import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { updateVisit, getAllVisits } from '../../api/index';
import profile1 from '../../images/profiles/profile2.jpg';

function Visits() {
	const [value, setValue] = useState({ search: '' });
	const [visits, setVisits] = useState([]);

	// all time concerned states
	const [startTime, setStartTime] = useState('00');
	const [stopTime, setStopTime] = useState('00');
	const [hours, setHours] = useState('00');
	const [minutes, setMinutes] = useState('00');
	const [seconds, setSeconds] = useState('00');

	const openVisitModal = () => {
		document.querySelector('.visit-modal-container').style.display = 'flex';
	};

	let interval = useRef();

	const startTimer = () => {
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
	};

	const stopTimer = () => {
		setStopTime(Date.now());
		window.clearInterval(interval.current);
		const duration = {
			hours,
			minutes,
			seconds,
		};
		updateVisit(startTime, stopTime, duration);
	};

	const loadVisits = () => {
		getAllVisits().then((res) => {
			setVisits(res.data);
		});
	};

	useEffect(() => {
		dayjs.extend(relativeTime);
		loadVisits();
	});

	return (
		<div className='w-full px-10'>
			<div className='w-full h-24 flex justify-center items-center bg-gray-50'>
				<div className='relative'>
					<input
						className='px-10 py-3 w-96 outline-none text-sm rounded shadow bg-gray-100 text-gray-400'
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
				<h1 className='font-semibold text-normal'>All Visits</h1>
				<div>
					<button
						onClick={openVisitModal}
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
						<span>add new visit</span>
					</button>

					<button className=' relative text-sm px-6 py-2 ml-2 bg-gray-100 rounded hover:bg-gray-300 focus:outline-none'>
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
						<span>Print Report</span>
					</button>
				</div>
			</div>
			<div className='shadow-normal overflow-hidden overflow-y-scroll text-gray-700 g-tab'>
				<table className='w-full text-center text-sm'>
					<thead>
						<tr className='py-2'>
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
						{visits &&
							visits.map((visit) => {
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
											<span className='block text-xs'>{visit.createdAt}</span>
										</td>
										<td className='capitalize font-semibold'>
											{visit.visited}
										</td>
										<td>{visit.reason}</td>
										<td>{visit.relationship}</td>
										<td>{visit.company}</td>
										<td className='space-y-0'>
											<strong className='block capitalize font-semibold'>
												{`${hours}:${minutes}:${seconds}`}
											</strong>
											<span className='block text-xs'>{`${dayjs(
												startTime
											).format('HH:mm')}-${dayjs(stopTime).format(
												'HH:mm'
											)}`}</span>
										</td>
										<td>
											<button
												onClick={startTimer}
												className='px-1 mx-1 rounded bg-gray-700 text-gray-400'>
												Start
											</button>
											<button
												onClick={stopTimer}
												className='px-1 mx-1 rounded bg-gray-700 text-gray-400'>
												Finish
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
