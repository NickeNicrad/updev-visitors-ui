import React from 'react';

function Footer() {
	return (
		<div className='w-full bg-gray-900 text-gray-400 py-4 font-thin bottom-0 fixed'>
			<center>Copyright &copy; {new Date().getFullYear()}</center>
		</div>
	);
}

export default Footer;
