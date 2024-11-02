// app/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginFormData = {
    email: string;
    password: string;
};

export async function loginAction(data: LoginFormData) {
    try {
        // Demo credentials check - in real app, this would be a database check
        if (data.email === "admin@admin.com" && data.password === "admin123") {
            // Set cookies
            const cookieStore = cookies();
            cookieStore.set("isAuthenticated", "true", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 1 day
            });

            cookieStore.set(
                "user",
                JSON.stringify({
                    email: data.email,
                    role: "admin",
                }),
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24, // 1 day
                }
            );

            return { success: true };
        }

        return { success: false, error: "Invalid credentials" };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: "An error occurred during login" };
    }
}

export async function logoutAction() {
    const cookieStore = cookies();
    cookieStore.delete("isAuthenticated");
    cookieStore.delete("user");
    redirect("/login");
}