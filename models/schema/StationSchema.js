const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
  stationId: { type: String, required: true, unique: true },
  stationDistrict: { type: String, required: true },
  stationLocation: { type: String, required: true },
  // motherVillage: { type: String, required: true },
  motherVillage: {
    type: Map,
    of: [String], // Map of arrays of strings
    required: true,
  },
  stationIdol: [
    {
      idol_id: { type: String, required: true, unique: true },
      motherVillage: { type: String, required: true },
      hamletVillage: { type: String },
      placeOfInstallation: { type: String },
      placeOfImmersion: { type: String, required: true },
      setupDate: { type: Date },
      immersionDate: { type: Date },
      typeOfInstaller: { type: String },
      licence: { type: String },
      height: { type: String },
      permission: {
        police: { type: Boolean, default: false },
        fireService: { type: Boolean, default: false },
        TNEB: { type: Boolean, default: false },
      },
      facility: {
        electricalEquipment: { type: Boolean, default: false },
        lightingFacility: { type: Boolean, default: false },
        CCTVFacility: { type: Boolean, default: false },
      },
      property: {
        type: { type: String },
        description: { type: String },
      },
      shed: {
        type: { type: String },
        description: { type: String },
      },
      volunteers: [
        {
          name: { type: String },
          mobileNo: { type: String },
          address: { type: String },
        },
      ],
      modeOfTransport: {
        vehicleType: { type: String },
        description: { type: String },
      },
      route: [{ type: String }],
      immersionSafety: {
        barricade: { type: Boolean, default: false },
        lighting: { type: Boolean, default: false },
        safetyByFireService: { type: Boolean, default: false },
        PASystem: { type: Boolean, default: false },
      },
      isImmersed: {
        type: Boolean,
        default: false, // Default value set to false
      },
      idolApplication: {
        type: String, // Store file path or URL
      },
      idolImage: {
        type: String, // Store file path or URL
      },
    },
  ],
  password: { type: String, required: true },
  dspId: { type: mongoose.Schema.Types.ObjectId, ref: "DSP", unique: true }, // Reference to DSP
});

module.exports = mongoose.model("Station", StationSchema);
