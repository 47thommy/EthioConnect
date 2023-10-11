const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const compress = require("compression");
const userRoute = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(compress());

app.use("/api/users", userRoute);
module.exports = app;
