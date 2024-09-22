// components/LoginForm.tsx

"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// Logika autentikasi di sini
		console.log("Email:", email);
		console.log("Password:", password);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label htmlFor="email" className="block text-gray-700">
					Email
				</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md"
				/>
			</div>
			<div>
				<label htmlFor="password" className="block text-gray-700">
					Password
				</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="w-full px-3 py-2 border border-gray-300 rounded-md"
				/>
			</div>
			<button
				type="submit"
				className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
			>
				Login
			</button>
			<div className="text-center text-sm text-gray-600">
				<Link
					href="/forgot-password"
					className="text-blue-500 hover:underline"
				>
					Lupa password?
				</Link>
			</div>
		</form>
	);
}
