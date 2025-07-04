require("dotenv").config();
const path = require("path");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
const __dirnamePath = path.resolve();

if (process.env.NODE_ENV === "production") {
  const express = require("express");
  app.use(express.static(path.join(__dirnamePath, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirnamePath, "client/build/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});
