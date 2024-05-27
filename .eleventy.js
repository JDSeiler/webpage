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
    },
    // uderlying deployment is at jdseiler.github.io/webpage/
    // but 11ty expects links to be at the domain root by default
    pathPrefix: "/webpage/",
  };
};
