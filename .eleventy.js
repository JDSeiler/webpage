const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const katexRendering = require("@iktakahiro/markdown-it-katex");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
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
