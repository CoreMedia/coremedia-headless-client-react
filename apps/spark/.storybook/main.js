export default {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook"
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {}
  },

  core: {
    disableTelemetry: true
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};
