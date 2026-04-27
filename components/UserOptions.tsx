"use client";

import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

import { Button } from "./ui/button";

import { jetbrainsMono, lato, workSans } from "@/lib/font";
import { FaEdit } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { handleLogout } from "@/app/login/actions";
import { toast } from "sonner";

const UserOptions = ({ author }: { author: any | null }) => {
	const onLogOut = async () => {
		await handleLogout();

		toast("Successful Logout", {
			description: "Hoping to see you soon!!",
		});
	};
	const avatar_fallback = `${author.first_name[0]}${author.last_name[0]}`;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='h-12 w-12'>
					{author.avatar_url === null ? (
						<AvatarFallback className='bg-primary text-white text-lg'>
							{avatar_fallback}
						</AvatarFallback>
					) : (
						<AvatarImage
							src={`https://tdhghaslnufgtzjybhhf.supabase.co/storage/v1/object/public/${author.avatar_url}`}
							alt={avatar_fallback}
							className='object-cover'
						/>
					)}
					<span className='sr-only'>Toggle user menu</span>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuItem>
					<div className='flex flex-col justify-start gap-2'>
						<p
							className={`font-bold text-[22px] text-black ${jetbrainsMono.className}`}>
							{author.first_name} {author.last_name}
						</p>
						<p
							className={`font-bold text-[14px] text-black-300! ${jetbrainsMono.className}`}>
							@{author.username}
						</p>
					</div>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link
						href={`/author/@${author.username}`}
						className={`block w-full text-left text-[15px] font-bold ${lato.className}`}
						prefetch={false}>
						<RxAvatar />
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />

				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link
						href='/edit/account/'
						className={`block w-full text-left text-[15px] font-bold ${lato.className}`}>
						<FaEdit />
						Edit Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Button
						onClick={onLogOut}
						className={`bg-primary hover:bg-primary text-white block w-full text-center ${workSans.className}`}>
						Logout
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserOptions;
