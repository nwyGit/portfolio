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
		imageURL: { mobile: "/HomieComb_m.png", desktop: "/HomieComb.png" },
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

export const DAprojects = [
	{
		title: "Toronto House Price Analysis",
		body: (
			<>
				A project focuses on{" "}
				<span className={`${styles.highlightText}`}>
					decoding the nuanced trends within the Toronto housing market
				</span>{" "}
				through meticulous analysis of data sourced from Zillow.com. Employing
				advanced web scraping techniques, a dynamic dataset is curated to
				facilitate a profound exploration of price distributions, correlations
				with property features, and the identification of premium areas. The
				analytical backbone of the initiative relies on Python, with{" "}
				<span className={`${styles.highlightText}`}>Pandas and Matplotlib</span>{" "}
				enabling robust statistical insights and visualizations.{" "}
				<span className={`${styles.highlightText}`}>Jupyter Notebooks</span>{" "}
				enhance transparency and collaboration, while{" "}
				<span className={`${styles.highlightText}`}>Seaborn</span> refines data
				representation. This cohesive integration of cutting-edge technologies
				and strategic data analysis positions the project as a potent tool for
				stakeholders seeking comprehensive insights into the dynamic landscape
				of Toronto&apos;s housing market.
			</>
		),
		framework: [
			"Pandas",
			"Matplotlib",
			"Jupyter Notebooks",
			"Seaborn",
			"Tableau",
		],
		githubURL:
			"https://github.com/nwyGit/Python-DVD-Rental-Analysis/tree/be8c63de0dbe9a30398a7f89e7447af59cc68c40",
		websiteURL: "",
		imageURL: {
			mobile: "/Toronto House Price Analysis.png",
			desktop: "/Toronto House Price Analysis.png",
		},
	},
	{
		title: "DVD Rental Analysis",
		body: (
			<>
				This project revolves around harnessing the power of{" "}
				<span className={`${styles.highlightText}`}>Pandas</span> in Python to
				conduct a comprehensive analysis of data extracted from the DVD Rental
				database. The aim is to execute a series of data manipulations,
				transformations, and visualizations, ultimately{" "}
				<span className={`${styles.highlightText}`}>
					addressing specific inquiries tied to the dataset
				</span>
				. Through the utilization of Pandas, the project is empowered to
				efficiently navigate and derive insights from the intricacies of the DVD
				Rental data.
			</>
		),
		framework: ["Pandas", "Matplotlib", "Textblob", "Jupyter Notebooks", "SQL"],
		githubURL:
			"https://github.com/nwyGit/Python-Toronto-Housing-Analysis/tree/ae629b877817e77ccc0d212c4080c0d8fa02ce82",
		websiteURL: "",
		imageURL: {
			mobile: "/DVD Rental Analysis.png",
			desktop: "/DVD Rental Analysis.png",
		},
	},
];
