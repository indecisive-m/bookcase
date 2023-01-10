import express from "express";

const app = express();
const port = "3000";

app.post("/bookcase", (req, res) => {
  res.json({ message: "bookcase" });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
