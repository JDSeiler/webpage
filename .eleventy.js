const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const katexRendering = require("@iktakahiro/markdown-it-katex");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(katexRendering));
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("CNAME");
  return {
    // input and output directories
    dir: {
      input: "src",
    }
  };
};
