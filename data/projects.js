import styles from "@/styles";

export const SDprojects = [
	{
		title: "HomieComb",
		body: (
			<>
				A travel-focused project offering a seamless online marketplace and
				hospitality service that allows people to lease or rent short-term
				lodging. The frontend, designed with{" "}
				<span className={`${styles.highlightText}`}>
					Next.js, Tailwind CSS, and Redux
				</span>
				, ensures an intuitive and responsive interface for travelers. Data
				security is prioritized through a Spring Boot backend integrating{" "}
				<span className={`${styles.highlightText}`}>
					Spring Security, OAuth 2.0, and JWT
				</span>
				, seamlessly connecting to{" "}
				<span className={`${styles.highlightText}`}>PostgreSQL</span> via JPA
				for efficient data management. To enhance scalability and reliability,{" "}
				<span className={`${styles.highlightText}`}>AWS cloud services</span>,
				including EC2, S3, RDS, and Elastic Beanstalk, have been employed. This
				side project provides a personalized and secure space for exploring and
				navigating travel information effortlessly.
			</>
		),
		framework: [
			"NextJS",
			"Tailwind",
			"Redux",
			"Spring",
			"SpringBoot",
			"PostgreSQL",
			"AWS",
		],
		githubURL: "https://github.com/nwyGit/portfolio/tree/main/homie-comb",
		websiteURL: "https://homiecomb.vercel.app/",
		imageURL: { mobile: "/HomieComb.png", desktop: "/HomieComb.png" },
	},
	{
		title: "Booga.com.hk",
		body: (
			<>
				A Web service is provided to users, enabling them to effortlessly
				discover the most{" "}
				<span className={`${styles.highlightText}`}>
					suitable broadband and data plans
				</span>
				. The website also offers up-to-date information on data plans, allowing
				users to promptly address minor concerns. It utilizes server-side
				rendering and image optimization techniques to enhance performance and
				user satisfaction. For flexibility and scalability,{" "}
				<span className={`${styles.highlightText}`}>Strapi</span>, a headless
				CMS and backend server, along with{" "}
				<span className={`${styles.highlightText}`}>PostgreSQL</span> as the
				database, were employed. The implementation of SEO best practices
				enhances the website&apos;s discoverability and increases organic search
				traffic.
			</>
		),
		framework: ["NextJS", "Tailwind", "Strapi", "PostgreSQL"],
		githubURL: "",
		websiteURL: "https://booga.com.hk/",
		imageURL: { mobile: "/Boogabot_m.png", desktop: "/Boogabot.png" },
	},
	{
		title: "Prognolytics",
		body: (
			<>
				A web application that provides personalized{" "}
				<span className={`${styles.highlightText}`}>
					financial health analysis
				</span>{" "}
				to users in order to help them establish a better financial future. The
				app allows users to visualize their financial situation by scanning
				receipts and uploading them with a single click. It processes user data
				and provides actionable financial improvement advice by leveraging
				technologies such as Google&apos;s{" "}
				<span className={`${styles.highlightText}`}>Vision API</span> for
				Optical Character Recognition (OCR) and{" "}
				<span className={`${styles.highlightText}`}>OpenAI</span>&apos;s NLP
				model.
			</>
		),
		framework: [
			"NextJS",
			"Material-UI",
			"ExpressJS",
			"MongoDB",
			"Vision API",
			"OpenAI API",
		],
		githubURL: "https://github.com/nwyGit/portfolio/tree/main/Prognolytics",
		websiteURL: "https://prognolytics.vercel.app",
		imageURL: { mobile: "/Prognolytics.png", desktop: "/Prognolytics.png" },
	},
	{
		title: "Metropolitan Museum of Artwork Collection",
		body: (
			<>
				An immersive web application that seamlessly integrates with the
				Metropolitan Museum of Art Collection API, offering users a refined
				experience in searching and viewing curated art collections. This modern
				platform, built with{" "}
				<span className={`${styles.highlightText}`}>React (NextJS)</span> and
				styled with the sleek aesthetics of{" "}
				<span className={`${styles.highlightText}`}>Bootstrap</span>, ensures a
				user-friendly and responsive interface.
			</>
		),
		framework: ["NextJS", "Bootstrap", "ExpressJS", "MongoDB"],
		githubURL:
			"https://github.com/nwyGit/Metropolitan-Museum-of-Artwork-Collection-client",
		websiteURL: "https://metropolitan-museum-of-artwork-collection.vercel.app/",
		imageURL: { mobile: "/MMAC.png", desktop: "/MMAC.png" },
	},
];
