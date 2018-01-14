// http://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parser: "babel-eslint",
	parserOptions: {
		sourceType: "module"
	},
	env: {
		browser: true
	},
	// required to lint *.vue files
	plugins: ["html"],
	rules: {
		"no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
		"arrow-parens": 0,
		"generator-star-spacing": 0,
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		"linebreak-style": ["warn", "unix"],
		"no-undef": "off",
		semi: "off"
	}
};
