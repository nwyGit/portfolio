import { tokens } from '@/styles/theme';
import { Box, useTheme } from '@mui/material';

const ProgressCircle = ({ progress = '0.75', size = '40' }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const angle = progress * 360;
	return (
		<Box
			sx={{
				background: `radial-gradient(${colors.primary[200]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.orangeAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[400]}`,
				borderRadius: '50%',
				width: `${size}px`,
				height: `${size}px`,
			}}
		/>
	);
};

export default ProgressCircle;
