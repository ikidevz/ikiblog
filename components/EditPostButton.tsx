import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

import { RiEdit2Fill } from "react-icons/ri";
import { EditPostButtonProps } from "@/lib/type";

const EditPostButton: React.FC<EditPostButtonProps> = ({
	blog_id,
}: {
	blog_id: string;
}) => {
	return (
		<div className='fixed bottom-8 right-8'>
			<Link href={`/edit/posts/${blog_id}`}>
				<Button className='w-16 h-16 text-white bg-cyan-500 hover:bg-cyan-600 rounded-full shadow-lg'>
					<RiEdit2Fill className='w-8! h-8!' />
				</Button>
			</Link>
		</div>
	);
};

export default EditPostButton;
