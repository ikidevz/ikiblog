"use server";

import { LoginData } from "@/lib/type";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const handleLogin = async (loginData: LoginData) => {
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email: loginData.email,
		password: loginData.password,
	});

	if (error) return { error: true, message: error.message };

	return { error: false, message: "You have logged in successfully!" };
};

export const handleLogout = async () => {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		await supabase.auth.signOut();
	}

	redirect("/");
};
