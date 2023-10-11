const app = require("./express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `database connected and server listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
