const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectdb } = require("./db");
const stationRoutes = require("./routes/stationRoutes");
const dspRoutes = require("./routes/dspRoutes");
const spRoutes = require("./routes/spRoutes");
const digRoutes = require("./routes/digRoutes");
const igRoutes = require("./routes/igRoutes");
const locationRoutes = require("./routes/locationRoutes");
const upload = require("./middleware/multerconfig");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectdb();

app.use("/test", (req, res) => {
  res.send("testing");
});
app.use("/api/stations", stationRoutes);
app.use("/api/dsps", dspRoutes);
app.use("/api/sps", spRoutes);
app.use("/api/digs", digRoutes);
app.use("/api/igs", igRoutes);
app.use("/api/locations", locationRoutes);

app.listen(3000, () => console.log("server running"));
