import Layout from "@/components/v2/Layout";
import Link from "next/link";

export default function Custom404() {
	return (
		<Layout>
			<section className="flex flex-col flex-grow h-full justify-center items-center bg-white">
				<div className="flex flex-col md:flex-row items-center gap-8">
					<h1 className="font-ubuntu font-bold text-black text-6xl lg:text-8xl">
						404
					</h1>
					<div className="flex flex-col items-center md:items-start sm:pl-10">
						<p className="font-ubuntu font-bold text-black text-3xl lg:text-4xl">
							Page Not Found
						</p>
						<p className="text-black pt-2 lg:pt-4 font-open-sans text-lg lg:text-xl">
							We couldn&apos;t find the page you are looking for.
						</p>
					</div>
				</div>
				<Link href="/" className="mt-10">
					<button className="btn-black px-8 py-3 text-lg">BACK TO HOME</button>
				</Link>
			</section>
		</Layout>
	);
}
