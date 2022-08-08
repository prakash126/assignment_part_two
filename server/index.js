const express = require("express");
const cors = require("cors");
require("dotenv").config();
const propertyRouter = require("./router/property");
const app = express();
app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use("/property", propertyRouter);

const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
