# minimal-eleventy-jsx-watch-example
A minimal example of how eleventy jsx watch is not correct.

# Reproducing the issue

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
