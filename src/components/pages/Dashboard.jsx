import React, { useState, useEffect } from 'react';
import { getAllVisitors } from '../../api/index';
import { getAllVisits } from '../../api/index';
import PieChart from './charts/PieChart';
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
		<div className='bg-gray-900 w-full'>
			<div className='flex justify-around bg-gray-900 text-gray-200 py-4 px-8 text-xs font-thin'>
				<div className=''>
					<h1 className='text-2xl tracking-widest font-semibold'>600</h1>
					<span>All Visits</span>
				</div>
				<div className=''>
					<h1 className='text-2xl tracking-widest font-semibold'>300</h1>
					<span>Weekly Visits</span>
				</div>
				<div className=''>
					<h1 className='text-2xl tracking-widest font-semibold'>50</h1>
					<span>Visitors/Day</span>
				</div>
			</div>

			<div className='flex justify-between'>
				<div className='w-full'>
					<PieChart />
				</div>
				<div>
					<table>
						<tr>
							<th>Full Name</th>
							<th>E-Mail</th>
							<th>Company</th>
							<th>Status</th>
						</tr>

						<tr>
							<td>Nicke Nicrad</td>
							<td>nickenicrad@gmail.com</td>
							<td>Microsoft</td>
							<td>New</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
