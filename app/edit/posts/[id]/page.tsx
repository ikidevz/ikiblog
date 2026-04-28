import PostEdit from "@/components/PostEdit";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const EditPosts = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const supabase = createClient();

	const { data } = await (await supabase)
		.from("Posts")
		.select()
		.eq("id", id)
		.single();

	return (
		<>
			<section className='post_header_container min-h-100 mb-8'>
				<h1 className='heading'>Edit Your Own Blog Project</h1>
			</section>

			<PostEdit post={data} />
		</>
	);
};

export default EditPosts;
