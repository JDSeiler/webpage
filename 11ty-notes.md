# 11ty Notes
What have I learned about 11ty so far?

1. It's a single node package: `@11ty/eleventy`
2. I can run the build with `npx @11ty/eleventy`
3. It automagically deals with lots of template languages
4. I can run a hot-reloading server with: `npx @11ty/eleventy --serve`
5. By default 11ty will start looking for files in the cwd and then output
files to the `_site` directory. You can configure this with the `--input` and
`--output` options respectively.
6. You can also configure 11ty through the config file `.eleventy.js`

