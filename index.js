const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("simple CRUD server is serving");
});

app.listen(port, () => {
  console.log(`simple CRUD server is running on port ${port}`);
});
