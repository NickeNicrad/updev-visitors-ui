import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as api from '../../../api/index';

function Login() {
	const [value, setValue] = useState({
		email: '',
		password: '',
	});

	const user = useState(JSON.parse(localStorage.getItem('profile')));

	const handlSubmit = (e) => {
		e.preventDefault();
		const { email, password } = value;

		const log_user = {
			email: email.toLowerCase(),
			password,
		};

		api.login(log_user);
		setValue({
			email: '',
			password: '',
		});
	};

	useEffect(() => {
		if (user) {
			return <Redirect to='/' />;
		}
	});

	return (
		<div className='w-full h-full flex flex-row justify-center'>
			<div className='w-96 h-96 bg-gray-300 flex flex-col justify-center items-center absolute top-1/4 rounded-lg box-border'>
				<div className='my-10 font-semibold text-3xl text-gray-700'>
					<h1>Login</h1>
				</div>
				<form className='' onSubmit={handlSubmit}>
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
						<button
							className='w-80 border-none px-2 py-4 text-xs rounded outline-none text-gray-400 bg-gray-700 my-2'
							type='submit'>
							Login
						</button>
					</div>
				</form>
				<div>
					<span className='text-sm text-gray-700'>Don't Have an Account? </span>
					<Link
						className='text-sm text-gray-500 hover:text-gray-400'
						to='signup'>
						SignUp
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;