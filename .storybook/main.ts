import path from 'path';
import { fileURLToPath } from 'url';
import type { RsbuildConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import type { StorybookConfig } from 'storybook-react-rsbuild';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: 'storybook-react-rsbuild',
    options: {},
  },
  // Mirror the alias from rspack.config.ts — ~ resolves to src/
  rsbuildFinal: (rsbuildConfig: RsbuildConfig): RsbuildConfig => {
    rsbuildConfig.source = rsbuildConfig.source ?? {};
    rsbuildConfig.source.alias = {
      ...rsbuildConfig.source.alias,
      '~': path.resolve(__dirname, '../src'),
    };
    // Ensure the automatic JSX runtime (react-jsx) is active —
    // storybook-react-rsbuild does not always wire this up automatically.
    rsbuildConfig.plugins = [...(rsbuildConfig.plugins ?? []), pluginReact()];
    return rsbuildConfig;
  },
};

export default config;
