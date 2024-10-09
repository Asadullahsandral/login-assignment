import User from "../model/userModel.js";
import express from "express";
import session from "express-session";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30000 }, // 10 minutes
  })
);

// console.log(session);

export const create = async (req, res) => {
  try {
    // console.log(req.file);
    const { path, filename } = req.file;
    const userData = req.body;
    // console.log(userData.password);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    // console.log(hashedPassword);
    // console.log(userData);
    const newPath = path.replace(/\\/g, "/");
    const user = new User({
      ...userData,
      profileImage: newPath,
      password: hashedPassword,
    });

    // console.log(user);
    if (!user) {
      // console.log("Creating");
      return res.status(404).json({ msg: "User data not found" });
    }

    await user.save();
    // console.log(user);
    res.status(200).json({ msg: "User created successfully", user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const login = async (req, res) => {
  const { userType, username, password } = req.body;
  const user = await User.findOne({ username, userType });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const match = await bcrypt.compare(password, user.password);
  // console.log(match);
  // if (user.password !== password) {
  if (!match) {
    return res.status(400).json({ message: "Invalid password" });
  }
  // req.session.user = { id: user._id, username: user.username, userType };
  // console.log("Session ID:", req.sessionID);
  const token = jwt.sign(
    { id: user._id, username: user.username, userType },
    "M.Asadullah",
    { expiresIn: "1h" }
  );
  // console.log("Token:", token);
  res.status(200).json({ message: "Login Successfully", user, token });
};

export const getAll = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Invalid authorization" });
  }
  const token = authorization.split(" ")[1];
  // console.log(req.headers.authorization);
  try {
    const decoded = jwt.verify(token, "M.Asadullah");
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }
    // console.log(decoded);
    const userExists = await User.findById(decoded.id);
    if (!userExists) {
      return res.status(404).json({ msg: "User not found" });
    }
    const id = req.params.id;

    const userExist = await User.findById(id);
    // console.log(userExist);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  console.log(req.file);

  try {
    const { path, filename } = req.file;
    const id = req.params.id;

    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "User not found" });
    }
    // console.log(userExist);
    const newPath = path.replace(/\\/g, "/");
    const updatedData = await User.findByIdAndUpdate(id, {
      profileImage: newPath,
      ...req.body,
      new: true,
    });
    // const updatedData = await User.findByIdAndUpdate(id, req.body, {
    //   new: true,
    // });
    // console.log(req.body);
    res
      .status(200)
      .json({ msg: "User updated successfully", updatedUser: updatedData });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateMoreInfo = async (req, res) => {
  try {
    const id = req.params.id;

    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "User not found" });
    }

    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ msg: "User updated successfully", updatedUser: updatedData });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not exist" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const report = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const users = await User.find({
      createdAt: {
        // Assuming you have a createdAt field in your user model
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).select("firstName lastName education maritalStatus city userType"); // Select only necessary fields
    // console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching report data" });
  }
};
