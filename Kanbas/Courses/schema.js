import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    id: String,
    number: String,
    name: String,
    description: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  { collection: "courses" }
);
export default courseSchema;
