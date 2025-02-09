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

### Mobile Testing
To test the site locally on mobile, you can use a reverse proxy. My personal
preference is Caddy. Reverse proxy your development machine's IP address to the
address of the 11ty server:

```
caddy reverse-proxy --from "$(ipconfig getifaddr en0)" --to localhost:8080
```

Then, from your mobile device, type in the address of your development machine
in your phone's web browser. You will get a warning about the certificate not
being safe because it is a self-signed Caddy certificate, but it's ok because
you're connecting to your own development server.

