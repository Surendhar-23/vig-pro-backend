const Station = require("../models/schema/StationSchema");

// Station login
const stationLoginController = async (req, res) => {
  console.log(req.body);

  const { stationId, password } = req.body;
  try {
    const station = await Station.findOne({ stationId });
    if (!station)
      return res.status(401).json({ message: "Invalid user id or password" });
    if (station.password !== password)
      return res.status(401).json({ message: "Invalid password" });
    return res.status(200).json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new Station
const createStationController = async (req, res) => {
  try {
    const newStation = new Station(req.body);
    const savedStation = await newStation.save();
    res.status(201).json(savedStation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Idol to station
const addIdolToStationController = async (req, res) => {
  try {
    const { stationId } = req.params;
    const idolData = req.body;
    console.log(req.body);

    const station = await Station.findOne({ stationId });
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }
    station.stationIdol.push(idolData);
    const updatedStation = await station.save();
    // res.status(200).json(updatedStation);
    res.status(200).json(idolData.idol_id);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const addIdolFileController = async (req, res) => {
  try {
    console.log(req.files);

    const { stationId, idolId } = req.params;
    const { files } = req;
    if (!files || !files.idolApplication || !files.idolImage) {
      return res.status(400).json({
        message: "Both idol application and idol image are required.",
      });
    }

    // Find the station by ID
    const station = await Station.findOne({ stationId });

    if (!station) {
      return res.status(404).json({ message: "Station not found." });
    }

    const idol = station.stationIdol.find((idol) => idol.idol_id === idolId);
    if (!idol) {
      return res.status(404).json({ message: "Idol not found." });
    }

    idol.idolApplication = files.idolApplication[0].path;
    idol.idolImage = files.idolImage[0].path;

    await station.save();

    res.status(200).json({
      message: "Files successfully uploaded and added to the idol.",
      idol,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while uploading files." });
  }
};

// Display Station Idol
const displayStationIdolsController = async (req, res) => {
  try {
    const { stationId } = req.params;
    const station = await Station.findOne({ stationId });
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    const idols = station.stationIdol;
    res.status(200).json(idols);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark Station Idol Immersed
const markStationIdolImmersedController = async (req, res) => {
  try {
    const { stationId, idolId } = req.params;
    const station = await Station.findOne({ stationId });
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    // const idol = station.stationIdol.id(idolId);
    const idol = station.stationIdol.find((idol) => idol.idol_id === idolId);

    if (!idol) {
      return res.status(404).json({ message: "Idol not found" });
    }

    idol.isImmersed = !idol.isImmersed;
    await station.save();
    res.status(200).json({ message: "Idol marked as immersed", idol });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Stations
// exports.getAllStations = async (req, res) => {
//   try {
//     const stations = await Station.find().populate("dspId");
//     res.status(200).json(stations);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Get Station by ID
// exports.getStationById = async (req, res) => {
//   try {
//     const station = await Station.findById(req.params.id).populate("dspId");
//     if (!station) return res.status(404).json({ message: "Station not found" });
//     res.status(200).json(station);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Update Station by ID
// exports.updateStation = async (req, res) => {
//   try {
//     const updatedStation = await Station.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedStation)
//       return res.status(404).json({ message: "Station not found" });
//     res.status(200).json(updatedStation);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Delete Station by ID
// exports.deleteStation = async (req, res) => {
//   try {
//     const deletedStation = await Station.findByIdAndDelete(req.params.id);
//     if (!deletedStation)
//       return res.status(404).json({ message: "Station not found" });
//     res.status(200).json({ message: "Station deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = {
  createStationController,
  stationLoginController,
  addIdolToStationController,
  displayStationIdolsController,
  markStationIdolImmersedController,
  addIdolFileController,
};
