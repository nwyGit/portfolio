import React from 'react';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { isCollapsedAtom } from '@/state';
import {
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { tokens } from '../styles/theme';
import styles from '@/styles/index';

const Item = ({ title, to, icon }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<ListItem disablePadding style={{ color: colors.grey[100] }}>
			<ListItemButton component='a' href={to}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={title} />
			</ListItemButton>
		</ListItem>
	);
};

const Sidebar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom);

	return (
		<>
			<Box
				sx={{
					'&.pro-sidebar-inner': {
						background: `${colors.primary[200]} !important`,
					},
				}}
				className={`${styles.sideBar} ${
					isCollapsed ? 'w-0' : 'w-1/4 min-w-[16rem] max-w-xs'
				}`}
			>
				{!isCollapsed && (
					<>
						{/** MENU ICON */}
						<Box className={`flex justify-end m-4`}>
							<IconButton
								onClick={() => {
									setIsCollapsed(!isCollapsed);
								}}
							>
								<MenuOutlinedIcon />
							</IconButton>
						</Box>
						{/** USER */}
						<Box mb='25px'>
							<Box className={`${styles.flexCenter}`}>
								<Image
									src='/avatar.jpg'
									alt='profile-user'
									width={100}
									height={100}
									className='cursor-pointer rounded-full'
								/>
							</Box>
							<Box textAlign='center'>
								<Typography
									variant='h3'
									color={colors.grey[100]}
									fontWeight='bold'
									className='mt-4'
								>
									User Name
								</Typography>
								<Typography variant='h5' className='text-[#00917D]'>
									Basic Plan
								</Typography>
							</Box>
						</Box>
						{/** MENU ITEMS */}
						<List>
							<Item
								title='Dashboard'
								to='/dashboard'
								icon={<DashboardIcon />}
							/>
							<Item
								title='Expense record'
								to='/records'
								icon={<ReceiptLongIcon />}
							/>
							<Divider />
							<Item title='Settings' to='/settings' icon={<SettingsIcon />} />
						</List>
					</>
				)}
			</Box>
		</>
	);
};

export default Sidebar;
