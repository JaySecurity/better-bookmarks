const NodeModulesPolyfillPlugin =
  require("@esbuild-plugins/node-modules-polyfill").NodeModulesPolyfillPlugin;

require("esbuild")
  .build({
    entryPoints: ["src/app.ts", "src/background.ts"], // Your main files
    bundle: true, // Bundle all imports into one output file
    outdir: "assets/js", // The final output directory
    platform: "browser", // Target the browser
    sourcemap: true, // Optional: Generate a source map for debugging
    minify: false, // Optional: Minify output
    plugins: [NodeModulesPolyfillPlugin()],
  })
  .catch(() => process.exit(1));
