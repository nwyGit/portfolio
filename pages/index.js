import Head from 'next/head';
import Introduction from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import Projects from '@/components/Projects';
import Contact from '@/components/ContactMe';
import styles from '@/styles';

export default function Home() {
	return (
		<>
			<Head>
				<title>Raymond Ng</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/logo_s.svg' />
			</Head>
			<main className={`${styles.xPaddings} bg-[#002538]`}>
				<Introduction />
				<AboutMe />
				<Projects />
				<Contact />
			</main>
		</>
	);
}
