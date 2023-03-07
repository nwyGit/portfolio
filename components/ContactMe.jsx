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

const Contact = () => {
	return (
		<section id='Contact' className={`${styles.section}  ${styles.paddings}`}>
			<motion.div
				variants={fadeIn('up', 'tween', 0.6, 1)}
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.2 }}
				className='sm:space-y-2'
			>
				<span className={`${styles.flexCenter} text-secondary-contrast-text text-xl`}>
					What&apos;s Next?
				</span>
				<form
					action='https://formsubmit.co/66a07d84c10938629ee19b58c7904c69'
					method='POST'
					className={`${styles.flexCenter} flex-col space-y-4`}
				>
					<span className={`md:text-5xl text-4xl font-semibold pt-2`}>
						Get In Touch
					</span>
					<p className={`text-secondary ${styles.textBox} text-center py-6`}>
						Thank you for visiting my website! I would love to connect with you
						and discuss any potential opportunities. Feel free to reach out with
						any questions or just to say hello. I&apos;m always happy to respond to
						emails promptly.
					</p>
					<div className={`${styles.formInputPos}`}>
						<span className={`${styles.formIcon}`}>
							<HiOutlineUser className='h-5 w-5 text-gray-500' />
						</span>
						<input
							type='text'
							id='name'
							name='Name'
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
							name='Email'
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
							name='Phone'
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
							name='Message'
							rows='5'
							placeholder='Your message...'
							className={`${styles.formInput}`}
						></textarea>
					</div>
					<input
						type='hidden'
						name='_subject'
						value='New inquiry from your website!'
					></input>
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
