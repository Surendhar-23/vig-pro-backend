const express = require("express");
const router = express.Router();
const stationController = require("../controllers/stationController");
const upload = require("../middleware/multerconfig");

// Create Station
router.post("/", stationController.createStationController);

// Login Station
router.post("/login", stationController.stationLoginController);

// Add Idol to Station
router.post(
  "/:stationId/addidol",
  stationController.addIdolToStationController
);

// Add Idol Files
router.post(
  "/:stationId/:idolId/addfiles",
  upload.fields([
    { name: "idolApplication", maxCount: 1 },
    { name: "idolImage", maxCount: 1 },
  ]),
  stationController.addIdolFileController
);

// Display Station Idol
router.get("/:stationId/idol", stationController.displayStationIdolsController);

// Mark Station Idol Immersed
router.patch(
  "/:stationId/idol/:idolId/immersed",
  stationController.markStationIdolImmersedController
);

// Get all Stations
// router.get("/", stationController.getAllStations);

// // Get Station by ID
// router.get("/:id", stationController.getStationById);

// // Update Station by ID
// router.put("/:id", stationController.updateStation);

// // Delete Station by ID
// router.delete("/:id", stationController.deleteStation);

module.exports = router;
