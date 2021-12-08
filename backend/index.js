const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
app.use(bodyParser.json());
require("./models/user");
mongoose.connect("mongodb://localhost/");
const authRoute = require("./routes/auth");
const modifyUserRoute = require("./routes/modifyUser");
const userRoute = require("./routes/getUser");
const loginRoute = require("./routes/login");
app.use(authRoute);
app.use(userRoute);
app.use(modifyUserRoute);
app.use(loginRoute);

app.listen(port, () => {
  console.log("server running");
});
