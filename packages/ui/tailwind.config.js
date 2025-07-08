module.exports = {
  content: [
    // Your project files
    "./src/**/*.{js,ts,jsx,tsx}",
    // Include our package
    "./node_modules/@repo/ui/dist/**/*.{js,jsx}",
    './.storybook/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [],
}
