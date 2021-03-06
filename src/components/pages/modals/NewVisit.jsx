import React, { useState, useEffect } from 'react';
import { createVisit, getAllVisitors } from '../../../api/index';
import visit from '../../../images/avatar/visit-reception.png';

function NewVisit() {
	const [value, setValue] = useState({
		visitor: '',
		visited: '',
		organization: '',
		relationship: '',
		reason: '',
		startTime: '',
		stopTime: '',
		duration: '',
	});

	const [allVisitors, setAllVisitors] = useState([]);

	const handleValue = (e) => {
		e.preventDefault();
		const {
			visitor,
			visited,
			organization,
			relationship,
			reason,
			startTime,
			stopTime,
			duration,
		} = value;
		const newVisit = {
			visitor,
			visited,
			organization,
			relationship,
			reason,
			startTime,
			stopTime,
			duration,
		};
		createVisit(newVisit);
		setValue({
			visitor: '',
			visited: '',
			organization: '',
			relationship: '',
			reason: '',
			stopTime,
			duration,
		});
	};

	const closeModal = () => {
		document.querySelector('#visit-modal').classList.add('hidden');
		setValue({
			visitor: '',
			visited: '',
			organization: '',
			relationship: '',
			reason: '',
		});
	};

	const loadAllVisitors = () => {
		getAllVisitors().then((res) => {
			setAllVisitors(res.data);
		});
	};

	useEffect(() => {
		loadAllVisitors();
	});

	return (
		<div className='modal-container hidden' id='visit-modal'>
			<div className='modal-content rounded bg-gray-900 flex justify-center'>
				<div className='flex gap-1'>
					<div className='w-full h-full'>
						<img className='w-full h-96 rounded-l' src={visit} alt='' />
					</div>
					<div>
						<div className='h-8 mb-1 flex justify-between items-center'>
							<span></span>
							<h1 className='font-thin text-gray-400 text-xl'>Add Visit</h1>
							<button className='w-8 h-full focus:outline-none'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									className='h-full w-full text-gray-700 bg-gray-800 hover:bg-gray-700 hover:text-gray-800 rounded'
									onClick={closeModal}>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</div>
						<form>
							<div className=''>
								<select
									name='users'
									className='w-72 m-1 px-2 py-3 rounded text-xs outline-none text-gray-400'
									onChange={(e) =>
										setValue({ ...value, visitor: e.target.value })
									}>
									<option defaultValue selected disabled>
										Select Visitor
									</option>
									{allVisitors.map((visitor) => {
										return (
											<option
												key={visitor._id}
												className='capitalize'
												defaultValue>{`${visitor.fname} ${visitor.lname}`}</option>
										);
									})}
								</select>
							</div>
							<div>
								<input
									type='text'
									placeholder='Person Visited'
									className='w-72 m-1 px-2 py-3 rounded text-xs outline-none text-gray-400'
									value={value.visited}
									onChange={(e) =>
										setValue({ ...value, visited: e.target.value })
									}
								/>
							</div>
							<div>
								<input
									type='text'
									placeholder='Relationship'
									className='w-72 m-1 px-2 py-3 rounded text-xs outline-none text-gray-400'
									value={value.relationship}
									onChange={(e) =>
										setValue({ ...value, relationship: e.target.value })
									}
								/>
							</div>
							<div>
								<input
									type='text'
									placeholder='Organization'
									className='w-72 m-1 px-2 py-3 rounded text-xs outline-none text-gray-400'
									value={value.organization}
									onChange={(e) =>
										setValue({ ...value, organization: e.target.value })
									}
								/>
							</div>
							<div>
								<textarea
									name=''
									id=''
									cols='30'
									rows='4'
									placeholder='Reason of Visit'
									className='w-72 m-1 px-2 py-3 rounded text-xs outline-none text-gray-400 resize-none'
									onChange={(e) =>
										setValue({ ...value, reason: e.target.value })
									}
								/>
							</div>

							<div>
								<button
									type='submit'
									className='w-72 m-1 px-2 py-3 rounded text-xs outline-none bg-gray-800 text-gray-500 hover:bg-gray-700 hover:text-gray-800 focus:outline-none'
									onClick={handleValue}
									disabled={
										value.visitor === '' ||
										value.visited === '' ||
										value.organization === '' ||
										value.relationship === '' ||
										value.reason === ''
									}>
									Add
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewVisit;
