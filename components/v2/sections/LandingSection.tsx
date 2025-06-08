import React, { useEffect, useRef, useState } from "react";
import Landing from "@/components/v2/sections/Landing/Landing";
import Skills from "@/components/v2/sections/Landing/Skills";
import { Hero, Project, Skill } from "@/components/v2/shared/type/types";
import ProjectSection from "./ProjectSection";

interface LandingProps {
	hero: Hero;
	skills: Skill[];
	projects: Project[];
}

const BLOB_SIZE_1 = 600;
const BLOB_SIZE_2 = 500;
const BLOB_OPACITY = 0.45;
const BLOB_BLUR = 120;
const INTERVAL = 100; // ms
const STEP = 30; // max px per move

function getRandomStep() {
	return (Math.random() - 0.5) * STEP;
}

function clamp(val: number, min: number, max: number) {
	return Math.max(min, Math.min(max, val));
}

const randomBorderRadius = () => {
	// Generate a random organic border radius string
	const vals = Array(8)
		.fill(0)
		.map(() => Math.round(40 + Math.random() * 40));
	return `${vals[0]}% ${vals[1]}% ${vals[2]}% ${vals[3]}% / ${vals[4]}% ${vals[5]}% ${vals[6]}% ${vals[7]}%`;
};

export default function LandingSection({
	hero,
	skills,
	projects,
}: LandingProps) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [blob1, setBlob1] = useState({
		x: 0,
		y: 0,
		scale: 1,
		rotate: 0,
		borderRadius: "50%",
	});
	const [blob2, setBlob2] = useState({
		x: 0,
		y: 0,
		scale: 1,
		rotate: 0,
		borderRadius: "50%",
	});
	const velocity1 = useRef({ vx: 0, vy: 0 });
	const velocity2 = useRef({ vx: 0, vy: 0 });

	// Set initial positions, velocities, and shapes after mount
	useEffect(() => {
		if (!sectionRef.current) return;
		const rect = sectionRef.current.getBoundingClientRect();
		setBlob1({
			x: Math.random() * (rect.width - BLOB_SIZE_1),
			y: Math.random() * (rect.height - BLOB_SIZE_1),
			scale: 1 + Math.random() * 0.2,
			rotate: Math.random() * 360,
			borderRadius: randomBorderRadius(),
		});
		setBlob2({
			x: Math.random() * (rect.width - BLOB_SIZE_2),
			y: Math.random() * (rect.height - BLOB_SIZE_2),
			scale: 1 + Math.random() * 0.2,
			rotate: Math.random() * 360,
			borderRadius: randomBorderRadius(),
		});
		velocity1.current = {
			vx: (Math.random() - 0.5) * STEP,
			vy: (Math.random() - 0.5) * STEP,
		};
		velocity2.current = {
			vx: (Math.random() - 0.5) * STEP,
			vy: (Math.random() - 0.5) * STEP,
		};
	}, []);

	// Improved Brownian motion effect with morphing
	useEffect(() => {
		let raf: number;
		let running = true;
		function moveBlobs() {
			if (!sectionRef.current) return;
			const rect = sectionRef.current.getBoundingClientRect();

			function updateVelocity(vel: { vx: number; vy: number }) {
				const maxVel = STEP;
				const delta = STEP * 0.2;
				let vx = vel.vx + (Math.random() - 0.5) * delta;
				let vy = vel.vy + (Math.random() - 0.5) * delta;
				vx = clamp(vx, -maxVel, maxVel);
				vy = clamp(vy, -maxVel, maxVel);
				return { vx, vy };
			}

			velocity1.current = updateVelocity(velocity1.current);
			velocity2.current = updateVelocity(velocity2.current);

			setBlob1((prev) => {
				let x = prev.x + velocity1.current.vx;
				let y = prev.y + velocity1.current.vy;
				if (x < 0 || x > rect.width - BLOB_SIZE_1) {
					velocity1.current.vx *= -1;
					x = clamp(x, 0, rect.width - BLOB_SIZE_1);
				}
				if (y < 0 || y > rect.height - BLOB_SIZE_1) {
					velocity1.current.vy *= -1;
					y = clamp(y, 0, rect.height - BLOB_SIZE_1);
				}
				// Morph shape
				const scale = clamp(
					prev.scale + (Math.random() - 0.5) * 0.08,
					0.9,
					1.25
				);
				const rotate = (prev.rotate + (Math.random() - 0.5) * 8) % 360;
				const borderRadius =
					Math.random() < 0.2 ? randomBorderRadius() : prev.borderRadius;
				return { x, y, scale, rotate, borderRadius };
			});
			setBlob2((prev) => {
				let x = prev.x + velocity2.current.vx;
				let y = prev.y + velocity2.current.vy;
				if (x < 0 || x > rect.width - BLOB_SIZE_2) {
					velocity2.current.vx *= -1;
					x = clamp(x, 0, rect.width - BLOB_SIZE_2);
				}
				if (y < 0 || y > rect.height - BLOB_SIZE_2) {
					velocity2.current.vy *= -1;
					y = clamp(y, 0, rect.height - BLOB_SIZE_2);
				}
				const scale = clamp(
					prev.scale + (Math.random() - 0.5) * 0.08,
					0.9,
					1.25
				);
				const rotate = (prev.rotate + (Math.random() - 0.5) * 8) % 360;
				const borderRadius =
					Math.random() < 0.2 ? randomBorderRadius() : prev.borderRadius;
				return { x, y, scale, rotate, borderRadius };
			});
			if (running) {
				raf = window.setTimeout(moveBlobs, INTERVAL);
			}
		}
		moveBlobs();
		return () => {
			running = false;
			if (raf) window.clearTimeout(raf);
		};
	}, []);

	return (
		<section
			className="landing-section"
			ref={sectionRef}
			style={{ position: "relative", overflow: "hidden", background: "#fff" }}
		>
			{/* Brownian blobs with morphing */}
			<div
				style={{
					position: "absolute",
					width: BLOB_SIZE_1,
					height: BLOB_SIZE_1,
					background: "#85a0e4",
					top: blob1.y,
					left: blob1.x,
					borderRadius: blob1.borderRadius,
					filter: `blur(${BLOB_BLUR}px)`,
					opacity: BLOB_OPACITY,
					pointerEvents: "none",
					zIndex: -1,
					transition: `top ${INTERVAL}ms linear, left ${INTERVAL}ms linear, border-radius 0.5s, transform ${INTERVAL}ms linear`,
					mixBlendMode: "multiply",
					transform: `scale(${blob1.scale}) rotate(${blob1.rotate}deg)`,
				}}
			/>
			<div
				style={{
					position: "absolute",
					width: BLOB_SIZE_2,
					height: BLOB_SIZE_2,
					background: "#ffd694",
					top: blob2.y,
					left: blob2.x,
					borderRadius: blob2.borderRadius,
					filter: `blur(${BLOB_BLUR}px)`,
					opacity: BLOB_OPACITY,
					pointerEvents: "none",
					zIndex: -1,
					transition: `top ${INTERVAL}ms linear, left ${INTERVAL}ms linear, border-radius 0.5s, transform ${INTERVAL}ms linear`,
					mixBlendMode: "multiply",
					transform: `scale(${blob2.scale}) rotate(${blob2.rotate}deg)`,
				}}
			/>
			<Landing hero={hero} />
			<Skills hero={hero} skills={skills} />
			<ProjectSection projects={projects} />
		</section>
	);
}
