// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default mongoose.model('ScoreCard', scoreCardSchema);

import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ScoreCardSchema = new Schema({
  name: String,
  subject: String,
  score: Number,
});
export default mongoose.model("ScoreCard", ScoreCardSchema);
