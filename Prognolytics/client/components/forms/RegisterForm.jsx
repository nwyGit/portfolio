import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	IconButton,
	Typography,
	useTheme,
} from '@mui/material';
import { Facebook, GitHub, Google, Twitter } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import { tokens } from '@/styles/theme';
import styles from '@/styles';
import FormInputPassword from '../form-components/FormInputPassword';
import FormInputText from '../form-components/FormInputText';
import { useRouter } from 'next/router';
import BackgroundImage from '../image-components/BackgroundImage';
import AlertMessage from '../image-components/AlertMessage';
import { signIn, useSession } from 'next-auth/react';

const RegisterForm = () => {
	const { data: session } = useSession();
	console.log(session);

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const reactHookFormMethods = useForm();
	const { handleSubmit } = reactHookFormMethods;

	const [resMsg, setResMsg] = useState('');
	const [warning, setWarning] = useState('');
	const router = useRouter();

	useEffect(()=>{if(session){}},[])

	const onSubmit = async (data) => {
		try {
			const registerResponse = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/users/register`,
				data
			);

			if (registerResponse.status === 200) {
				const { email, password } = data;

				const loginResponse = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/users/login`,
					{ email, password }
				);

				if (loginResponse.status === 200) {
					router.push('/dashboard');
				}
			}

			return registerResponse.data;
		} catch (err) {
			setWarning(err.response.data.message);
		}
	};

	return (
		<>
			<Box sx={{ zIndex: 5 }} className={`${styles.elementCenter}`}>
				<Card className={`${styles.logRegForm} z-5 rounded-xl`}>
					<CardContent
						sx={{
							'& label.Mui-focused': {
								color: `${colors.greenAccent[400]}`,
							},
							'& .MuiOutlinedInput-root': {
								borderRadius: '8px',
								'&:hover fieldset': {
									borderColor: `${colors.primary[400]}`,
								},
								'&.Mui-focused fieldset': {
									borderColor: `${colors.greenAccent[400]}`,
								},
							},
						}}
						className={`${styles.logRegForm}  overflow-hidden hover:overflow-auto overscroll-contain`}
					>
						<Box sx={{ mb: 2 }}>
							<Typography
								variant='h3'
								sx={{ fontWeight: 600, marginBottom: 1.5 }}
							>
								Start your change today 💪
							</Typography>
							<Typography sx={{ color: colors.primary[600] }}>
								Managing your wealth has never been easier!
							</Typography>
						</Box>
						<FormProvider {...reactHookFormMethods}>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className='space-y-4 min-w-[24rem] min-h-[30rem]'
							>
								<Box
									sx={{
										display: 'grid',
										gridTemplateColumns: '1fr 1fr',
										gap: 2,
									}}
								>
									<FormInputText name='firstName' label='First Name' />
									<FormInputText name='lastName' label='Last Name' />
								</Box>
								<FormInputText name='username' label='Username' />
								<FormInputText name='email' label='Email Address' />
								<FormInputPassword name='password' label='Password' />
								<FormInputPassword name='password2' label='Confirm Password' />
								<Button
									size='large'
									fullWidth
									variant='contained'
									onClick={handleSubmit(onSubmit)}
									style={{ backgroundColor: colors.primary[700] }}
									sx={{
										color: colors.primary[100],
									}}
								>
									Sign Up
								</Button>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										flexWrap: 'wrap',
										justifyContent: 'center',
									}}
								>
									<Typography
										variant='p'
										sx={{ marginRight: 2, color: colors.primary[600] }}
									>
										Already have an account?
									</Typography>
									<Typography
										variant='p'
										sx={{ color: colors.greenAccent[400] }}
									>
										<Link passHref href='/login'>
											Sign in instead
										</Link>
									</Typography>
								</Box>
								<Divider sx={{ my: 5 }}>or</Divider>
								<Box>
									<Typography>
										Feel free to look around using demo account
									</Typography>
									<Typography>Email Address: demo@demo.com</Typography>
									<Typography>Password: demo</Typography>
								</Box>
								{/* <Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Link href='/' passHref legacyBehavior>
										<IconButton
											component='a'
											onClick={(e) => e.preventDefault()}
										>
											<Facebook sx={{ color: '#497ce2' }} />
										</IconButton>
									</Link>
									<Link href='/' passHref legacyBehavior>
										<IconButton
											component='a'
											onClick={(e) => e.preventDefault()}
										>
											<Twitter sx={{ color: '#1da1f2' }} />
										</IconButton>
									</Link>
									<IconButton
										component='a'
										onClick={async () =>
											signIn('github', { callbackUrl: '/register' })
										}
									>
										<GitHub
											sx={{
												color: (theme) =>
													theme.palette.mode === 'light'
														? '#272727'
														: theme.palette.grey[300],
											}}
										/>
									</IconButton>
									<Link href='/' passHref legacyBehavior>
										<IconButton
											component='a'
											onClick={(e) => e.preventDefault()}
										>
											<Google sx={{ color: '#db4437' }} />
										</IconButton>
									</Link>
								</Box> */}
							</form>
						</FormProvider>
					</CardContent>
				</Card>
			</Box>
			<BackgroundImage
				ImageUrl='/formBackground.png'
				alt='register background'
			/>
			{warning && <AlertMessage resMsg={warning} type='error' />}
		</>
	);
};

export default RegisterForm;
