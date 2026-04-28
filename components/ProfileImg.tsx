"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { FaUpload } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

const ProfileImg = ({
	author_id,
	img_url,
	avatar_fallback,
	user_id,
}: {
	author_id: string | undefined;
	img_url: string;
	avatar_fallback: string;
	user_id: string | undefined;
}) => {
	const [image, setImage] = useState<string | undefined | null>(
		img_url == null
			? null
			: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${img_url}`,
	);
	const supabase = createClient();

	const handleImageChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		try {
			if (!event.target.files || event.target.files.length === 0) {
				throw new Error("You must select an image to upload.");
			}

			const file = event.target.files[0];
			const fileExt = file.name.split(".").pop();
			const filePath = `${user_id}-${Math.random()}.${fileExt}`;

			const { data: avatarDataUser, error: uploadError } =
				await supabase.storage.from("avatars").upload(filePath, file);

			await supabase
				.from("Author")
				.update({
					avatar_url: avatarDataUser?.fullPath,
				})
				.eq("id", author_id);

			setImage(
				`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${avatarDataUser?.fullPath}`,
			);
		} catch (error) {
			alert("Error uploading avatar!");
		}
	};

	const resetImage = async () => {
		await supabase
			.from("Author")
			.update({
				avatar_url: null,
			})
			.eq("id", author_id);

		setImage(null);
	};

	return (
		<>
			<Avatar className='h-40 w-40 flex items-center'>
				{image === null ? (
					<AvatarFallback className='bg-primary text-white text-5xl'>
						{avatar_fallback}
					</AvatarFallback>
				) : (
					<AvatarImage
						src={image}
						alt={avatar_fallback}
						className='object-cover'
					/>
				)}
			</Avatar>

			<div className='flex flex-row gap-2'>
				<input
					type='file'
					accept='image/*'
					id='file-upload'
					className='hidden'
					onChange={handleImageChange}
				/>
				<Button
					className={`text-white hover:bg-cyan-400`}
					onClick={() => document.getElementById("file-upload")?.click()}>
					<FaUpload /> Upload Image
				</Button>
				<Button
					className={`text-white bg-red-500 hover:bg-red-400`}
					onClick={resetImage}>
					<GrPowerReset /> Reset Image
				</Button>
			</div>
		</>
	);
};

export default ProfileImg;
