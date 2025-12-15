import { defineConfig } from "vitepress";

export default defineConfig({
  title: "@xinnovations/atlas",
  description: "World countries, states, and cities data library",

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "API Reference", link: "/api-reference" },
      { text: "GitHub", link: "https://github.com/xinnovations/atlas" },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "Examples", link: "/examples" },
        ],
      },
      {
        text: "Reference",
        items: [{ text: "API Reference", link: "/api-reference" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/xinnovations/atlas" },
    ],
  },
});
