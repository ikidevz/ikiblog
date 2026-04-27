import { z } from "zod";

export const formSchema = z.object({
	title: z.string().min(3).max(100),
	description: z.string().min(20).max(1000),
	category: z.string(),
	secondary_category: z.string().nullable(),
	imgLink: z
		.string()
		.url()
		.refine(async (url) => {
			try {
				const res = await fetch(url, { method: "HEAD" });
				const contentType = res.headers.get("content-type");

				return contentType?.startsWith("image/");
			} catch {
				return false;
			}
		}),
	content: z.string().min(10),
});

export const loginFormSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required." })
		.email({ message: "Please enter a valid email address." }),
	password: z
		.string()
		.min(7, { message: "Password must be at least 7 characters long." }),
});

export const registerFormSchema = z
	.object({
		username: z
			.string()
			.min(3, { message: "Username must be at least 3 characters long." })
			.max(20, { message: "Username cannot exceed 20 characters." }),

		email: z
			.string()
			.min(1, { message: "Email is required." })
			.email({ message: "Please enter a valid email address." }),

		first_name: z
			.string()
			.min(1, { message: "First name is required." })
			.max(50, { message: "First name cannot exceed 50 characters." }),

		last_name: z
			.string()
			.min(1, { message: "Last name is required." })
			.max(50, { message: "Last name cannot exceed 50 characters." }),

		password: z
			.string()
			.min(7, { message: "Password must be at least 7 characters long." }),
		confirm_password: z.string().min(7, {
			message: "Confirm password must be at least 7 characters long.",
		}),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords don't match",
		path: ["password"],
	});

export const editUserInfoSchema = z.object({
	first_name: z
		.string()
		.min(1, { message: "First name is required." })
		.max(50, { message: "First name cannot exceed 50 characters." }),

	last_name: z
		.string()
		.min(1, { message: "Last name is required." })
		.max(50, { message: "Last name cannot exceed 50 characters." }),

	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters long." })
		.max(30, { message: "Username cannot exceed 30 characters." }),

	email: z
		.string()
		.min(1, { message: "Email is required." })
		.email({ message: "Please enter a valid email address." }),
	bio: z.string().min(10).max(300),
});

export const editPasswordInfoSchema = z
	.object({
		current_password: z.string().min(7, {
			message: "Current password must be at least 7 characters long.",
		}),
		new_password: z
			.string()
			.min(7, { message: "New password must be at least 7 characters long." }),
		confirm_new_password: z.string().min(7, {
			message: "Confirm new password must be at least 7 characters long.",
		}),
	})
	.refine((data) => data.new_password === data.confirm_new_password, {
		message: "New passwords don't match.",
		path: ["confirm_new_password"],
	});

export const loanApprovalPredictionSchema = z.object({
	person_age: z.number().min(18).max(70),
	person_gender: z.enum(["male", "female"]),
	person_education: z.enum(["Bachelor", "Master", "PhD", "High School"]),
	person_income: z.number().min(0),
	person_emp_exp: z.number().min(0).max(50),
	person_home_ownership: z.enum(["OWN", "RENT", "MORTGAGE", "OTHER"]),
	loan_amnt: z.number().min(1000),
	loan_intent: z.enum([
		"DEBTCONSOLIDATION",
		"HOMEIMPROVEMENT",
		"EDUCATION",
		"MEDICAL",
		"VENTURE",
		"PERSONAL",
	]),
	loan_int_rate: z.number().min(0).max(100),
	loan_percent_income: z.number().min(0).max(100),
	cb_person_cred_hist_length: z.number().min(0).max(30),
	credit_score: z.number().min(350).max(850),
	previous_loan_defaults_on_file: z.enum(["Yes", "No"]),
});

export const spellingAndGrammarSchema = z.object({
	text: z.string(),
});

export const dataVisualizerSchema = z.object({
	xAxis: z.string(),
	yAxis: z.string(),
	plotType: z.string(),
});

export const quizTypeSchema = z.object({
	category: z.string(),
	question_num: z.string(),
});

export const quizExamUserAnswer = z.object({});
