// REQUIRES
const express = require("express");
const fs = require("fs");
const app = express();

// Map virtual paths to the real folders (static content: css, js, images)
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

// Main page
app.get("/", function (req, res) {
    let doc = fs.readFileSync("./app/html/index.html", "utf8");
    res.send(doc);
});

app.get("/menuhtml", function (req, res) {
    let doc = fs.readFileSync("./app/data/sushimenu.html", "utf8");
    res.setHeader("Content-Type", "text/html");
    res.send(doc);
});

app.get("/menujson", function (req, res) {
    let doc = fs.readFileSync("./app/data/sushimenu.json", "utf8");
    res.setHeader("Content-Type", "application/json");
    res.send(doc);
});

// for resource not found (i.e., 404)
app.use(function (req, res, next) {
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
let port = 8000;
app.listen(port);