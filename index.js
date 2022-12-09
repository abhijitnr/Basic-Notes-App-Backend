const express = require("express");
const dotenv = require("dotenv");
const connect = require("./config/db");
const authRoute = require("./routes/auth");
dotenv.config();
const noteRoute = require("./routes/notes");
const cors = require("cors");
const { authenticateUser } = require("./middleware/authentication");

const app = express();

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
app.listen(process.env.PORT, async () => {
  try {
    await connect;
    console.log("DB Connected");
  } catch (error) {
    console.log("Unable to connect DB");
  }
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
