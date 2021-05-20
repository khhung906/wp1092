// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);
import mongoose from 'mongoose'

const Schema = mongoose.Schema; 
const UserSchema = new Schema({   
    name: String,
    subject: String,
    score: Number
}); 

const ScoreCard = mongoose.model('Score', UserSchema);

export default ScoreCard;