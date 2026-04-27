import Image from "next/image";
import Link from "next/link";

import { assets } from "@/assets/assets";
import { Button } from "./ui/button";
import { roboto_mono } from "@/lib/font";
import { FaPencilAlt } from "react-icons/fa";

import type { User } from "@supabase/supabase-js";

import UserOptions from "./UserOptions";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = ({
	user,
	author,
}: {
	user: User | null;
	author: any | null;
}) => {
	return (
		<header className='header'>
			<div className='flex justify-between items-center'>
				<Link href='/'>
					<Image
						src={assets.logo}
						width={100}
						alt='main-logo'
						className='w-32.5 sm:w-auto'
						priority
					/>
				</Link>

				<div className='flex flex-row items-center'>
					{user ? (
						<>
							<Button
								className={`header-btn mr-4 ${roboto_mono.className}`}
								variant='outline'
								asChild>
								<Link href='/create/posts/'>
									<FaPencilAlt />
									Create Post
								</Link>
							</Button>
							<UserOptions author={author} />
						</>
					) : (
						<Button
							className={`header-btn ${roboto_mono.className}`}
							variant='outline'
							asChild>
							<Link href='/login'>
								Get Started <Image src={assets.arrow} alt='' />
							</Link>
						</Button>
					)}

					{/* <ThemeSwitcher /> */}
				</div>
			</div>
		</header>
	);
};

export default Header;
