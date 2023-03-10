const styles = {
	innerWidth: '2xl:max-w-[1280px] w-full',
	interWidth: 'lg:w-[80%] w-[100%]',

	paddings: 'sm:p-16 xs:p-8 px-4 py-12',
	yPaddings: 'sm:py-16 xs:py-8 py-12',
	xPaddings: 'sm:px-12 md:px-18 lg:px-32 px-6',
	topPaddings: 'sm:pt-16 xs:pt-8 pt-12',
	bottomPaddings: 'sm:pb-16 xs:pb-8 pb-12',

	flexCenter: 'flex justify-center items-center',
	flexStart: 'flex justify-start items-start',
	flexEnd: 'flex justify-end',
	navPadding: 'pt-[98px]',

	bubbleContainer: 'fixed inset-0 w-full h-screen',

	lgNavBar:
		'bg-[#023047] sm:px-12 sm:py-4 md:px-18 lg:px-32 p-6 md:block hidden drop-shadow-md fixed top-0 w-full z-20',
	smNavBar:
		'flex justify-end justify-between bg-[#023047] md:hidden sm:px-20 px-10 py-4 fixed top-0 w-full drop-shadow-md z-20',
	popUpNav: 'bg-[#02415A] fixed right-0 min-w-[66.6%] h-full top-0',
	blurOverlay: 'backdrop-blur-sm fixed top-0 left-0 w-full h-full',

	introHeading: 'font-medium md:text-6xl lg:text-8xl text-4xl',
	section: '2xl:px-72 relative z-5',
	textBox: 'md:w-[60%] lg:w-[55%] w-full',
	formIcon: 'absolute inset-y-0 flex items-center pl-4',
	formInput: 'rounded-2xl p-4 pl-14 w-full text-background-color',
	formInputPos: 'relative lg:w-1/2 w-full',
	button:
		'border-2 text-white bg-secondary-contrast-text hover:bg-primary-contrast-text hover:text-white rounded-full',
};

export default styles;
