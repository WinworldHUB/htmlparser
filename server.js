const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const port = 8080;

app.get("/", (req, res) => {
  fetch(req.query["url"])
    .then((response) => {
      if (!response.headers.get("content-type").includes("image/")) {
        response
          .text()
          .then((body) => res.send(body))
          .catch((error) => res.send(error));
      } else {
        res.send(
          "Invalid request, for downloading image please use /image in the url"
        );
      }
    })
    .catch((error) => res.send(error));
});

app.get("/image", (req, res) => {
  fetch(req.query["url"])
    .then((response) => {
      response
        .blob()
        .then((data) => {
          res.send(data);
        })
        .catch((error) => res.send(error));
    })
    .catch((error) => res.send(error));
});

app.listen(port, () => {
  console.log(`HTMLParser listening on secured port ${port}`);
});
