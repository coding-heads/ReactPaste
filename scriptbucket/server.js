import express from "express";
import path from "path";
const app = express();

import apiRouter from "./server/api-router.js";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
const mode = process.env.APP_ENV || "build";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use("/api/v1", apiRouter);
app.use("/api/v1/paste/", apiRouter);

if (mode === "build") {
  app.use(["/"], express.static(path.join(__dirname, "..", "dist")));
  app.get(["/:path", "/:path/:id"], (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist/index.html"));
  });
} else {
  app.use("/", express.static(path.join(__dirname, "..", "/")));
  app.get(["/:path", "/:path/:id"], (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/index.html"));
  });
}

const { PORT = 5000 } = process.env;
app.listen(PORT, () => {
  console.log(`  App running in port ${PORT}`);
});
export default app;
