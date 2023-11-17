import styles from "@/styles";
import Link from "next/link";

export default function Custom404() {
	return (
		<section
			className={`${styles.paddings} ${styles.flexCenter} flex-col bg-background-color h-screen 2xl:px-72`}
		>
			<div className={`${styles.flexCenter} md:flex-row flex-col min-h-[40%]`}>
				<h1 className={`${styles.FourOhFourHeading}`}>404</h1>
				<div className={`${styles.flexCenter} flex-col sm:pl-10`}>
					<p className={`${styles.FourOhFourHeading2}`}>Page Not Found</p>
					<p className="lg:pt-2 pt-1">
						We couldn&apos;t find the page you are looking for.
					</p>
				</div>
			</div>
			<button className={`${styles.button} px-6 py-2`}>
				<Link href="/" className="relative z-5">
					BACK TO HOME
				</Link>
			</button>
		</section>
	);
}
