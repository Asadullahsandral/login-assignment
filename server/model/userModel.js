import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      enum: ["Student", "Teacher", "Admin"],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // minlength: 8,
      // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      enum: ["Punjab", "Sindh", "Balochistan", "KPK"],
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },

    maritalStatus: {
      type: String,
      enum: ["Married", "Unmarried"],
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
      // match: /^data:image\/(png|jpeg|jpg);base64,/,
    },
    degreeTitle: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    instituteName: {
      type: String,
    },
    majorSubjects: {
      type: String,
    },
    title: {
      type: String,
    },
    organization: {
      type: String,
    },
    fromDate: {
      type: String,
    },
    toDate: {
      type: String,
    },
    jobDescription: {
      type: String,
    },
    skilltitle: {
      type: String,
    },
    skillLevel: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Sudent", userSchema);
