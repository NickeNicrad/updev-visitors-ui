import React from 'react';

function Footer() {
	return (
		<div className='bg-gray-700 text-gray-400 py-4 font-thin'>
			<center>Copyright &copy; {new Date().getFullYear()} updev</center>
		</div>
	);
}

export default Footer;