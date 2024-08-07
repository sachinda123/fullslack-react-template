const express = require("express");
const app = express();

app.get("/test", (req, res) => {
  res.send("hello world service 1");
});

app.listen(3002, () => {
  console.log("server run on port 3002");
});
