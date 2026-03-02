import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import path from "path";

// Rspack handles production bundling.
// Storybook uses this same configuration — see storybooks.md.
export default defineConfig({
  entry: {
    main: "./src/main.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: { syntax: "typescript", tsx: true },
              transform: {
                react: { runtime: "automatic" },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
  ],
  mode: "production",
});
