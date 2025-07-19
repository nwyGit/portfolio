// Minimal styles object for v1 components compatibility
const styles = {
	button: "border-2 text-white bg-secondary-contrast-text hover:bg-primary-contrast-text hover:text-white rounded-full",
	lgNavBar: "bg-[#002538] sm:px-12 sm:py-4 md:px-18 lg:px-32 p-6 md:block hidden drop-shadow-md fixed top-0 w-full z-20",
	smNavBar: "flex justify-end justify-between bg-[#002538] md:hidden sm:px-20 px-10 py-4 fixed top-0 w-full drop-shadow-md z-20",
	popUpNav: "bg-[#02415A] fixed right-0 min-w-[66.6%] h-full top-0",
	blurOverlay: "backdrop-blur-sm fixed top-0 left-0 w-full h-full",
	flexCenter: "flex justify-center items-center",
	flexEnd: "flex justify-end",
};

module.exports = styles;