import React from 'react';
import {
	HiOutlineChatAlt,
	HiOutlineMail,
	HiOutlinePhone,
	HiOutlineUser,
} from 'react-icons/hi';
import { motion } from 'framer-motion';
import { fadeIn, buttonVariants } from '@/utils/motion';
import styles from '@/styles';

const sendEmail = () => {};

const Contact = () => {
	return (
		<section id='Contact' className={`${styles.section}  ${styles.paddings}`}>
			<motion.div
				variants={fadeIn('up', 'tween', 0.6, 0.6)}
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.2 }}
				className='sm:space-y-2'
			>
				<span className={`${styles.flexCenter} text-xl`}>
					What&apos;s Next?
				</span>
				<form
					onSubmit={sendEmail}
					className={`${styles.flexCenter} flex-col space-y-4`}
				>
					<span className={`text-5xl font-semibold pt-2`}>Get In Touch</span>
					<p className={`text-secondary ${styles.textBox} text-center py-6`}>
						I appreciate you taking the time to check out my website. The
						prospect of speaking with you and learning about any potential new
						prospects excites me. Send me a note if you want to say hi or if you
						have any queries. I&apos;m always available to respond to emails,
						and I&apos;ll try my best to do so quickly.
					</p>
					<div className={`${styles.formInputPos}`}>
						<span className={`${styles.formIcon}`}>
							<HiOutlineUser className='h-5 w-5 text-gray-500' />
						</span>
						<input
							type='text'
							id='name'
							placeholder='Full Name'
							required
							className={`${styles.formInput}`}
						></input>
					</div>
					<div className={`${styles.formInputPos}`}>
						<span className={`${styles.formIcon}`}>
							<HiOutlineMail className='h-5 w-5 text-gray-500' />
						</span>
						<input
							type='email'
							id='email'
							placeholder='Eg. example@email.com'
							required
							className={`${styles.formInput}`}
						></input>
					</div>
					<div className={`${styles.formInputPos}`}>
						<span className={`${styles.formIcon}`}>
							<HiOutlinePhone className='h-5 w-5 text-gray-500' />
						</span>
						<input
							type='phone'
							id='phone'
							placeholder='Eg. +1 123 456 7890'
							required
							className={`${styles.formInput}`}
						></input>
					</div>
					<div className={`${styles.formInputPos}`}>
						<span className={`${styles.formIcon}`}>
							<HiOutlineChatAlt className='h-5 w-5 text-gray-500' />
						</span>
						<textarea
							id='message'
							name='message'
							rows='5'
							placeholder='Your message...'
							className={`${styles.formInput}`}
						></textarea>
					</div>
					<motion.button
						variants={buttonVariants}
						whileHover='hover'
						whileTap='pressed'
						type='submit'
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
