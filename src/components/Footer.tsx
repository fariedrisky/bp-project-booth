export default function Footer() {
	return (
		<footer className="bg-white border-t border-gray-200 p-4 text-center text-xs font-medium md:text-sm lg:text-base">
			<p className="text-black">
				&copy; {new Date().getFullYear()} BP Project Booth. All rights
				reserved.
			</p>
		</footer>
	);
}
