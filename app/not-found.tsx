import { Button } from "@/components/ui/button";
import { jetbrainsMono, lato } from "@/lib/font";
import Link from "next/link";

export default function NotFound() {
	return (
		<section className='flex items-center min-h-[calc(85vh)]'>
			<div className='w-full space-y-6 text-center'>
				<div className='flex flex-col'>
					<h1
						className={`text-[8rem] font-bold tracking-tighter ${jetbrainsMono.className}`}>
						404
					</h1>
					<p className={`text-gray-500 text-xl ${jetbrainsMono.className}`}>
						Looks like you've ventured into the unknown digital realm.
					</p>
				</div>
				<Button
					className={`bg-primary text-white font-bold text-2xl p-6 ${lato.className}`}
					asChild>
					<Link href='/' prefetch={false}>
						Return to website
					</Link>
				</Button>
			</div>
		</section>
	);
}
