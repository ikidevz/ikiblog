// import LoginForm from "@/components/LoginForm";
import LoginForm from "@/components/LoginForm";

const Login = async () => {
	return (
		<section className='flex flex-col h-[calc(90vh-30px)] w-full items-center justify-center px-4'>
			<div className='login-card w-125'>
				<h2 className='text-4xl font-bold'>Login</h2>

				<LoginForm />
			</div>
		</section>
	);
};

export default Login;
