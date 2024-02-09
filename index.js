const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const user = require("./routes/user");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();
app.use(cors());
app.use(
  express.json({
    verify: (req, res, buf, encoding) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.status(400).send({ error: [{ msg: "Invalid JSON" }] });
      }
    },
  }),
);

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
  } catch (err) {
    console.log(err);
  }
};
connectToDB();

const PORT = process.env.PORT;

app.use("/api/v1/users", user);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
