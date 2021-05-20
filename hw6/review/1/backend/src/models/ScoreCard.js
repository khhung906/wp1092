// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const scoreCardSchema = new Schema({
    name:{
        type: String,
        required: [true,'Name is required.']
    },
    subject:{
        type: String,
        required: [true,'Subject is required.']
    },
    score:{
        type: Number,
        required: [true,'Score is required.']
    }
})
export default mongoose.model('ScoreCard', scoreCardSchema);
