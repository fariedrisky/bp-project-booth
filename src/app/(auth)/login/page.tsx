// app/login/page.tsx

import Layout from "@/components/Layout";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
	return (
		<Layout>
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
					<h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
						Login
					</h1>
					<LoginForm />
					<p className="mt-4 text-center text-gray-600">
						Belum punya akun?{" "}
						<a
							href="/register"
							className="text-blue-500 hover:underline"
						>
							Daftar
						</a>
					</p>
				</div>
			</div>
		</Layout>
	);
}
