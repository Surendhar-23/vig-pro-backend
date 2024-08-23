const mongoose = require("mongoose");
const DSPSchema = new mongoose.Schema({
  dspId: { type: String, required: true, unique: true },
  dspDivision: { type: String, required: true },
  stationIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Station" }], // Reference to Stations
  password: { type: String, required: true },
  spId: { type: mongoose.Schema.Types.ObjectId, ref: "SP" }, // Reference to SP
});

module.exports = mongoose.model("DSP", DSPSchema);
