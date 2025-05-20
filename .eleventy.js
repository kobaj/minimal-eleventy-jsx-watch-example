import "tsx/esm";

import { jsxToString } from "jsx-async-runtime";

import { register } from 'node:module';

register(`./src/_tsxfixes/cache-buster.js?${Date.now()}`,
  {
    parentURL: import.meta.url,
  },
)

export default async function (eleventyConfig) {
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
    compile: async function (inputContent, inputPath) {
      return async function (data) {
        let content = await this.defaultRenderer(data);
        return jsxToString(content);
      };
    },
  });

  return {
    templateFormats: [
      "11ty.jsx",
      "11ty.tsx",
    ],

    useTemplateCache: false,

    dir: {
      input: "src",
      includes: "_includes",
      output: "dist"
    }
  };
};
