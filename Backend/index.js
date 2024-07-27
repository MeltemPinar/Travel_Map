const express = require("express");

const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
const cors = require("cors");
dotenv.config();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Veritabanına bağlanıldı"))
  .catch(() => console.log(err, "Veritabanına bağlanırken HATA oluştu"));
app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`API ${PORT} portta dinlenmeye başlandı`);
});
