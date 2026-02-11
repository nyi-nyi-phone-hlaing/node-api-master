import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.js", // @codenokami/node-api-master
    validation: "src/validation-entry.js", // @codenokami/node-api-master/validation
    socket: "src/socket-entry.js", // @codenokami/node-api-master/socket
  },
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  splitting: true,
  minify: true,
  external: ["joi", "mongoose", "socket.io"],
});
