import RegisterForm from "@/components/RegisterForm";
import { jetbrainsMono } from "@/lib/font";
import Link from "next/link";

const Register = async () => {
	return (
		<section className='flex flex-col my-16 h-full w-full items-center justify-center px-4'>
			<div className='login-card w-125'>
				<h2 className='text-4xl font-bold'>Register</h2>

				<RegisterForm />

				<p className={`text-center text-sm ${jetbrainsMono.className}`}>
					Already have an account? Login{" "}
					<Link href='/login' className='font-bold'>
						Here
					</Link>
				</p>
			</div>
		</section>
	);
};

export default Register;
