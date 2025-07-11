# minimal-eleventy-jsx-watch-example
A minimal example of how eleventy jsx watch is not correct.

# Update 2025-06-18, fully fixed with eleventy version 3.1.2-beta.2

This is confirmed fixed with eleventy version 3.1.2-beta.2 or newer. This repo is left around as a historic artifact.

# Update 2025-06-17, it works when you disable template cache!

While this is being fixed, there is a workaround [mentioned in github](https://github.com/11ty/eleventy/issues/3824#issuecomment-2980880288). All you need to do is set the following.

```
  eleventyConfig.setUseTemplateCache(false);
```

# Reproducing the original issue

Reproducing the issue by running the following commands

1. Run npm install
1. Run npm run serve
1. Open browser to http://localhost:8080/
1. Edit the file `src/_includes/head.tsx`. for example change "My test page, woo!" to be "Why isn't this working?"
1.  Observe that the text in the header of your browser is still "My test page, woo!"

What I expect to happen at step 5 is for the header of my browser to be "Why isn't this working?".

# Alternative solution I've found

Just run a local [light-server](https://www.npmjs.com/package/light-server), example config:
```
{
  "serve": "dist",
  "port": 8080,
  "bind": "localhost",
  "watchexps": [
    "src/**/* # npm run build"
  ],
  "open": true,
  "http2": false
}
```
This will correctly watch and rebuild the entire dist website when a src file changes.
