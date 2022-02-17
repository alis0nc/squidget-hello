import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import createDocxGenerator from "stencil-docx-docs";
import alias from "@rollup/plugin-alias";
import { string } from "rollup-plugin-string";
import css from "rollup-plugin-css-only";
import path from "path";
import { grapesJsOutput } from "@saasquatch/stencil-grapes-plugin";
import { OutputTarget } from "@stencil/core/internal";

const useDocx = {
  type: "docs-custom",
  generator: createDocxGenerator({
    outDir: "docs",
    textFont: "Calibri",
    excludeTags: ["undocumented"],
    title: "My New Component Documentation",
    author: "SaaSquatch",
  }),
} as const;

const useGrapesjs: OutputTarget = grapesJsOutput({
  outDir: "grapesjs",
});

export const config: Config = {
  namespace: "widget-starter",
  globalScript: "src/global/global.ts",
  buildEs5: true,
  outputTargets:
    //@ts-ignore
    process.env.NODE_ENV === "dev"
      ? [
          {
            type: "dist",
          },
          {
            type: "www",
            serviceWorker: null, // disable service workers
            copy: [
              // { src: "global/styles.css", dest: "build/global/styles.css" },
            ],
          },
          useDocx,
          useGrapesjs,
        ]
      : [
          {
            type: "dist",
            copy: [{ src: "global/styles.ts" }],
          },
          useDocx,
          useGrapesjs,
        ],
  plugins: [
    sass({ injectGlobalPaths: ["src/global/mixins.scss"] }),
    string({ include: "**/*.feature" }),
  ],
  rollupPlugins: {
    before: [
      alias({
        entries: [
          {
            find: "@saasquatch/universal-hooks",
            replacement: path.resolve(
              __dirname,
              "node_modules",
              "@saasquatch/stencil-hooks"
            ),
          },
        ],
      }),
      css({
        output: "bundle.css",
      }),
    ],
  },
  extras: {
    appendChildSlotFix: true,
    cloneNodeFix: true,
    slotChildNodesFix: true,
  },
};
