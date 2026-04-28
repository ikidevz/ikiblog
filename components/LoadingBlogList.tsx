const LoadingBlogList = () => {
	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='flex space-x-4'>
				<div className='w-4 h-4 bg-black rounded-full animate-bounce delay-75'></div>
				<div className='w-4 h-4 bg-black rounded-full animate-bounce delay-150'></div>
				<div className='w-4 h-4 bg-black rounded-full animate-bounce delay-225'></div>
			</div>
		</div>
	);
};

export default LoadingBlogList;
