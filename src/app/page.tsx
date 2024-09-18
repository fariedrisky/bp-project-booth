// app/page.tsx

import Image from "next/image";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<Layout>
			<section className="container mx-auto p-8">
				<h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
					Selamat Datang di Nama Usaha Anda
				</h1>
				<p className="text-lg text-gray-700 text-center mb-8">
					Kami menyediakan layanan terbaik untuk kebutuhan bisnis
					Anda. Dengan pengalaman bertahun-tahun di industri ini, kami
					berkomitmen untuk memberikan solusi yang dapat diandalkan
					dan berkualitas.
				</p>
				<div className="flex justify-center">
					<Image
						src="/images/company-profile.jpg"
						alt="Profil Usaha"
						width={600}
						height={400}
						className="rounded-lg shadow-lg"
					/>
				</div>
				<Button>Hello</Button>
			</section>
		</Layout>
	);
}
