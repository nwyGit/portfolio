import React from "react";
import {
	HiOutlineChatAlt,
	HiOutlineMail,
	HiOutlinePhone,
	HiOutlineUser,
} from "react-icons/hi";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeIn, buttonVariants } from "@/utils/motion";
import styles from "@/styles";

const Contact = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { name: "", email: "", phone: "", message: "" },
	});

	function submitForm(formData) {
		fetch("https://formsubmit.co/ajax/66a07d84c10938629ee19b58c7904c69", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then(() => {
				alert("Form submitted successfully!");
			})
			.catch((error) => {
				if (process.env.NODE_ENV === 'development') {
					console.log(error);
				}
				alert("Form submission failed.");
			});
	}

	return (
		<section id="Contact" className={`${styles.section}  ${styles.paddings}`}>
			<motion.div
				variants={fadeIn("up", "tween", 0.6, 1)}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.2 }}
				className="sm:space-y-2"
			>
				<span
					className={`${styles.flexCenter} text-secondary-contrast-text text-xl`}
				>
					What&apos;s Next?
				</span>
				<form
					onSubmit={handleSubmit(submitForm)}
					className={`${styles.flexCenter} flex-col space-y-4`}
				>
					<span className={`md:text-5xl text-4xl font-semibold pt-2`}>
						Get In Touch
					</span>
					<p className={`text-secondary ${styles.contentBox} text-center py-6`}>
						Thank you for visiting my website! I would love to connect with you
						and discuss any potential opportunities. Feel free to reach out with
						any questions or just to say hello. I&apos;m always happy to respond
						to emails promptly.
					</p>
					{errors.name?.type === "required" && (
						<span className="text-primary-contrast-text">Name is required</span>
					)}
					<div className={`${styles.formInputPos}`}>
						<span className={`${styles.formIcon}`}>
							<HiOutlineUser className="h-5 w-5 text-gray-500" />
						</span>
						<input
							type="text"
							placeholder="Full Name"
							{...register("name", { required: true })}
							required
							className={`${styles.formInput} ${errors.name && "inputError"}`}
						/>
					</div>
					{errors.email?.type === "required" && (
						<span className="text-primary-contrast-text">
							Email is required
						</span>
					)}
					<div className={`${styles.formInputPos}`}>
						<span className={`${styles.formIcon}`}>
							<HiOutlineMail className="h-5 w-5 text-gray-500" />
						</span>

						<input
							type="email"
							{...register("email", { required: true })}
							placeholder="example@email.com"
							required
							className={`${styles.formInput} ${errors.email && "inputError"}}`}
						/>
					</div>
					<div className={`${styles.formInputPos}`}>
						<span className={`${styles.formIcon}`}>
							<HiOutlinePhone className="h-5 w-5 text-gray-500" />
						</span>
						<input
							type="phone"
							{...register("phone")}
							placeholder="+1-333-666-8888"
							required
							className={`${styles.formInput}`}
						></input>
					</div>
					{errors.message?.type === "required" && (
						<span className="text-primary-contrast-text">
							Please leave your message
						</span>
					)}
					<div className={`${styles.formInputPos}`}>
						<span className={`${styles.formIcon}`}>
							<HiOutlineChatAlt className="h-5 w-5 text-gray-500" />
						</span>
						<textarea
							{...register("message", { required: true })}
							rows="5"
							placeholder="Your message..."
							className={`${styles.formInput} ${
								errors.message && "inputError"
							}`}
						/>
					</div>
					<input
						type="hidden"
						name="_subject"
						value="New inquiry from your website!"
					/>
					<motion.button
						variants={buttonVariants}
						whileHover="hover"
						whileTap="pressed"
						type="submit"
						disabled={Object.keys(errors).length > 0}
						className={`${styles.button} px-6 py-2`}
					>
						Say Hello
					</motion.button>
				</form>
			</motion.div>
		</section>
	);
};

export default Contact;
