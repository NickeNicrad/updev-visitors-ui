import React, { useState } from 'react';
import * as api from '../../../api/index';
import avatar from '../../../images/avatar/profile_avatar.png';
import visitor from '../../../images/avatar/visitor-reception.png';

function NewVisitor() {
	const [value, setValue] = useState({
		fg_image: '',
		fname: '',
		lname: '',
		email: '',
		phone: '',
		address: '',
	});

	const previewProfile = (e) => {
		if (e.target.files.length > 0) {
			const src = URL.createObjectURL(e.target.files[0]);
			const preview = document.querySelector('#fg-image');
			preview.src = src;
			const fg_image = e.target.files[0];
			setValue({ fg_image });
		}
	};

	const handleValue = (e) => {
		e.preventDefault();
		const { fname, lname, email, phone, address } = value;
		const newVisitor = {
			fname,
			lname,
			email,
			phone,
			address,
		};
		api.createVisitor(newVisitor);
		setValue({ fname: '', lname: '', email: '', phone: '', address: '' });
		document.querySelector('.visitor-modal-container').style.display = 'none';
	};

	const closeModal = () => {
		document.querySelector('.visitor-modal-container').style.display = 'none';
	};

	return (
		<div className='visitor-modal-container'>
			<div className='visitor-modal-content rounded bg-gray-700 flex justify-center'>
				<div className='flex gap-1'>
					<div className='w-full h-full'>
						<img className='w-full h-full rounded' src={visitor} alt='' />
					</div>
					<div>
						<div className='h-8 mb-1 flex justify-between'>
							<span></span>
							<h1 className='font-thin text-lg text-gray-400'>Add Visitor</h1>
							<button className='w-8 h-full focus:outline-none'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									className='h-full w-full text-gray-600 bg-gray-700 hover:bg-gray-600 hover:text-gray-700 rounded'
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
						<center className='w-28 relative my-3 mx-auto rounded-full overflow-hidden'>
							<img
								src={avatar}
								alt=''
								className='w-28 h-28 rounded-full object-cover'
								id='fg-image'
							/>
							<input
								id='add-fg-img'
								type='file'
								accept='image/*'
								onChange={previewProfile}
								className='hidden'
							/>
							<label
								htmlFor='add-fg-img'
								className='absolute bottom-0 right-0 rounded-full'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									className='w-full h-5 cursor-pointer hover:bg-gray-300 text-gray-400'>
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
						</center>
						<form>
							<div>
								<input
									type='text'
									placeholder='First Name'
									className='w-72 m-1 px-2 py-3 rounded text-xs outline-none text-gray-400'
									value={value.fname}
									onChange={(e) =>
										setValue({ ...value, fname: e.target.value })
									}
								/>
							</div>
							<div>
								<input
									type='text'
									placeholder='Last Name'
									className='w-72 m-1 px-2 py-3 rounded text-xs outline-none text-gray-400'
									value={value.lname}
									onChange={(e) =>
										setValue({ ...value, lname: e.target.value })
									}
								/>
							</div>
							<div>
								<input
									type='email'
									placeholder='E-Mail'
									className='w-72 m-1 px-2 py-3 rounded text-xs outline-none text-gray-400'
									value={value.email}
									onChange={(e) =>
										setValue({ ...value, email: e.target.value })
									}
								/>
							</div>
							<div>
								<input
									type='phone'
									placeholder='Phone'
									className='w-72 m-1 px-2 py-3 rounded text-xs outline-none text-gray-400'
									value={value.phone}
									onChange={(e) =>
										setValue({ ...value, phone: e.target.value })
									}
								/>
							</div>
							<div>
								<input
									type='address'
									placeholder='Address'
									className='w-72 m-1 px-2 py-3 rounded text-xs outline-none text-gray-400'
									value={value.address}
									onChange={(e) =>
										setValue({ ...value, address: e.target.value })
									}
								/>
							</div>
							<div>
								<button
									type='submit'
									className='w-72 m-1 px-2 py-3 rounded text-xs outline-none bg-gray-600 text-gray-400 hover:bg-gray-500 hover:text-gray-600 focus:outline-none'
									onClick={handleValue}
									disabled={
										value.fname === '' ||
										value.lname === '' ||
										value.email === '' ||
										value.phone === '' ||
										value.address === ''
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

export default NewVisitor;
