module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  return {
    // input and output directories
    dir: {
      input: "src",
    },
  };
};
