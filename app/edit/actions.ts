"use server";
import { AuthorEditData } from "@/lib/type";
import { createClient } from "@/utils/supabase/server";

export const handleEditAuthor = async (postData: AuthorEditData) => {
	try {
		const supabase = createClient();

		const {
			data: { user },
		} = await (await supabase).auth.getUser();

		const { data: authorData } = await (await supabase)
			.from("Author")
			.select()
			.eq("auth_id", user?.id)
			.single();

		await (await supabase).auth.updateUser({ email: postData.email });

		const { error: errorAuthorData } = await (
			await supabase
		)
			.from("Author")
			.update({
				first_name: postData.first_name,
				last_name: postData.last_name,
				username: postData.username,
				email: postData.email,
				bio: postData.bio,
			})
			.eq("id", authorData.id);

		if (errorAuthorData)
			return { error: true, message: errorAuthorData.message };
		else return { error: false, message: "Successful Edit your Profile" };
	} catch (error) {
		return { error: true, message: "An unexpected error occurred." };
	}
};
