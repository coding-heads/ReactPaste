/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */

/*
 * Import the plugin modules
 */

import react from "@vitejs/plugin-react";
// import app from "./server/server.js";

/*
 * The Express app plugin. Specify the URL base path
 * for the app and the Express app object.
 */
// const expressServerPlugin = (path, expressApp) => ({
//   name: "configure-server",
//   configureServer(server) {
//     server.middlewares.use(path, expressApp);
//   },
// });

/*
 * Vite configuration
 */
export default {
  server: {
    proxy: {
      "/api/v1": "http://localhost:5000/",
    },
  },
  plugins: [react()],
};
