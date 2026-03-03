import type { StorybookConfig } from "storybook-react-rsbuild";
import type { RsbuildConfig } from "@rsbuild/core";
import path from "path";

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
    return rsbuildConfig;
  },
};

export default config;
