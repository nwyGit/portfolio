import Head from 'next/head';
import Layout from '@/components/Layout';
import Introduction from '@/components/Introduction';
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
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<main className={`${styles.xPaddings} bg-background-color`}>
					<Introduction />
					<AboutMe />
					<Projects />
					<Contact />
				</main>
			</Layout>
		</>
	);
}
