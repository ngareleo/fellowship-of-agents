import type { StorybookConfig } from "storybook-react-rsbuild";
import type { RsbuildConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  framework: {
    name: "storybook-react-rsbuild",
    options: {},
  },
  // Mirror the alias from rspack.config.ts — ~ resolves to src/
  rsbuildFinal: (rsbuildConfig: RsbuildConfig): RsbuildConfig => {
    rsbuildConfig.source = rsbuildConfig.source ?? {};
    rsbuildConfig.source.alias = {
      ...rsbuildConfig.source.alias,
      "~": path.resolve(__dirname, "../src"),
    };
    // Ensure the automatic JSX runtime (react-jsx) is active —
    // storybook-react-rsbuild does not always wire this up automatically.
    rsbuildConfig.plugins = [
      ...(rsbuildConfig.plugins ?? []),
      pluginReact(),
    ];
    return rsbuildConfig;
  },
};

export default config;
