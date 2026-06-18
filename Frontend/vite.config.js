import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { boneyardPlugin } from "boneyard-js/vite";

export default defineConfig({
  plugins: [react(), boneyardPlugin()],
  // This makes VITE_BONEYARD available in the browser
  define: {
    "import.meta.env.VITE_BONEYARD": JSON.stringify(
      process.env.VITE_BONEYARD || "false",
    ),
  },
});
