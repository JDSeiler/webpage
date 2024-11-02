# Webpage
Source repository for my personal site / blog, written using https://www.11ty.dev/.

## Project Config
Here's some notes on how this whole thing is wired up, for my own sanity when I
go to make changes and it's been 6 months.

- `npm run build` :: Makes the "production" build
- `npm run serve` :: Starts a hot-reloading local dev server
- `npm run spell:posts` :: Spell-checks the posts directory
- `npm run spell:all` :: Spell-checks the whole repo

Publishing is done with the `build-publish` GitHub action, and happens on merge to `trunk`.

eleventy is configured to copy the `src/css`, `src/img` directories, as well as the
`CNAME` file into the built site. This means they can be directly referenced through
absolute paths like `/css/index.css`.

All of the CSS for the whole site is implemented in one big file. The only thing that's
split out is the Prism theme used for syntax highlighting.

## Setup and Usage

Make sure you're using at *least* Node 18.

1. `npm install`
2. `npm run serve`
3. Write a new blog post in markdown
4. Spell check, proofread, and edit
5. Through some means, push to trunk
  a. Direct push?
  b. Push a branch and merge in GitHub?
