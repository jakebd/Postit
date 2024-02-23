import express from "express";
import cors from "cors";
import userRoute from "./routes/api/User.js";

const app = express();
app.use(cors());

app.use("/api/user", userRoute);

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
