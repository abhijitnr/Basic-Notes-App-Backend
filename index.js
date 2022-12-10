const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
dotenv.config();
const noteRoute = require("./routes/notes");
const { authenticateUser } = require("./middleware/authentication");

const app = express();

/* MONGODB CONNECT */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`Database coonected successfully`))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());

/* WELCOME */
app.get("/", (req, res) => {
  res.send("WELCOME TO FULL-STACK CRUD");
});

/* ROUTES */
app.use("/auth", authRoute);
app.use(authenticateUser);
app.use("/notes", noteRoute);

/* OTHERS ROUTES */
// app.get("/users", (req, res) => {
//   const token = req.headers.token.split(" ")[1];
//   const decodedToken = jwt.verify(token, "nxm", (err, decoded) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(decoded);
//     }
//   });

//   if (decodedToken) {
//     res.send("User is able to access");
//   } else {
//     res.send("User is not able to access");
//   }
// });

/* LISTENING PORT */
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
