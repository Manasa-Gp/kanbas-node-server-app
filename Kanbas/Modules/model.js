import mongoose from "mongoose";
import moduleSchema from "./schema.js";
const moduleModel = mongoose.model("modules", moduleSchema);

export default moduleModel;
