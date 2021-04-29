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
					setStartTime(Date.now());
				}
			}, 1000);
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
		// updateVisit(visit._id, timeHolder);
		console.log(timeHolder);
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
	}, []);

	return (
		<div className='w-full'>
			<div className='py-2 px-6 shadow flex justify-between rounded-md'>
				<div className='flex items-center'>
					<span className='text-base font-semibold tracking-widest uppercase text-gray-500'>
						Visitors
					</span>
				</div>
				<div className='flex items-center gap-1'>
					<img className='w-8 h-8 rounded-full' src={profile1} alt='' />
					<span className='text-xs tracking-wider capitalize font-thin text-gray-700'>
						Nicke Nicrad
					</span>
				</div>
			</div>
			<div className='py-3 px-6 shadow mt-6 flex gap-4'>
				<form className='space-y-3'>
					<div>
						<input
							className='w-80 py-4 px-4 outline-none font-thin text-xs shadow rounded-lg'
							type='text'
							placeholder='First Name'
						/>
					</div>

					<div>
						<input
							className='w-80 py-4 px-4 outline-none font-thin text-xs shadow rounded-lg'
							type='text'
							placeholder='Last Name'
						/>
					</div>

					<div>
						<input
							className='w-80 py-4 px-4 outline-none font-thin text-xs shadow rounded-lg'
							type='text'
							placeholder='E-Mail'
						/>
					</div>

					<div>
						<textarea
							className='w-80 py-4 px-4 outline-none font-thin text-xs resize-none shadow rounded-lg'
							placeholder='reason'
							name=''
							id=''
							cols='30'
							rows='4'
						/>
					</div>

					<div className='space-x-3 text-xs'>
						<button
							type='reset'
							className='bg-red-500 text-gray-200 py-3 px-5 rounded-lg focus:outline-none hover:bg-red-400 active:bg-red-600'>
							Cancel
						</button>
						<button
							type='submit'
							className='bg-gray-500 text-gray-200 py-3 px-5 rounded-lg focus:outline-none hover:bg-gray-400 active:bg-gray-600'>
							Submit
						</button>
					</div>
				</form>
				{/* <div className='w-full space-y-2'>
					<img className='w-44 h-44 rounded-full' src={profile1} alt='' />
					<input className='hidden' type='file' accept='image/*' id='pr_img' />
					<label
						className='mx-auto hover:bg-gray-100 cursor-pointer py-2 px-4'
						htmlFor='pr_image'>
						Choose Image
					</label>
				</div> */}
			</div>
		</div>
	);
}

export default Visits;
