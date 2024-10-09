import express from "express";
import {
  create,
  login,
  deleteUser,
  getAll,
  getOne,
  update,
  report,
  updateMoreInfo,
} from "../controller/userController.js";
import path from "path";
import session from "express-session";

const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }, // 10 minutes
  })
);

const route = express.Router();
import multer from "multer";
const image = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("multer");

    const dir = path.join("uploads");
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const storage = multer({ storage: image });

// const upload = Multer({ storage: image });

route.post("/create", storage.single("profileImage"), create);
route.post("/login", login);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put(
  "/update/:id",
  // console.log("running"),
  storage.single("profileImage"),
  update
);
route.put("/updateMoreInfo/:id", updateMoreInfo);
route.delete("/delete/:id", deleteUser);
route.get("/report", report);

export default route;
