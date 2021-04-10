import React, { useState, useEffect } from 'react';
import 'cleave.js/dist/addons/cleave-phone.rw';
import CleavePhone from 'cleave.js/react';
import { updateUser, updateUserPassword } from '../../../api/index';
import avatar from '../../../images/avatar/profile_avatar.png';
function ManageAccount() {
	const [user] = useState(JSON.parse(localStorage.getItem('profile')));
	const { pr_image, fname, lname, email, phone, address } = user.result;
	const [value, setValue] = useState({
		pr_image,
		fname,
		lname,
		email,
		phone,
		address,
	});

	const [passValue, setPassValue] = useState({
		password: '',
		newPass: '',
		confirmPass: '',
	});

	const [error, setError] = useState({
		userError: '',
		passError: '',
	});

	const [success, setSuccess] = useState();

	const openModal = (e) => {
		e.preventDefault();
		document.querySelector('#change-pass-modal').classList.toggle('hidden');
	};

	const closeModal = () => {
		document.querySelector('#account-modal').classList.add('hidden');
		document.querySelector('#change-pass-modal').classList.add('hidden');
	};

	const handleValue = (e) => {
		e.preventDefault();
		const { pr_image, fname, lname, email, phone, address } = value;
		const userUpdated = {
			pr_image,
			fname,
			lname,
			email,
			phone,
			address,
		};
		updateUser(user.result._id, userUpdated);
	};

	const handelPasswordValue = (e) => {
		e.preventDefault();
		const { password, newPass, confirmPass } = passValue;
		const userPassword = { password, newPass };
		if (newPass !== confirmPass)
			return setError({ passError: 'new password not same' });
		updateUserPassword(user.result._id, userPassword)
			.then((res) => {
				setSuccess(res.data);
			})
			.catch((err) => {
				setError({ passError: err.response.data.msg });
			});
	};

	const previewProfile = (e) => {
		if (e.target.files.length > 0) {
			const src = URL.createObjectURL(e.target.files[0]);
			const preview = document.querySelector('#pr-image');
			preview.src = src;
			const pr_image = e.target.files[0];
			setValue({ pr_image });
		}
	};

	useEffect(() => {});

	return (
		<div className='w-full modal-container hidden gap-8' id='account-modal'>
			<div className='modal-content bg-gray-900 p-2 rounded'>
				<form onSubmit={handleValue}>
					<div className='w-full flex justify-between'>
						<span className='w-8'></span>
						<h1 className='text-lg font-thin text-gray-600'>Update Infos</h1>
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
					<div className='relative w-36 h-36 mx-auto my-2'>
						<img
							className='w-36 h-36 mx-auto rounded-full object-cover'
							id='pr-image'
							src={avatar}
							alt=''
						/>
						<input
							className='hidden'
							type='file'
							name='profile'
							id='edit-pr-image'
							accept='image/*'
							onChange={previewProfile}
						/>
						<label htmlFor='edit-pr-image'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								class='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								className='w-6 absolute bottom-0 right-6 bg-gray-100 rounded-full border-2 cursor-pointer hover:bg-gray-300 text-gray-600'>
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
					</div>
					<div>
						<input
							type='text'
							placeholder='First Name'
							className='w-72 m-1 px-2 py-3 rounded text-xs outline-none text-gray-400'
							value={value.fname}
							onChange={(e) => setValue({ ...value, fname: e.target.value })}
						/>
					</div>
					<div>
						<input
							type='text'
							placeholder='Last Name'
							className='w-72 m-1 px-2 py-3 rounded text-xs outline-none text-gray-400'
							value={value.lname}
							onChange={(e) => setValue({ ...value, lname: e.target.value })}
						/>
					</div>
					<div>
						<input
							type='email'
							placeholder='E-Mail'
							className='w-72 m-1 px-2 py-3 rounded text-xs outline-none text-gray-400'
							value={value.email}
							onChange={(e) => setValue({ ...value, email: e.target.value })}
						/>
					</div>
					<div>
						<CleavePhone
							placeholder='Phone'
							value={value.phone}
							className='w-72 m-1 px-2 py-3 rounded text-xs outline-none text-gray-400'
							options={{
								phone: true,
								phoneRegionCode: 'RW',
							}}
							onChange={(e) => setValue({ ...value, phone: e.target.value })}
						/>
					</div>
					<div>
						<input
							type='address'
							placeholder='Address'
							className='w-72 m-1 px-2 py-3 rounded text-xs outline-none text-gray-400'
							value={value.address}
							onChange={(e) => setValue({ ...value, address: e.target.value })}
						/>
					</div>

					<div>
						<button
							type='submit'
							className='w-72 m-1 px-2 py-3 rounded text-xs outline-none bg-gray-800 text-gray-500 hover:bg-gray-700 hover:text-gray-800 focus:outline-none'
							disabled={
								value.fname === '' ||
								value.lname === '' ||
								value.email === '' ||
								value.phone === '' ||
								value.address === '' ||
								value.sex === '' ||
								value.dob === ''
							}>
							Update
						</button>
					</div>

					<div className='w-full flex'>
						<button
							onClick={openModal}
							className='mx-auto text-sm text-gray-500 focus:outline-none hover:bg-gray-800 px-1 rounded'>
							Change Password
						</button>
					</div>
				</form>
			</div>
			{/* modal change user password */}
			<form
				className='p-2 bg-gray-900 rounded shadow hidden'
				id='change-pass-modal'
				onSubmit={handelPasswordValue}>
				<div>
					<input
						className='mb-2 rounded p-2 text-xs outline-none'
						type='password'
						placeholder='Current Password'
						value={passValue.password}
						onChange={(e) =>
							setPassValue({ ...passValue, password: e.target.value })
						}
					/>
				</div>

				<div>
					<input
						className='mb-2 rounded p-2 text-xs outline-none'
						type='password'
						placeholder='New Password'
						value={passValue.newPass}
						onChange={(e) =>
							setPassValue({ ...passValue, newPass: e.target.value })
						}
					/>
				</div>

				<div>
					<input
						className='mb-2 rounded p-2 text-xs outline-none'
						type='password'
						placeholder='Confirm Password'
						value={passValue.confirmPass}
						onChange={(e) =>
							setPassValue({ ...passValue, confirmPass: e.target.value })
						}
					/>
				</div>

				<div className='flex'>
					<button
						type='submit'
						className='w-full mx-auto rounded px-4 py-2 bg-gray-800 text-gray-500 text-xs focus:outline-none'>
						Change Password
					</button>
				</div>
				<div className='flex'>
					<span className='mx-auto text-xs text-gray-600 capitalize'>
						{error.passError}
					</span>
					<span>{success}</span>
				</div>
			</form>
		</div>
	);
}

export default ManageAccount;
