// import LoginForm from "@/components/LoginForm";
import { jetbrainsMono } from "@/lib/font";
import Link from "next/link";

const Login = async () => {
	return (
		<section className='flex flex-col h-[calc(90vh-30px)] w-full items-center justify-center px-4'>
			<div className='login-card w-125'>
				<h2 className='text-4xl font-bold'>Login</h2>
			</div>
		</section>
	);
};

export default Login;
