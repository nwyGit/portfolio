import React from "react";
import InsightsCard from "./InsightsCard";
import DynamicButton from "../../shared/component/DynamicButton";
import { RxArrowTopRight } from "react-icons/rx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const insightsData = [
	{
		title: "How I Built My Portfolio",
		date: "2024-01-01",
		tags: ["Web Development", "Portfolio"],
		image: "/assets/placeholder-image.jpg",
		link: "#",
	},
	{
		title: "Top 5 Frontend Trends 2024",
		date: "2024-02-15",
		tags: ["Frontend", "Trends", "2024"],
		image: "/assets/placeholder-image.jpg",
		link: "#",
	},
	{
		title: "Design Systems for Developers",
		date: "2024-03-10",
		tags: ["Design Systems", "Collaboration", "Best Practices"],
		image: "/assets/placeholder-image.jpg",
		link: "#",
	},
	// Add more posts as needed for infinite loop demo
	{
		title: "Building Accessible UI",
		date: "2024-04-01",
		tags: ["Accessibility", "UI"],
		image: "/assets/placeholder-image.jpg",
		link: "#",
	},
	{
		title: "Performance Optimization Tips",
		date: "2024-05-10",
		tags: ["Performance", "Optimization"],
		image: "/assets/placeholder-image.jpg",
		link: "#",
	},
];

const Insights: React.FC = () => {
	return (
		<section className="bg-[#F3F3F3] py-[60px] px-[20px] lg:px-[100px] flex flex-col items-center">
			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 15,
				}}
			>
				<h2
					style={{
						fontFamily: "Ubuntu, sans-serif",
						fontWeight: 700,
						fontSize: 50,
						lineHeight: 1.15,
						textTransform: "uppercase",
						color: "#000",
						textAlign: "center",
						margin: 0,
					}}
				>
					Insights & Trends
				</h2>
			</div>
			<div className="w-full max-w-[1280px] mt-[40px]">
				<Swiper
					spaceBetween={30}
					loop={true}
					autoplay={{ delay: 3500, disableOnInteraction: false }}
					modules={[Autoplay]}
					centeredSlides={true}
					breakpoints={{
						0: { slidesPerView: 1, centeredSlides: true },
						768: { slidesPerView: 2, centeredSlides: false },
						1024: { slidesPerView: 3, centeredSlides: false },
					}}
					className="items-center"
				>
					{insightsData.map((card, idx) => (
						<SwiperSlide
							key={idx}
							className="flex justify-center items-stretch"
						>
							<InsightsCard {...card} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			{/* Button */}
			<div
				className="blog-card-view-more-btn-wrapper"
				style={{ width: "fit-content" }}
				onMouseOver={(e) => {
					const btn = e.currentTarget.querySelector("button, a");
					if (btn) {
						(btn as HTMLElement).style.background = "#fff";
						(btn as HTMLElement).style.color = "#000";
					}
				}}
				onMouseOut={(e) => {
					const btn = e.currentTarget.querySelector("button, a");
					if (btn) {
						(btn as HTMLElement).style.background = "#000";
						(btn as HTMLElement).style.color = "#fff";
					}
				}}
			>
				<DynamicButton
					text="view more"
					icon={<RxArrowTopRight size={24} />}
					href={`/blogs`}
					target="_blank"
					className="btn-black"
					style={{
						display: "flex",
						alignItems: "center",
						gap: 10,
						padding: "12px 25px 12px 30px",
						borderRadius: 30,
						border: "1px solid #000",
						background: "#000",
						color: "#fff",
						fontFamily: "Red Hat Display, sans-serif",
						fontWeight: 700,
						fontSize: 16,
						lineHeight: 1.32,
						textTransform: "uppercase",
						cursor: "pointer",
						transition: "background 0.2s, color 0.2s",
						marginTop: 16,
					}}
					iconPosition="right"
				/>
			</div>
		</section>
	);
};

export default Insights;
