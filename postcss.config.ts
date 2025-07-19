interface PostCSSConfig {
  plugins: {
    [key: string]: object;
  };
}

const config: PostCSSConfig = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;