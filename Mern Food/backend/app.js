const express = require("express");
const mongoDB = require("./db");

const app = express();
const port = 3001;
mongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", require("./routes/createuser"));
app.use("/api", require("./routes/displaydata"));
app.use("/api", require("./routes/orderdata"));
app.get("/", (req, res) => {
  res.json("Hello World");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
