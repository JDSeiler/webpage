const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const katexRendering = require("@iktakahiro/markdown-it-katex");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: {
      name: "post",
      limit: 10,
    },
    metadata: {
      language: "en",
      title: "Seiler's Corner",
      subtitle: "Weblog of Jordan Seiler",
      base: "https://jordanseiler.xyz/blog/",
      author: {
        name: "Jordan Seiler",
      },
    },
  });
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(katexRendering));
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("CNAME");
  return {
    // input and output directories
    dir: {
      input: "src",
    },
  };
};
