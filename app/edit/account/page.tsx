import { roboto_mono } from "@/lib/font";
import { createClient } from "@/utils/supabase/server";

import EditProfile from "@/components/EditProfile";
import ProfileImg from "@/components/ProfileImg";

const EditAccount = async () => {
	const supabase = createClient();

	const {
		data: { user },
	} = await (await supabase).auth.getUser();

	const { data: author_data } = await (await supabase)
		.from("Author")
		.select()
		.eq("auth_id", user?.id)
		.single();

	const avatar_fallback = `${author_data.first_name[0]}${author_data.last_name[0]}`;

	return (
		<section className='container mx-auto'>
			<div className='flex flex-col md:flex-row w-full my-8 gap-4'>
				<div className='flex-[1_1_100%] md:flex-[3_3_0%] login-card flex flex-col items-center gap-4'>
					<ProfileImg
						author_id={author_data.id}
						img_url={author_data.avatar_url}
						avatar_fallback={avatar_fallback}
						user_id={user?.id}
					/>
				</div>

				<div className='flex-[1_1_100%] md:flex-[7_7_0%] login-card py-6! px-8'>
					<h1 className={`text-4xl font-bold mb-8 ${roboto_mono.className}`}>
						Edit Profile
					</h1>
					<EditProfile user={author_data} />
				</div>
			</div>
		</section>
	);
};

export default EditAccount;
