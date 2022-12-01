var webpack = require("webpack");
const path = require("path");

module.exports = {
	mode: "production",
	entry: "./src/index.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
			},
		],
	},
	devtool: "source-map",
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "web/motorjs.min.js",
		path: path.resolve(__dirname, "dist"),
	},
};
