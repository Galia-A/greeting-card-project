const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

//SETTINGS
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  "/javascript",
  express.static(path.join(__dirname, "/node_modules/html2canvas/dist"))
);
app.use(bodyParser.urlencoded({ extended: true }));

//REST
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//Routing
const router = require("./modules/router.js");
router(app);

app.listen(3000, () => {
  console.log("The server is listening to port 3000");
});
