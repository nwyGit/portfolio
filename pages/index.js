import Head from 'next/head';
import styles from '../styles';
import Introduction from '@/components/Introduction';
import Layout from '@/components/Layout';
import Projects from '@/components/Projects';

export default function Home() {
	return (
		<>
			<Head>
				<title>Raymond Ng</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={`${styles.bg} ${styles.xPaddings}`}>
				<Layout>
					<Introduction />
					<Projects />
				</Layout>
			</main>
		</>
	);
}
