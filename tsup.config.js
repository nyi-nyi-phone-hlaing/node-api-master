import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.js", // Root export
    validation: "src/validations/index.js", // Sub-path export
    socket: "src/middleware/socketAuth.js", // Sub-path export
  },
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  splitting: true, // ကုဒ်တွေကို share လုပ်နိုင်အောင် ခွဲထုတ်ပေးသည်
  minify: true,
});
