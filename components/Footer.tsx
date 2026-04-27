import { assets } from "@/assets/assets";
import { socials } from "@/lib/data";
import { roboto_mono, space_mono } from "@/lib/font";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className='flex justify-around flex-col xl:flex-row gap-6 xl:gap-0 bg-black py-5 items-center'>
			<Image src={assets.logo_light} alt='' width={120} />
			<p className={`text-sm text-white ${roboto_mono.className}`}>
				All Right Reserved Copyright{" "}
				<Link href='https://ikidevs.vercel.app' className='hover:font-bold'>
					@ikidevs
				</Link>
			</p>
			<div className='flex gap-4'>
				{socials.map((item, index) => (
					<Link
						target='_blank'
						key={index}
						href={item.path}
						className='w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-black hover:transition-all duration-500'>
						<item.icon />
					</Link>
				))}
			</div>
		</footer>
	);
};

export default Footer;
