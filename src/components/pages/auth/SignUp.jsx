import React, { useState, useEffect } from 'react';
import * as api from '../../../api/index';

function SignUp() {
	const [value, setValue] = useState({
		fname: '',
		lname: '',
		email: '',
		password: '',
		confirmPass: '',
	});

	const user = useState(JSON.parse(localStorage.getItem('profile')));

	const handlSubmit = (e) => {
		e.preventDefault();
		const { fname, lname, email, password, confirmPass } = value;

		if (password !== confirmPass) {
			alert('use the same password to confirm');
		} else {
			const reg_user = {
				fname,
				lname,
				email: email.toLowerCase(),
				password,
			};

			api.signup(reg_user);

			setValue({
				fname: '',
				lname: '',
				email: '',
				password: '',
				confirmPass: '',
			});
		}
	};

	useEffect(() => {
		if (user[0]) {
			window.location = '/';
		}
	});

	return (
		<div className='w-full h-full flex flex-row justify-center'>
			<div className='w-96 bg-gray-100 flex flex-col justify-center items-center absolute top-28 rounded-lg box-border p-6'>
				<div className='my-4 font-semibold text-3xl text-gray-700'>
					<h1>Sign Up</h1>
				</div>
				<form className='' onSubmit={handlSubmit}>
					<div>
						<input
							className='w-80 border-transparent px-2 py-4 text-xs rounded outline-none text-gray-500 my-2'
							type='text'
							placeholder='First Name'
							value={value.fname}
							onChange={(e) => setValue({ ...value, fname: e.target.value })}
						/>
					</div>
					<div>
						<input
							className='w-80 border-transparent px-2 py-4 text-xs rounded outline-none text-gray-500 my-2'
							type='text'
							placeholder='Last Name'
							value={value.lname}
							onChange={(e) => setValue({ ...value, lname: e.target.value })}
						/>
					</div>
					<div>
						<input
							className='w-80 border-transparent px-2 py-4 text-xs rounded outline-none text-gray-500 my-2'
							type='email'
							placeholder='E-Mail'
							value={value.email}
							onChange={(e) => setValue({ ...value, email: e.target.value })}
						/>
					</div>
					<div>
						<input
							className='w-80 border-transparent px-2 py-4 text-xs rounded outline-none text-gray-500 my-2'
							type='password'
							placeholder='Password'
							value={value.password}
							onChange={(e) => setValue({ ...value, password: e.target.value })}
						/>
					</div>
					<div>
						<input
							className='w-80 border-transparent px-2 py-4 text-xs rounded outline-none text-gray-500 my-2'
							type='password'
							placeholder='Confirm Password'
							value={value.confirmPass}
							onChange={(e) =>
								setValue({ ...value, confirmPass: e.target.value })
							}
						/>
					</div>
					<div>
						<button
							className='w-80 border-none px-2 py-4 text-xs rounded outline-none text-gray-400 bg-gray-700 my-2'
							type='submit'
							disabled={
								value.fname === '' ||
								value.lname === '' ||
								value.email === '' ||
								value.email === '' ||
								value.password === ''
							}>
							SignUp
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
