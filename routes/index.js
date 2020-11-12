const path = require("path");
const router = require("express").Router();
const userAPIRoutes = require("./api/user");
const allAPIRoutes = require("./api/all");

// API Routes
router.use("/api", userAPIRoutes);
router.use("/api", allAPIRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;