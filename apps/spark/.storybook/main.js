export default {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
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
