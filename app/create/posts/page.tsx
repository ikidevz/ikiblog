import PostForm from "@/components/PostForm";

const CreatePost = () => {
	return (
		<>
			<section className='post_header_container min-h-100 mb-8'>
				<h1 className='heading'>Create Your Own Blog Project</h1>
			</section>

			<PostForm />
		</>
	);
};

export default CreatePost;
