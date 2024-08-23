const express = require("express");
const router = express.Router();
const dspController = require("../controllers/dspController");

// Create a new DSP
router.post("/", dspController.createDSPController);

// Login DSP
router.post("/login", dspController.DSPLoginController);

// Add Stations to DSP
router.post("/addstation", dspController.addStationToDSPController);

// Get DSP Station
router.get("/:dspId/stations", dspController.DSPGetStationsController);
// Create a new DSP
// router.post("/login", dspController.DSPLoginController);

// Get all DSPs
// router.get("/", dspController.getAllDSPs);

// Get DSP by ID
// router.get("/:id", dspController.getDSPById);

// Update DSP by ID
// router.put("/:id", dspController.updateDSP);

// Delete DSP by ID
// router.delete("/:id", dspController.deleteDSP);

module.exports = router;
