const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const adminRouter = require("./routes/adminRoutes");
const documentRouter = require("./routes/documentsRoutes");
const agencyRouter = require("./routes/agencyRoutes");
const nameRouter = require("./routes/nameRoutes");
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error: ", err));

app.use("/api/admin", adminRouter);
app.use("/api/document", documentRouter);
app.use("/api/agency", agencyRouter);
app.use("/api/name", nameRouter);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
